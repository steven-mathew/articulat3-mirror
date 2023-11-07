package api

import (
	"articulate/internal/types"
	"context"
	"io"
)

// Server contains the Controller methods
type Server interface {
	Prompt(ctx context.Context, promptId string) (types.Prompt, error)
	PromptCreate(context.Context, types.Prompt) (types.Prompt, error)

	Blob(ctx context.Context, blobId string) (string, error)
	BlobCreate(ctx context.Context, file io.Reader, filePath string) error
}
