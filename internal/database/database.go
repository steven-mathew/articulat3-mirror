package database

import "articulate/internal/types"

type Database interface {
	GetPromptIntent(promptId string) (types.PromptIntent, bool)
	GetPromptIntents() types.PromptIntents
	SetPromptIntent(prompt types.PromptIntent) error
}
