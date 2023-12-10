package database

import "articulate/internal/types"

type Database interface {
	// GetPromptIntent returns a prompt from the database.
	GetPromptIntent(promptId string) (types.PromptIntent, bool)

	// GetPromptIntents returns all prompts from the database.
	GetPromptIntents() types.PromptIntents

	// SetPromptIntent adds a given prompt to the database.
	SetPromptIntent(prompt types.PromptIntent) error
}
