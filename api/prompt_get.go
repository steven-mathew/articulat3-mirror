package api

import (
	"articulate/api/oapigen"
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"
)

func (h *PromptHandler) GetPromptIntent(w http.ResponseWriter, r *http.Request, id string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	ctx := r.Context()
	logger := log.Ctx(ctx)
	logger.Trace().Msg("get prompt request received")
	reqId := requestIdFromContext(ctx)

	prompt, err := h.ctrl.PromptIntent(ctx, id)
	if err != nil {
        log.Err(err).Msg("unable to get prompt")
	 }
	res := promptResponseFromPrompt(prompt, reqId)

	writeResponse(w, r, http.StatusOK, res)
}

func (h *PromptHandler) GetPromptIntents(w http.ResponseWriter, r *http.Request, params oapigen.GetPromptIntentsParams) {
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
