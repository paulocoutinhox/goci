package ioutil

import (
	"io/ioutil"
	"os"
)

func Lib_IoUtil_ReadFile(filename string) string {
	content, err := ioutil.ReadFile(filename)

	if err != nil {
		return ""
	}

	return string(content)
}

func Lib_IoUtil_WriteFile(filename string, data string, perms os.FileMode) bool {
	err := ioutil.WriteFile(filename, []byte(data), perms)

	if err != nil {
		return false
	}

	return true
}
