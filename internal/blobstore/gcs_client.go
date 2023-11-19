package blobstore

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"time"

	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
)

type gcsStore struct {
	bucket string
	client *storage.Client
}

var _ Store = &gcsStore{}

func NewGCSStore(cfg GCSConfig) (Store, error) {
	client, _ := storage.NewClient(context.Background(), option.WithCredentialsFile(cfg.CredentialsFilePath))

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
		Method:  http.MethodGet,
        // expire after two years, this could be lowered
		Expires: time.Now().Add(2 * 8760 * time.Hour),
	})
	if err != nil {
		return "", fmt.Errorf("failed to create signed URL for file: %s %w", filePath, err)
	}
	return signedURL, nil
}
