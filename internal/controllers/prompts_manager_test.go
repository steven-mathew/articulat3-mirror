package controllers

import (
	"articulate/internal/database"
	"articulate/internal/types"
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

func createPrompt() types.Prompt {
	p := "A dog and a cat"
	m := "dreamfusion_stable-diffusion"
	pr := types.Prompt{
		Prompt: &p,
		Model:  &m,
	}

	return pr
}

func TestPromptCreate_PromptReturned(t *testing.T) {
	ctx := context.Background()
	t.Parallel()

	db := database.NewPromptStore()
	pm, err := NewPromptsManager(db)

	expected := createPrompt()
	actual, err := pm.PromptCreate(ctx, expected)

	require.NoError(t, err)
	require.Equal(t, expected.Model, actual.Model)
	require.Equal(t, expected.Prompt, actual.Prompt)
}

func TestPromptGet_PromptReturnedWhenPromptPresent(t *testing.T) {
	ctx := context.Background()
	t.Parallel()

	db := database.NewPromptStore()
	pm, err := NewPromptsManager(db)

	createdPrompt, err := pm.PromptCreate(ctx, createPrompt())
	actual, err := pm.Prompt(ctx, *createdPrompt.Id)

	require.NoError(t, err)
	require.Equal(t, createdPrompt.Model, actual.Model)
	require.Equal(t, createdPrompt.Prompt, actual.Prompt)
}
