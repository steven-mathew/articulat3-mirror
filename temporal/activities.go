package temporal

import (
	"bytes"
	"context"
	"fmt"
	"os"
	"os/exec"
	"time"

	"github.com/fsnotify/fsnotify"
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

	// TODO(sm): can continue from a heartbeat by tracking ckpt we are on then continue from ckpt using threestudio
	cmd := exec.Command(
		"python3",
		"launch.py",
		"--config",
		"configs/mvdream-sd21.yaml",
		"--train",
		"--gpu",
		"0",
		"tag='abcd'",
		"use_timestamp=false",
		"trainer.max_steps=200",
		"system.prompt_processor.prompt='an astronaut'",
	)
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

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		logger.Error(string(buf.Bytes()), err)
	}
	defer watcher.Close()

	ticker := time.NewTicker(10 * time.Second)
	defer ticker.Stop()

	watcher.Add("../../MVDream-threestudio/outputs/mvdream-sd21-rescale0.5/abcd/save/")

	for {
		select {
		case <-ctx.Done():
			if err := cmd.Process.Kill(); err != nil {
				logger.Error("err", err)
			}
		case err := <-doneChan:
			logger.Info(string(buf.Bytes()))
			logger.Error("err", err)

		case event := <-watcher.Events:
			logger.Info(event.Name)

			if event.Has(fsnotify.Create) {
				logger.Info("created", event.Name)

				bytes, err := os.ReadFile(event.Name)
				if err != nil {
					continue
				}

				activity.RecordHeartbeat(ctx, bytes)
			}
		case watchErr, ok := <-watcher.Errors:
			if !ok {
				continue
			}

			logger.Error(fmt.Sprintf("failed to watch file: %s", watchErr.Error()))
		case <-ticker.C:
			activity.RecordHeartbeat(ctx, nil)
		}
	}
}

func (a *Activities) ExportModel(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Started prompt training.")

	cmd := exec.Command(
		"python3",
		"launch.py",
		"--config",
		"outputs/mvdream-sd21-rescale0.5/abcd/configs/parsed.yaml",
		"--export",
		"--gpu",
		"0",
		"resume=outputs/mvdream-sd21-rescale0.5/abcd/ckpts/last.ckpt",
		"system.exporter_type=mesh-exporter",
	)
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
			logger.Error("err", err)
			continue

		case <-ticker.C:
			activity.RecordHeartbeat(ctx, nil)
		}
	}

	return nil
}

func (a *Activities) CleanupActivity(ctx context.Context) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Cleanup Activity started")

	// TODO: remove the files generated from the worker

	return nil
}
