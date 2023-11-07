package blobstore

import (
	"context"
	"io"
)

type Store interface {
	// Upload writes to filePath in the blobstore.
	Upload(ctx context.Context, file io.Reader, filePath string) error

	// GetSignedURL returns a presigned URL file in the blob store.
	GetSignedURL(ctx context.Context, filePath string) (string, error)
}
