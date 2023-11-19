package controllers

import (
	"articulate/internal/database"
	"articulate/internal/types"
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

func createPrompt() types.PromptIntent {
	p := "A dog and a cat"
	m := "dreamfusion_stable-diffusion"
	pr := types.PromptIntent{
		Prompt: &p,
		Model:  &m,
	}

	return pr
}

func TestPromptCreate_PromptReturned(t *testing.T) {
	ctx := context.Background()
	t.Parallel()

	db := database.NewPromptStore()
	pm, err := NewPromptsManager(db, nil)

	expected := createPrompt()
	actual, err := pm.PromptIntentCreate(ctx, expected)

	require.NoError(t, err)
	require.Equal(t, expected.Model, actual.Model)
	require.Equal(t, expected.Prompt, actual.Prompt)
}

func TestPromptGet_PromptReturnedWhenPromptPresent(t *testing.T) {
	ctx := context.Background()
	t.Parallel()

	db := database.NewPromptStore()
	pm, err := NewPromptsManager(db, nil)

	createdPrompt, err := pm.PromptIntentCreate(ctx, createPrompt())
	actual, err := pm.PromptIntent(ctx, *createdPrompt.Id)

	require.NoError(t, err)
	require.Equal(t, createdPrompt.Model, actual.Model)
	require.Equal(t, createdPrompt.Prompt, actual.Prompt)
}
