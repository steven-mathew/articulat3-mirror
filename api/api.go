package api

import (
	"articulate/api/oapigen"
	"articulate/internal/websocket"
	"context"
	"embed"
	"errors"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"time"

	chi "github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/zerolog/log"
	"go.temporal.io/sdk/client"
)

const apiVersion = "v1"

type API struct {
	ctrl   Server
	port   int
	server *http.Server
}

type Config struct {
	Port       int
	Controller Server

	TemporalClient client.Client
}

//go:embed openapi.json
var openapiSpec []byte

var _ = embed.FS{}

// Spec servers the swagger.json embedded file
func Spec() http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(openapiSpec)
	})
}

func makeDistHandler() func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		workDir, _ := os.Getwd()
		filesDir := filepath.Join(workDir, "client/dist")
		if _, err := os.Stat(filesDir + r.URL.Path); errors.Is(err, os.ErrNotExist) {
			http.ServeFile(w, r, filepath.Join(filesDir, "index.html"))
		}
		http.ServeFile(w, r, filesDir+r.URL.Path)
	}
}


func makeWSHandler(tc client.Client) func(http.ResponseWriter, *http.Request) {
	pool := websocket.NewPool(tc)
	go pool.Start()

	return func(w http.ResponseWriter, r *http.Request) {
        serveWs(pool, w, r)
	}
}


func NewAPI(ctx context.Context, conf Config) (*API, error) {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(withCORS)
	r.Use(withRequestID)

	api := &API{
		ctrl: conf.Controller,
		port: conf.Port,
	}

	r.Route(fmt.Sprintf("/%s", apiVersion), func(r chi.Router) {
		r.Mount(fmt.Sprintf("/%s", "prompts"),
			newPromptHandler(api.ctrl))

		r.Mount(fmt.Sprintf("/%s", "blobs"),
			newBlobHandler(api.ctrl))

		r.Mount(fmt.Sprintf("/%s", "health"),
			newHealthHandler(api.ctrl))
	})

	r.Group(func(r chi.Router) {
		server := Handlers{
			PromptHandler: NewPromptHandler(api.ctrl),
			BlobHandler:   NewBlobHandler(api.ctrl),
			HealthHandler: NewHealthHandler(api.ctrl),
		}

		oapigen.HandlerFromMux(server, r)

		r.Get("/api-json", Spec())
		r.Get("/*", makeDistHandler())
        r.Get("/events", makeWSHandler(conf.TemporalClient))
	})

	http.ListenAndServe(fmt.Sprintf(":%d", api.port), r)

	api.server = &http.Server{
		Addr:        fmt.Sprintf(":%d", api.port),
		ReadTimeout: time.Second * 15,
		IdleTimeout: time.Second * 60,
		Handler:     r,
	}

	return api, nil
}

func (api *API) Serve(ctx context.Context) error {
	var wg sync.WaitGroup
	wg.Add(1)

	go func() {
		defer wg.Done()
		for {
			select {
			case <-ctx.Done():
				ctxShutDown, cancel := context.WithTimeout(context.Background(), 5*time.Second)
				defer cancel()

				if err := api.server.Shutdown(ctxShutDown); err != nil {
					log.Err(err).Msg("error stopping api server")
				} else {
					log.Info().Msg("shutdown")
				}
				return
			}
		}
	}()

	err := api.server.ListenAndServe()
	if err != nil && err != http.ErrServerClosed {
		return err
	}

	wg.Wait()
	return ctx.Err()
}
