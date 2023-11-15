package temporal

import (
	"bytes"
	"context"
	"os"
	"os/exec"
	"time"

	"go.temporal.io/sdk/activity"
)

type Activities struct {
}

func (a *Activities) PrepareWorkerActivity(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Preparing session worker")
	return nil
}

func (a *Activities) TrainPrompt(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Started prompt training.")

	hbTicker := time.NewTicker(20 * time.Second)
	defer hbTicker.Stop()

	// TODO(sm): can continue from a heartbeat by tracking ckpt we are on then continue from ckpt using threestudio
	cmd := exec.Command("python3", "launch.py", "--config", "configs/mvdream-sd21.yaml", "--train", "--gpu", "0", "tag='abcd'", "use_timestamp=false", "trainer.max_steps=10", "system.prompt_processor.prompt='an astronaut'")
	cmd.Dir = "../../MVDream-threestudio"

	var buf bytes.Buffer
	cmd.Stdout = &buf
	cmd.Stderr = os.Stderr

	_ = cmd.Start()

	doneChan := make(chan error)
	go func() {
		err := cmd.Wait()
		if err != nil {
			doneChan <- err
			return
		}

		// look into dataConverter temporalio example so that the client can
		// receive the images

		// err = protojson.Unmarshal(buf.Bytes(), &result)
		doneChan <- err
		close(doneChan)
	}()

	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			if err := cmd.Process.Kill(); err != nil {
				return err
			}
		case err := <-doneChan:
			logger.Info(string(buf.Bytes()))
			return err
		case <-ticker.C:
			// TODO: send the images as bytes through the heartbeat. This will
			// require watching the directory where the images for every 100th
			// iteration is generated.
			//
			// Note: sometimes a new file won't be ready when a heartbeat happens
			// so send nil in that case
			activity.RecordHeartbeat(ctx, nil)
		}
	}
}

func (a *Activities) CleanupActivity(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Cleanup Activity started")

	// TODO: remove the files generated from the worker

	return nil
}
