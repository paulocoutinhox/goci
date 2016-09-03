package app

import (
	assetfs "github.com/elazarl/go-bindata-assetfs"
	"net/http"
	"strings"
	"github.com/prsolucoes/goci/assets"
)

type binaryFileSystem struct {
	fs http.FileSystem
}

func (b *binaryFileSystem) Open(name string) (http.File, error) {
	return b.fs.Open(name)
}

func (b *binaryFileSystem) Exists(prefix string, filepath string) bool {
	if p := strings.TrimPrefix(filepath, prefix); len(p) < len(filepath) {
		if _, err := b.fs.Open(p); err != nil {
			return false
		}
		return true
	}
	return false
}

func BinaryFileSystem(root string) *binaryFileSystem {
	fs := &assetfs.AssetFS{
		Asset: assets.Asset,
		AssetDir: assets.AssetDir,
		AssetInfo: assets.AssetInfo,
		Prefix: root,
	}

	return &binaryFileSystem{
		fs,
	}
}