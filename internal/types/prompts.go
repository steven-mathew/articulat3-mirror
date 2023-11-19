package types

type PromptIntent struct {
	Id      *string      `mapstructure:"id" json:"id"`
	Model   *string      `mapstructure:"model" json:"model"`
	Prompt  *string      `mapstructure:"prompt" json:"prompt"`
	Status  *string      `mapstructure:"status" json:"status"`
	BlobIds *ObjectFiles `mapstructure:"blob_ids" json:"blob_ids"`
}

type PromptIntents []*PromptIntent

type ObjectFiles struct {
	// MaterialDefinitionBlobId Unique identifier for the material definition blob.
	MaterialDefinitionBlobId *string `mapstructure:"material_definition_blob_id" json:"material_definition_blob_id"`

	// ObjectModelBlobId Unique identifier for the object model blob.
	ObjectModelBlobId *string `mapstructure:"object_model_blob_id" json:"object_model_blob_id"`

	// ObjectThumbnailBlobId Unique identifier for the object thumbnail blob.
	ObjectThumbnailBlobId *string `mapstructure:"object_thumbnail_blob_id" json:"object_thumbnail_blob_id"`

	// TextureBlobId Unique identifier for the texture blob.
	TextureBlobId *string `mapstructure:"texture_blob_id" json:"texture_blob_id"`
}

// TODO: We can turn `Model` into an enum
//
// const (
// 	DreamfusionDeepfloydIf     PromptModel = "dreamfusion_deepfloyd-if"
// 	DreamfusionStableDiffusion PromptModel = "dreamfusion_stable-diffusion"
// )
//
// type PromptModel = string
