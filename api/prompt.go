package api

import (
	"net/http"
	"sync"

	"github.com/rs/zerolog/log"
)

type promptHandler struct {
	ctrl Server
}

func newPromptHandler(ctrl Server) *promptHandler {
	return &promptHandler{
		ctrl: ctrl,
	}
}

func (h *promptHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	logger := log.Ctx(r.Context())
	logger.Trace().Msgf("requesting prompts %s", r.URL.Path)
}

type PromptHandler struct {
	mu   sync.RWMutex
	ctrl Server
}

func NewPromptHandler(ctrl Server) *PromptHandler {
	return &PromptHandler{
		ctrl: ctrl,
	}
}
