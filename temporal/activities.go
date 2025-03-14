// This file needs refactoring and cleanup.

package temporal

import (
	"bytes"
	"context"
	"crypto/tls"
	"fmt"
	"image"
	"image/png"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"go.temporal.io/sdk/activity"
)

type (
	WorkflowInput struct {
		Prompt         string
		Model          string
		PromptIntentId string
	}

	Activities struct {
		ServerFQDN string
	}
)

var (
	defaultMaxSteps         = 400
	defaultValCheckInterval = 20
	defaultNumSamplesPerRay = 256
	defaultModel            = "mvdream-sd21"
)

func latestFile(dir string) (string, bool) {
	files, err := ioutil.ReadDir(dir)

	if err != nil {
		return "", false
	}

	var latestFile string
	var latestTime int64 = 0
	for _, f := range files {
		fi, _ := os.Stat(dir + f.Name())
		if !fi.Mode().IsRegular() {
			continue
		}

		currTime := fi.ModTime().Unix()
		if currTime > latestTime {
			latestTime = currTime
			latestFile = f.Name()
		}
	}

	return latestFile, true
}

func (a *Activities) TrainPrompt(ctx context.Context, input WorkflowInput) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Started prompt training")
	logger.Info("Received input", input)

	// TODO(sm): can continue from a heartbeat by tracking ckpt we are on then continue from ckpt using threestudio
	cmd := exec.Command(
		"python3",
		"launch.py",
		"--config",
		// ignore model from the input and always use mvdream-sd21 for MVP
		fmt.Sprintf("configs/%s.yaml", defaultModel),
		"--train",
		"--gpu",
		"0",
		fmt.Sprintf("tag='%s'", input.PromptIntentId),
		"use_timestamp=false",
		fmt.Sprintf("trainer.max_steps=%d", defaultMaxSteps),
		fmt.Sprintf("trainer.val_check_interval=%d", defaultValCheckInterval),
		fmt.Sprintf("system.prompt_processor.prompt='%s'", input.Prompt),
		fmt.Sprintf("system.renderer.num_samples_per_ray=%d", defaultNumSamplesPerRay),
	)
	cmd.Dir = "../../MVDream-threestudio"
	cmd.Stderr = os.Stderr

	_ = cmd.Start()

	doneChan := make(chan error)
	go func() {
		err := cmd.Wait()
		if err != nil {
			doneChan <- err
			return
		}

		doneChan <- err
		close(doneChan)
	}()

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	dir := fmt.Sprintf(
		"../../MVDream-threestudio/outputs/%s-rescale0.5/%s/save/",
		defaultModel,
		input.PromptIntentId,
	)

	for {
		select {
		case <-ctx.Done():
			if err := cmd.Process.Kill(); err != nil {
				logger.Error("err", err)
				return err
			}
		case err := <-doneChan:
			return err
		case <-ticker.C:
			f, ok := latestFile(dir)

			if !ok {
				activity.RecordHeartbeat(ctx, nil)
				break
			}

			filename := fmt.Sprintf(
				"../../MVDream-threestudio/outputs/%s-rescale0.5/%s/save/%s",
				defaultModel,
				input.PromptIntentId,
				f,
			)

			if !strings.HasSuffix(filename, ".png") {
				break
			}

			thumbnailFile, err := os.Open(filename)
			if err != nil {
				thumbnailFile.Close()
				return err
			}

			thumbnail, _, err := image.Decode(thumbnailFile)
			if err != nil {
				thumbnailFile.Close()
				return err
			}

			width := thumbnail.Bounds().Dx()
			height := thumbnail.Bounds().Dy()

			thumbnailLeft := image.NewRGBA(image.Rect(0, 0, width/2, height))
			for y := 0; y < height; y++ {
				for x := 0; x < width/2; x++ {
					thumbnailLeft.Set(x, y, thumbnail.At(x, y))
				}
			}

			buff := &bytes.Buffer{}

			png.Encode(buff, thumbnailLeft)

			logger.Info(f)
			activity.RecordHeartbeat(ctx, buff.Bytes())
			thumbnailFile.Close()
		}
	}
}

func (a *Activities) ExportModel(ctx context.Context, input WorkflowInput) error {
	logger := activity.GetLogger(ctx)
	logger.Info("Started model export")

	cmd := exec.Command(
		"python3",
		"launch.py",
		"--config",
		fmt.Sprintf("outputs/%s-rescale0.5/%s/configs/parsed.yaml", defaultModel, input.PromptIntentId),
		"--export",
		"--gpu",
		"0",
		fmt.Sprintf("resume=outputs/%s-rescale0.5/%s/ckpts/last.ckpt", defaultModel, input.PromptIntentId),
		"system.exporter_type=mesh-exporter",
		"system.exporter.context_type=cuda",
		"system.geometry.isosurface_threshold=2.",
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
			return err

		case <-ticker.C:
			activity.RecordHeartbeat(ctx, nil)
		}
	}
}

func (a *Activities) SaveObject(ctx context.Context, input WorkflowInput) error {
	logger := activity.GetLogger(ctx)
	logger.Info("SaveObject started")

	// threestudio saves (as a png) the rendered model with the negative space
	// side-by-side so we need to split the image in half and save the left half
	// as the thumbnail

	baseDir := fmt.Sprintf("../../MVDream-threestudio/outputs/%s-rescale0.5/", defaultModel)
	fpath := "%s/save/it%d-test/119.png"
	readPath := baseDir + fmt.Sprintf(fpath, input.PromptIntentId, defaultMaxSteps)

	fpath = "%s/save/it%d-test/thumbnail.png"
	savePath := baseDir + fmt.Sprintf(fpath, input.PromptIntentId, defaultMaxSteps)

	if err := saveThumbnail(ctx, readPath, savePath); err != nil {
		return err
	}

	fpaths := [4]string{
		"%s/save/it%d-export/model.mtl",
		"%s/save/it%d-export/model.obj",
		"%s/save/it%d-export/texture_kd.jpg",
		"%s/save/it%d-test/thumbnail.png",
	}

	for _, fpath := range fpaths {
		path := baseDir + fmt.Sprintf(fpath, input.PromptIntentId, defaultMaxSteps)
		// for example. we save 'a4332aa7-6d1f-46ec-ab54-f7e883c56c8f_model.mtl'
		filename := input.PromptIntentId + "_" + filepath.Base(path)

		a.sendBlobRequest(ctx, path, filename)
	}

	return nil
}

func saveThumbnail(ctx context.Context, readPath, savePath string) error {
	thumbnailFile, err := os.Open(readPath)
	if err != nil {
		return err
	}
	defer thumbnailFile.Close()

	thumbnail, _, err := image.Decode(thumbnailFile)
	if err != nil {
		return err
	}

	width := thumbnail.Bounds().Dx()
	height := thumbnail.Bounds().Dy()

	thumbnailLeft := image.NewRGBA(image.Rect(0, 0, width/2, height))
	for y := 0; y < height; y++ {
		for x := 0; x < width/2; x++ {
			thumbnailLeft.Set(x, y, thumbnail.At(x, y))
		}
	}

	return saveImage(savePath, thumbnailLeft)
}

func (a *Activities) sendBlobRequest(ctx context.Context, path string, name string) error {
	logger := activity.GetLogger(ctx)
	url := fmt.Sprintf("%s/v1/blobs", a.ServerFQDN)

	logger.Info("Sending blob request to", url)
	logger.Info(url)

	var body bytes.Buffer
	multipartWriter := multipart.NewWriter(&body)

	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	field, err := multipartWriter.CreateFormFile("upload", name)
	if err != nil {
		return err
	}

	_, err = io.Copy(field, file)
	if err != nil {
		return err
	}

	multipartWriter.Close()

	request, err := http.NewRequest("POST", url, &body)
	if err != nil {
		return err
	}

	request.Header.Set("Content-Type", multipartWriter.FormDataContentType())

	tr := &http.Transport{
		// We are sending an insecure request to the blob url which
		// has a default certificate.
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}
	client := http.Client{Transport: tr}

	response, err := client.Do(request)
	if err != nil {
		return err
	}
	defer response.Body.Close()

	logger.Info("Response Status:", response.Status)
	return nil
}

func saveImage(filename string, img image.Image) error {
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	png.Encode(file, img)
	return nil
}
