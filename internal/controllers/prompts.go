package controllers

import (
	"articulate/internal/database"
	"articulate/internal/types"
    "articulate/internal/websocket"

	"articulate/temporal"
	"context"
	"fmt"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"
	"go.temporal.io/sdk/client"
)

// PromptsManager is a manager for prompts.
type PromptsManager struct {
	database database.Database

	temporalClient client.Client
    pool *websocket.Pool
}

// NewPromptsManager returns a new PromptsManager for a given database, temporalClient, and websocket pool
func NewPromptsManager(db database.Database, tc client.Client, pool *websocket.Pool) (*PromptsManager, error) {
	return &PromptsManager{
		database:       db,
		temporalClient: tc,
        pool: pool,
	}, nil
}

// PromptIntent returns a PromptIntent from the database from the PromptsManager with given context and promptId.
func (pm *PromptsManager) PromptIntent(ctx context.Context, promptId string) (types.PromptIntent, error) {
	prompt, ok := pm.database.GetPromptIntent(promptId)
	if !ok {
		return types.PromptIntent{}, fmt.Errorf("prompt id %s does not exist", promptId)
	}

	status, err := pm.promptWorkflowStatus(ctx, promptId)
	if err != nil {
		return types.PromptIntent{}, fmt.Errorf("could not get status for prompt: %s", promptId)
	}

	prompt.Status = &status

	return prompt, nil
}

// PromptIntents returns all PromptIntents from the database from the PromptsManager.
func (pm *PromptsManager) PromptIntents(ctx context.Context) types.PromptIntents {
    prompts := pm.database.GetPromptIntents()

    for _, p := range prompts {
        status, _ := pm.promptWorkflowStatus(ctx, *p.Id)
        p.Status = &status
    }

    return prompts
}

// PromptIntentCreate creates and returns a new PromptIntent in the database and executes workflow in
// temporalClient in PromptsManager.
func (pm *PromptsManager) PromptIntentCreate(ctx context.Context, prompt types.PromptIntent) (types.PromptIntent, error) {
	id := uuid.NewString()
	prompt.Id = &id

	if err := pm.database.SetPromptIntent(prompt); err != nil {
		return types.PromptIntent{}, err
	}

	workflowOptions := client.StartWorkflowOptions{
		ID:        "prompt-generation_" + id,
		TaskQueue: "prompt-generation",
	}

	if pm.temporalClient != nil {
		we, err := pm.temporalClient.ExecuteWorkflow(
			context.Background(),
			workflowOptions,
			temporal.SessionFailureRecoveryWorkflow,
			temporal.WorkflowInput{
				Prompt:         *prompt.Prompt,
				Model:          *prompt.Model,
				PromptIntentId: *prompt.Id,
			},
		)

		if err != nil {
			log.Err(err).Msg("Unable to execute workflow")
            return types.PromptIntent{}, err
		}
		log.Info().Msgf("Started workflow WorkflowID: %s RunID: %s", we.GetID(), we.GetRunID())
	}

	return prompt, nil
}

// promptWorkflowStatus returns workflow status from temporalClient in PromptsManager with given context and promptId.
func (pm *PromptsManager) promptWorkflowStatus(ctx context.Context, promptId string) (string, error) {
	wid := "prompt-generation_" + promptId

	if pm.temporalClient == nil {
		return "", nil
	}

	desc, err := pm.temporalClient.DescribeWorkflowExecution(context.Background(), wid, "")
	if err != nil {
		log.Err(err).Msg("Unable to get workflow execution")
		return "", err
	}

	return desc.WorkflowExecutionInfo.Status.String(), nil
}
