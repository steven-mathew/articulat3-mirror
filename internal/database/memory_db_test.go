package database

import (
	"articulate/internal/types"
	"testing"

	"github.com/stretchr/testify/require"
)

func createPrompt() types.Prompt {
	p := "A dog and a cat"
	m := "dreamfusion_stable-diffusion"
	id := "test-id"
	pr := types.Prompt{
		Prompt: &p,
		Model:  &m,
		Id:     &id,
	}

	return pr
}

func TestPromptCreate_NoErrorWhenPromptCreated(t *testing.T) {
	t.Parallel()

	db := NewPromptStore()
	err := db.SetPrompt(createPrompt())

	require.NoError(t, err)
}

func TestPromptGet_PromptReturnedWhenPromptPresent(t *testing.T) {
	t.Parallel()

	db := NewPromptStore()
	expected := createPrompt()

	err := db.SetPrompt(expected)
	require.NoError(t, err)

	actual, ok := db.GetPrompt(*expected.Id)
	require.True(t, ok)
	require.EqualValues(t, expected, actual)
}
