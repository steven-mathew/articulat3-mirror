package controllers

import (
	"articulate/internal/types"
	"context"
)

type HealthManager struct{}

func NewHealthManager() (*HealthManager, error) {
	return &HealthManager{}, nil
}

func (hm *HealthManager) GetHealth(_ context.Context) (types.PromptIntent, error) {
	return types.PromptIntent{}, nil
}
