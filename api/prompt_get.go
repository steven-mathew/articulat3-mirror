package api

import (
	"articulate/api/oapigen"
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
		logger.Trace().Err(err).Msg("prompt not found")
        sendError(w, r, http.StatusNotFound, err)
        return
	}

	res := promptResponseFromPrompt(prompt, reqId)
	writeResponse(w, r, http.StatusOK, res)

    logger.Trace().Msgf("prompt retrieved %v", res)
}

func (h *PromptHandler) GetPromptIntents(w http.ResponseWriter, r *http.Request, params oapigen.GetPromptIntentsParams) {
	h.mu.Lock()
	defer h.mu.Unlock()

	ctx := r.Context()
	logger := log.Ctx(ctx)
	logger.Trace().Msg("get all prompt request received")

	reqId := requestIdFromContext(ctx)

    prompts := h.ctrl.PromptIntents(ctx)

    res := promptsReponseFromPrompt(prompts, reqId)
	writeResponse(w, r, http.StatusOK, res)

    logger.Trace().Msgf("prompts retrieved %v", res)
}
