package api

import (
	"net/http"
	"sync"

	"github.com/rs/zerolog/log"
)

type healthHandler struct {
	ctrl Server
}

func newHealthHandler(ctrl Server) *promptHandler {
	return &promptHandler{
		ctrl: ctrl,
	}
}

func (h *healthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	logger := log.Ctx(r.Context())
	logger.Trace().Msgf("requesting health (%s: %s)", "url_path", r.URL.Path)
}

type HealthHandler struct {
	mu   sync.RWMutex
	ctrl Server
}

func NewHealthHandler(ctrl Server) *HealthHandler {
	return &HealthHandler{
		ctrl: ctrl,
	}
}
