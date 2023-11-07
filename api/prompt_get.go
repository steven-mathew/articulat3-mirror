package api

import (
	"articulate/api/oapigen"
	"fmt"
	"net/http"

	"github.com/rs/zerolog/log"
)

func (h *PromptHandler) GetPromptByID(w http.ResponseWriter, r *http.Request, id string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	ctx := r.Context()
	logger := log.Ctx(ctx)
	logger.Trace().Msg("get prompt request received")
	reqId := requestIdFromContext(ctx)

	prompt, _ := h.ctrl.Prompt(ctx, id)
	res := promptResponseFromPrompt(prompt, reqId)
	writeResponse(w, r, http.StatusOK, res)
}

func (h *PromptHandler) GetPrompts(w http.ResponseWriter, r *http.Request, params oapigen.GetPromptsParams) {
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
