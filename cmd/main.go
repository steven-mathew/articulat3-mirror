package main

import (
	"articulate/api"
	"articulate/internal/blobstore"
	"articulate/internal/controllers"
	"articulate/internal/database"
	"context"
	"os"
	"os/signal"
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
     credentialsFilePath := os.Getenv("secrets/credentials.txt")

     c, err := client.Dial(client.Options{
        HostPort: hostPort,
     })

	 if err != nil {
        log.Err(err).Msg("unable to create client")
	 }

	pm, err := controllers.NewPromptsManager(database.NewPromptStore(), c)
	if err != nil {
        log.Err(err).Msg("unable to create OromptManager")
	 }
	gcs, err := blobstore.NewGCSStore(blobstore.GCSConfig{
		Bucket:              bucketName,
		CredentialsFilePath: credentialsFilePath,
	})
	if err != nil {
        log.Err(err).Msg("unable to create GCSStore")
	 }
	bm, err := controllers.NewBlobsManager(gcs)
	if err != nil {
        log.Err(err).Msg("unable to create BlobsManager")
	 }
	hm, err := controllers.NewHealthManager()
	if err != nil {
        log.Err(err).Msg("unable to create HealthManager")
	 }

	ctrls := controllers.Controllers{
		PromptsManager: pm,
		BlobsManager:   bm,
		HealthManager:  hm,
	}

	api, err := api.NewAPI(ctx, api.Config{
		Controller: ctrls,
		Port:       8080,
	})
	if err != nil {
        log.Err(err).Msg("unable to create API")
	 }

	return api, err
}

func run(ctx context.Context) error {
	api, err := newAPI(ctx)

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
