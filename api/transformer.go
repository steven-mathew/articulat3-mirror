package api

import (
	"articulate/api/oapigen"
	"articulate/internal/types"
)

type PromptRequest oapigen.PromptRequest
type PromptResponse oapigen.PromptResponse
type ErrorResponse oapigen.ErrorResponse

func errorResponseFromError(err error, requestID oapigen.RequestID) ErrorResponse {
	er := ErrorResponse{
		RequestId: requestID,
		Error: oapigen.Error{
			Message: err.Error(),
		},
	}
	return er
}

func promptResponseFromPrompt(prompt types.Prompt, requestID oapigen.RequestID) PromptResponse {
	p := oapigenPromptFromPrompt(prompt)

	pr := PromptResponse{
		RequestId: requestID,
		Prompt:    &p,
	}
	return pr
}

func (pr PromptRequest) ToPrompt() (types.Prompt, error) {
	// TODO: handle malformed requests
	prompt := types.Prompt{
		Id:     &pr.Prompt.Id,
		Model:  (*string)(&pr.Prompt.Model),
		Prompt: &pr.Prompt.Prompt,
	}

	return prompt, nil
}

func oapigenPromptFromPrompt(prompt types.Prompt) oapigen.Prompt {
	p := oapigen.Prompt{
		Id:     *prompt.Id,
		Prompt: *prompt.Prompt,
		Model:  oapigen.PromptModel(*prompt.Model),
	}

	return p
}
