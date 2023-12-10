package objectid

import (
	"crypto/rand"
	"fmt"
	"io"
)

const objectIdLen = 12

// ObjectId returns a unique object id for a given prefix.
func ObjectId(prefix string) (string, error) {
	if prefix == "" {
		return prefix, nil
	}

	reader := rand.Reader

	buf := make([]byte, objectIdLen)
	if _, err := io.ReadFull(reader, buf); err != nil {
		return "", fmt.Errorf("failed to read random bytes: %w", err)
	}

	return fmt.Sprintf("%s_%x%x%x",
		prefix,
		buf[0:4],
		buf[4:8],
		buf[8:12],
	), nil

}
