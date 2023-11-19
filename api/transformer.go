package api

import (
	"articulate/api/oapigen"
	"articulate/internal/types"
)

type PromptRequest oapigen.PromptIntentRequest
type PromptResponse oapigen.PromptIntentResponse
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

func promptResponseFromPrompt(prompt types.PromptIntent, requestID oapigen.RequestID) PromptResponse {
	p := oapigenPromptFromPrompt(prompt)

	pr := PromptResponse{
		RequestId:    requestID,
		PromptIntent: &p,
	}
	return pr
}

func (pr PromptRequest) ToPrompt() (types.PromptIntent, error) {
	prompt := types.PromptIntent{
		Id:     pr.PromptIntent.Id,
		Model:  (*string)(&pr.PromptIntent.Model),
		Prompt: &pr.PromptIntent.Prompt,
		Status: pr.PromptIntent.Status,
		// BlobIds: pr.PromptIntent.BlobIds {
		//
		// },
	}

	return prompt, nil
}

func oapigenPromptFromPrompt(prompt types.PromptIntent) oapigen.PromptIntent {
	p := oapigen.PromptIntent{
		Id:     prompt.Id,
		Prompt: *prompt.Prompt,
		Model:  oapigen.PromptIntentModel(*prompt.Model),
		Status: prompt.Status,
		// BlobIds: &oapigen.ObjectFiles{
		// },
	}

	return p
}
