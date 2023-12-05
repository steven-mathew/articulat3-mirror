package api

import (
	"articulate/internal/types"
	"context"
	"io"
)

// Server contains the Controller methods
type Server interface {
	PromptIntent(context.Context, string) (types.PromptIntent, error)
	PromptIntents(context.Context) (types.PromptIntents)
	PromptIntentCreate(context.Context, types.PromptIntent) (types.PromptIntent, error)

	Blob(context.Context, string) (string, error)
	BlobCreate(context.Context, io.Reader, string) error
}
