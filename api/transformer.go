package api

import (
	"articulate/api/oapigen"
	"articulate/internal/types"
)

type PromptRequest oapigen.PromptIntentRequest
type PromptResponse oapigen.PromptIntentResponse
type PromptsResponse oapigen.PromptIntentsResponse

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

func promptsReponseFromPrompt(prompts types.PromptIntents, requestID oapigen.RequestID) PromptsResponse {
    ps := make([]oapigen.PromptIntent, len(prompts))
    for i, p := range prompts {
        ps[i] = oapigenPromptFromPrompt(*p)
    }

    return PromptsResponse{
        PromptIntents: &ps,
        RequestId: requestID,
    }
}

func (pr PromptRequest) ToPrompt() (types.PromptIntent, error) {
	prompt := types.PromptIntent{
		Id:     pr.PromptIntent.Id,
		Model:  (*string)(&pr.PromptIntent.Model),
		Prompt: &pr.PromptIntent.Prompt,
		Status: pr.PromptIntent.Status,
		// BlobIds: (*types.ObjectFiles)(pr.PromptIntent.BlobIds),
	}

	return prompt, nil
}

func oapigenPromptFromPrompt(prompt types.PromptIntent) oapigen.PromptIntent {
	p := oapigen.PromptIntent{
		Id:     prompt.Id,
		Prompt: *prompt.Prompt,
		Model:  oapigen.PromptIntentModel(*prompt.Model),
		Status: prompt.Status,
        // TODO:
        //
        // We are using:
        //
        //  - promptId_model.obj
        //  - promptId_model.mtl
        //  - promptId_texture_kd.jpg
        //  - promptId_thumbnail.png
        //
        // instead of:
        //
		// BlobIds: &oapigen.ObjectFiles{
		//           MaterialDefinitionBlobId: prompt.BlobIds.MaterialDefinitionBlobId,
		//           ObjectModelBlobId: prompt.BlobIds.ObjectModelBlobId,
		//           TextureBlobId: prompt.BlobIds.TextureBlobId,
		//           ObjectThumbnailBlobId: prompt.BlobIds.ObjectModelBlobId,
		// },
	}

	return p
}
