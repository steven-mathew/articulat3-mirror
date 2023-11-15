package main

import (
	"context"
	"log"
	"os"
	"time"

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

	ticker := time.NewTicker(3 * time.Second)

	for range ticker.C {

		desc, err := c.DescribeWorkflowExecution(context.Background(), we.GetID(), we.GetRunID())

		if err != nil {
			log.Println("Couldn't retrieve workflow execution details", "WorkflowID", we.GetID(), "RunID", we.GetRunID())
		}

		for _, activity := range desc.PendingActivities {
			heartbeats := activity.GetHeartbeatDetails()
			if heartbeats == nil {
				continue
			}

			payloads := heartbeats.GetPayloads()
			if len(payloads) == 0 {
				return
			}

			// lastPayload := payloads[len(payloads) - 1]
			log.Println(payloads)
		}

		log.Println(desc.WorkflowExecutionInfo.Status)
	}
}
