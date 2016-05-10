package http

import (
	"io/ioutil"
	"net/http"
)

func Lib_Net_Http_Get(url string) string {
	response, err := http.Get(url)

	if err != nil {
		return ""
	}

	content, err := ioutil.ReadAll(response.Body)

	if err != nil {
		return ""
	}

	return string(content)
}
