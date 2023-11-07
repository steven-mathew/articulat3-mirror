package controllers

import (
	"articulate/internal/database"
	"articulate/internal/objectid"
	"articulate/internal/types"
	"context"
	"fmt"
)

type PromptsManager struct {
	database database.Database
}

func NewPromptsManager(db database.Database) (*PromptsManager, error) {
	return &PromptsManager{
		database: db,
	}, nil
}

func (pm *PromptsManager) Prompt(_ context.Context, promptId string) (types.Prompt, error) {
	prompt, ok := pm.database.GetPrompt(promptId)
	if !ok {
		return types.Prompt{}, fmt.Errorf("prompt id %s does not exist", promptId)
	}

	return prompt, nil
}

func (pm *PromptsManager) PromptCreate(ctx context.Context, prompt types.Prompt) (types.Prompt, error) {
	id, _ := objectid.ObjectId("prompt")
	prompt.Id = &id

	if err := pm.database.SetPrompt(prompt); err != nil {
		return types.Prompt{}, err
	}

	return prompt, nil
}
