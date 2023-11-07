package types

type Prompt struct {
	Id     *string      `mapstructure:"id" json:"id"`
	Model  *PromptModel `mapstructure:"model" json:"model"`
	Prompt *string      `mapstructure:"prompt" json:"prompt"`
}

type Prompts []*Prompt

const (
	DreamfusionDeepfloydIf     PromptModel = "dreamfusion_deepfloyd-if"
	DreamfusionStableDiffusion PromptModel = "dreamfusion_stable-diffusion"
)

type PromptModel = string
