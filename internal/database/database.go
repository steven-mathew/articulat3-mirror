package database

import "articulate/internal/types"

type Database interface {
	GetPrompt(promptId string) (types.Prompt, bool)
	SetPrompt(prompt types.Prompt) error
}
