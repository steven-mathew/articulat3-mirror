package types

type Blob struct {
	Created  int          `mapstructure:"createdj" json:"created"`
	Filename *string      `mapstructure:"filename" json:"filename"`
	Id       *string      `mapstructure:"id" json:"id"`
	Purpose  *BlobPurpose `mapstructure:"purpose" json:"purpose"`
	Type     *string      `mapstructure:"type" json:"type"`
}

// Defines values for BlobPurpose.
const (
	MaterialDefinition BlobPurpose = "material_definition"
	ObjectModel        BlobPurpose = "object_model"
	ObjectThumbnail    BlobPurpose = "object_thumbnail"
	Texture            BlobPurpose = "texture"
)

// BlobPurpose The purpose of the uploaded blob:
//   - `material_definition` - A material definition that is to apply material to an object file.
//   - `object_model` - An object file (usually `.stl` or `.obj`)
//   - `texture` - A texture image that can be applied to an object model.
//   - `object_thumbnail` - A thumbnail for an object file.
type BlobPurpose string
