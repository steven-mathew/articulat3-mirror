package objectid

import (
	"fmt"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

var alphabet = "0123456789abcdefghijklmnopqrstuvwxyz"

func TestObjectId_PrefixIsPresent(t *testing.T) {
	t.Parallel()

	prefix := "hello"

	expected := prefix
	actual, err := ObjectId(prefix)

	require.NoError(t, err)
	require.Equal(t, expected, actual[0:5])
}

func TestObjectId_LenIs24AndCharactersInAlphabet(t *testing.T) {
	t.Parallel()

	prefix := "hello"

	actual, err := ObjectId(prefix)
	require.NoError(t, err)

	for _, ch := range actual[6:] {
		assert.True(t, strings.Contains(alphabet, string(ch)), fmt.Sprintf("%s", string(ch)))
	}
}

func TestObjectId_NoErrorWhenPrefixEmpty(t *testing.T) {
	actual, err := ObjectId("")
	expected := ""

	require.NoError(t, err)
	require.Equal(t, expected, actual)
}
