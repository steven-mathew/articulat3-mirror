package database

import (
	"articulate/internal/types"
	"sync"
)

type MemoryDB struct {
	store *promptStore
}

type promptStore struct {
	mu      sync.RWMutex
	Prompts *types.Prompts `mapstructure:"prompts"`
}

func newPromptStore() *promptStore {
	return &promptStore{
		mu:      sync.RWMutex{},
		Prompts: &types.Prompts{},
	}
}

func NewPromptStore() *MemoryDB {
	return &MemoryDB{
		store: newPromptStore(),
	}
}

func (db *MemoryDB) GetPrompt(promptId string) (types.Prompt, bool) {
	db.store.mu.RLock()
	defer db.store.mu.RUnlock()

	prompts := db.store.Prompts

	for _, prompt := range *prompts {
		if *prompt.Id == promptId {
			// FIXME: we will want to copy prompt later on
			return *prompt, true
		}
	}

	return types.Prompt{}, false

}

func (db *MemoryDB) SetPrompt(prompt types.Prompt) error {
	db.store.mu.Lock()
	defer db.store.mu.Unlock()

	prompts := db.store.Prompts

	*prompts = append(*prompts, &prompt)
	return nil
}
