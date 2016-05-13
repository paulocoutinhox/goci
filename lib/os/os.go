package os

import "os"

func Lib_OS_MkdirAll(path string, perm os.FileMode) bool {
	err := os.MkdirAll(path, perm)

	if err != nil {
		return false
	}

	return true
}

func Lib_OS_Mkdir(path string, perm os.FileMode) bool {
	err := os.Mkdir(path, perm)

	if err != nil {
		return false
	}

	return true
}

func Lib_OS_RemoveAll(path string) bool {
	err := os.RemoveAll(path)

	if err != nil {
		return false
	}

	return true
}

func Lib_OS_Remove(name string) bool {
	err := os.Remove(name)

	if err != nil {
		return false
	}

	return true
}

func Lib_OS_Getenv(key string) string {
	return os.Getenv(key)
}

func Lib_OS_Setenv(key, value string) bool {
	err := os.Setenv(key, value)

	if err != nil {
		return false
	}

	return true
}
