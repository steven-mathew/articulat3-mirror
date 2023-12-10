package blobstore

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"time"

	"cloud.google.com/go/storage"
	"github.com/rs/zerolog/log"
	"google.golang.org/api/option"
)

// gcsStore is a store for a Google Cloud Storage bucket containing the bucket and the client.
type gcsStore struct {
	bucket string
	client *storage.Client
}

var _ Store = &gcsStore{}

// NewGCSStore returns the gcsStore for the given GCSConfig.
func NewGCSStore(cfg GCSConfig) (Store, error) {
	client, err := storage.NewClient(context.Background(), option.WithCredentialsFile(cfg.CredentialsFilePath))
	if err != nil {
		log.Err(err).Msg("unable to create Client")
        return nil, err
	}
	return &gcsStore{
		bucket: cfg.Bucket,
		client: client,
	}, nil
}

func (c *gcsStore) Upload(ctx context.Context, file io.Reader, filePath string) error {
	wc := c.client.Bucket(c.bucket).Object(filePath).NewWriter(ctx)
	defer func() {
		wc.Close()
	}()

	io.Copy(wc, file)
	return nil
}

func (c *gcsStore) GetSignedURL(ctx context.Context, filePath string) (string, error) {
	signedURL, err := c.client.Bucket(c.bucket).SignedURL(filePath, &storage.SignedURLOptions{
		Method: http.MethodGet,
		// Expire after two years, this could be lowered.
		Expires: time.Now().Add(2 * 8760 * time.Hour),
	})
	if err != nil {
		return "", fmt.Errorf("failed to create signed URL for file: %s %w", filePath, err)
	}
	return signedURL, nil
}
