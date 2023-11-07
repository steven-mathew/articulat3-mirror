package api

import (
	"net/http"
	"sync"

	"github.com/rs/zerolog/log"
)

type blobHandler struct {
	ctrl Server
}

func newBlobHandler(ctrl Server) *blobHandler {
	return &blobHandler{
		ctrl: ctrl,
	}
}

func (h *blobHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	logger := log.Ctx(r.Context())
	logger.Trace().Msgf("requesting blobs (%s: %s)", "url_path", r.URL.Path)
}

type BlobHandler struct {
	mu   sync.RWMutex
	ctrl Server
}

func NewBlobHandler(ctrl Server) *BlobHandler {
	return &BlobHandler{
		ctrl: ctrl,
	}
}
