package api

import (
	"encoding/json"
	"net/http"

	"articulate/api/oapigen"

	"github.com/rs/zerolog/log"
)

var _ oapigen.ServerInterface = (*Handlers)(nil)

type Handlers struct {
	*PromptHandler
	*BlobHandler
	*HealthHandler
}

// Sourced from https://github.com/hashicorp/consul-terraform-sync/blob/main/api/handler.go:

// WriteResponse sets headers and JSON encodes the response body in the response writer
func writeResponse(w http.ResponseWriter, r *http.Request, code int, resp interface{}) {
	logger := log.Ctx(r.Context())

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		logger.Err(err).Msgf("error encoding json %v", resp)
	}
}

// SendError wraps sending of an error in the Error format
func sendError(w http.ResponseWriter, r *http.Request, code int, err error) {
	writeResponse(w, r, code, oapigen.ErrorResponse{
		Error: oapigen.Error{
			Message: err.Error(),
		},
		RequestId: requestIdFromContext(r.Context()),
	})
}
