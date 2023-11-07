package controllers

import (
	"articulate/internal/blobstore"
	"context"
	"fmt"
	"io"
)

type BlobsManager struct {
	store blobstore.Store
}

func NewBlobsManager(store blobstore.Store) (*BlobsManager, error) {
	return &BlobsManager{store}, nil
}

func (bm *BlobsManager) Blob(ctx context.Context, blobId string) (string, error) {
	url, _ := bm.store.GetSignedURL(ctx, blobId)
	return url, nil
}

func (bm *BlobsManager) BlobCreate(ctx context.Context, file io.Reader, filePath string) error {
	err := bm.store.Upload(ctx, file, filePath)
	if err != nil {
		return fmt.Errorf("could not be saved to the blobstore")
	}

	return nil
}
