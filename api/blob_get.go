package api

import (
	"net/http"

	"github.com/rs/zerolog/log"
)

// GetBlob retrieves the details of an existing blob along with a presigned URL to
// download the blob, given the unique blob ID.
func (h *BlobHandler) GetBlob(w http.ResponseWriter, r *http.Request, id string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	ctx := r.Context()
	logger := log.Ctx(ctx)
	logger.Trace().Msg("create prompt request received")

	url, err := h.ctrl.Blob(ctx, id)
	if err != nil {
		log.Err(err).Msg("unable to get blob")
	}
	writeResponse(w, r, http.StatusCreated, url)
}
