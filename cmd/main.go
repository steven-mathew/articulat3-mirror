package main

import (
	"articulate/api"
	"articulate/internal/blobstore"
	"articulate/internal/controllers"
	"articulate/internal/database"
	"context"
	"os"
	"os/signal"
	"strconv"
	"syscall"

	"github.com/rs/zerolog/log"
	"go.temporal.io/sdk/client"
)

type API struct {
	ctrl api.Server
	port int
}

func newAPI(ctx context.Context) (*api.API, error) {
	hostPort := os.Getenv("TEMPORAL_SERVER_HOST_PORT")
	bucketName := os.Getenv("GCS_BUCKET_NAME")
	credentialsFilePath := os.Getenv("GOOGLE_APPLICATION_CREDENTIALS")
	port, err := strconv.Atoi(os.Getenv("PORT"))
	if err != nil {
		port = 8080
	}

	c, err := client.Dial(client.Options{
		HostPort: hostPort,
	})

	if err != nil {
		log.Err(err).Msg("unable to create client")
		return nil, err
	}

	pm, err := controllers.NewPromptsManager(database.NewPromptStore(), c)
	if err != nil {
		log.Err(err).Msg("unable to create OromptManager")
		return nil, err
	}
	gcs, err := blobstore.NewGCSStore(blobstore.GCSConfig{
		Bucket:              bucketName,
		CredentialsFilePath: credentialsFilePath,
	})
	if err != nil {
		log.Err(err).Msg("unable to create GCSStore")
		return nil, err
	}
	bm, err := controllers.NewBlobsManager(gcs)
	if err != nil {
		log.Err(err).Msg("unable to create BlobsManager")
		return nil, err
	}
	hm, err := controllers.NewHealthManager()
	if err != nil {
		log.Err(err).Msg("unable to create HealthManager")
		return nil, err
	}

	ctrls := controllers.Controllers{
		PromptsManager: pm,
		BlobsManager:   bm,
		HealthManager:  hm,
	}

	api, err := api.NewAPI(ctx, api.Config{
		Controller: ctrls,
		Port:       port,
	})
	if err != nil {
		log.Err(err).Msg("unable to create API")
		return nil, err
	}

	return api, err
}

func run(ctx context.Context) error {
	api, err := newAPI(ctx)
	if err != nil {
		log.Err(err).Msg("unable to create API")
		return err
	}

	exitCh := make(chan error, 1)
	go func() {
		err := api.Serve(ctx)
		exitCh <- err
	}()

	counter := 0
	for {
		err := <-exitCh
		counter++
		if err != nil && err != context.Canceled {
			return err
		}

		if counter >= 1 {
			return ctx.Err()
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	errCh := make(chan error, 1)
	exitCh := make(chan struct{}, 1)

	go func() {
		if err := run(ctx); err != nil {
			if err == context.Canceled {
				exitCh <- struct{}{}
			} else {
				errCh <- err
			}
			return
		}

		exitCh <- struct{}{}
	}()

	interruptCh := make(chan os.Signal, 1)
	signal.Notify(interruptCh, os.Interrupt, syscall.SIGTERM, syscall.SIGQUIT)

	for {
		select {
		case <-interruptCh:
			cancel()
			os.Exit(0)

		case <-exitCh:
			os.Exit(1)

		case <-errCh:
			os.Exit(1)
		}
	}

}
