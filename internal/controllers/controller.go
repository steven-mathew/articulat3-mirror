package controllers

import (
	"articulate/api"
)

var _ api.Server = (*Controllers)(nil)

// Controllers contains BlobsManager, HealthManager, and PromptsManager.
type Controllers struct {
	*BlobsManager
	*HealthManager
	*PromptsManager
}
