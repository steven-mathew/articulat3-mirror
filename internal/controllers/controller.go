package controllers

import (
	"articulate/api"
)

var _ api.Server = (*Controllers)(nil)

type Controllers struct {
	*BlobsManager
	*HealthManager
	*PromptsManager
}
