package api

import (
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"
)

func (h *HealthHandler) GetHealth(w http.ResponseWriter, r *http.Request) {
	h.mu.Lock()
	defer h.mu.Unlock()

	ctx := r.Context()
	logger := log.Ctx(ctx)
	reqId := requestIdFromContext(ctx)

	err := fmt.Errorf("This method is unimplemented")
	logger.Trace().Err(err).Msgf("unimplemented method")

	res := errorResponseFromError(err, reqId)
	writeResponse(w, r, http.StatusNotImplemented, res)
}
