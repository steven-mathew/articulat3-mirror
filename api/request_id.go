// Sourced from https://github.com/hashicorp/consul-terraform-sync/blob/main/api/request_id.go

package api

import (
	"context"

	"articulate/api/oapigen"

	"github.com/google/uuid"

	"github.com/rs/zerolog/log"
)

type contextReqKeyType struct{}

var reqContextKey = contextReqKeyType{}

// requestIdWithContext inserts a requestId into the context and is retrievable
// with FromContext.
func requestIdWithContext(ctx context.Context, requestId string) context.Context {
	// While we could call logger.With even with zero args, we have this
	// check to avoid unnecessary allocations around creating a copy of a
	// logger.

	id := uuid.MustParse(requestId)
	return context.WithValue(ctx, reqContextKey, id)
}

// requestIdFromContext retrieves a requestId from the context if one exists, and returns
// and empty string otherwise.
func requestIdFromContext(ctx context.Context) oapigen.RequestID {
	id, ok := ctx.Value(reqContextKey).(oapigen.RequestID)
	if !ok {
		log.Info().Msg("unable to get requestId from context")
	}
	return id
}
