package api

import (
	"net/http"

	"github.com/rs/zerolog/log"
)

func (h *BlobHandler) GetBlobByID(w http.ResponseWriter, r *http.Request, id string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	ctx := r.Context()
	logger := log.Ctx(ctx)
	logger.Trace().Msg("create prompt request received")

	url, _ := h.ctrl.Blob(ctx, id)
	writeResponse(w, r, http.StatusCreated, url)
}
