package integration

import (
	"net/http"
	"io/ioutil"
	"github.com/prsolucoes/goci/models/response"
)

type IntegrationHttpGet struct {

}

const (
	INTEGRATION_NAME_HTTP_GET = "httpGet"
)

func (This *IntegrationHttpGet)GetName() string {
	return INTEGRATION_NAME_HTTP_GET
}

func (This *IntegrationHttpGet)Call(options map[string]interface{}) *response.Response {
	response := response.NewResponse()
	url, ok := options["url"]

	if ok {
		httpResponse, err := http.Get(url.(string))

		if err != nil {
			response.AddDataError("response", err.Error())
			return response
		}

		content, err := ioutil.ReadAll(httpResponse.Body)

		if err != nil {
			response.AddDataError("content", err.Error())
			return response
		}

		response.AddData("content", string(content))
		response.Success = true
	} else {
		response.Message = "validate"
		response.AddDataError("url", "Invalid URL")
	}

	return response
}