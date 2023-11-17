package main

import (
	"log"
	"os"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"articulate/temporal"
)

func main() {
	hostPort := os.Getenv("TEMPORAL_SERVER_HOST_PORT")

	// The client and worker are heavyweight objects that should be created once per process.
	c, err := client.Dial(client.Options{
		HostPort: hostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	workerOptions := worker.Options{
		EnableSessionWorker: true, // Important for a worker to participate in the session
        MaxConcurrentSessionExecutionSize: 1,
        MaxConcurrentActivityExecutionSize: 1,
	}
	w := worker.New(c, "prompt-generation", workerOptions)

	w.RegisterWorkflow(temporal.SessionFailureRecoveryWorkflow)
	w.RegisterActivity(&temporal.Activities{})

	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start worker", err)
	}
}
