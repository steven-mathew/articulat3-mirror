package blobstore

// GCSConfig is config for a Google Cloud Storage bucket.
type GCSConfig struct {
	Bucket              string
	CredentialsFilePath string
}
