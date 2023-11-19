package main

import (
	"context"
	"log"
	"os"

	"github.com/google/uuid"
	"go.temporal.io/sdk/client"

	"articulate/temporal"
)

func main() {
	hostPort := os.Getenv("TEMPORAL_SERVER_HOST_PORT")

	// The client is a heavyweight object that should be created once per process.
	c, err := client.Dial(client.Options{
		HostPort: hostPort,
	})

	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	workflowOptions := client.StartWorkflowOptions{
		ID:        "prompt-generation_" + uuid.NewString(),
		TaskQueue: "prompt-generation",
	}

	we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, temporal.SessionFailureRecoveryWorkflow)
	if err != nil {
		log.Fatalln("Unable to execute workflow", err)
	}
	log.Println("Started workflow", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
}
