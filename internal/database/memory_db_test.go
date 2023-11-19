package database

import (
	"articulate/internal/types"
	"testing"

	"github.com/stretchr/testify/require"
)

func createPrompt() types.PromptIntent {
	p := "A dog and a cat"
	m := "mvdream-sd21"
	id := "test-id"
	pr := types.PromptIntent{
		Prompt: &p,
		Model:  &m,
		Id:     &id,
	}

	return pr
}

func TestPromptCreate_NoErrorWhenPromptCreated(t *testing.T) {
	t.Parallel()

	db := NewPromptStore()
	err := db.SetPromptIntent(createPrompt())

	require.NoError(t, err)
}

func TestPromptGet_PromptReturnedWhenPromptPresent(t *testing.T) {
	t.Parallel()

	db := NewPromptStore()
	expected := createPrompt()

	err := db.SetPromptIntent(expected)
	require.NoError(t, err)

	actual, ok := db.GetPromptIntent(*expected.Id)
	require.True(t, ok)
	require.EqualValues(t, expected, actual)
}
