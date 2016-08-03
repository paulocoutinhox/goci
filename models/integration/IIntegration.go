package integration

import "github.com/prsolucoes/goci/models/response"

type IIntegration interface {
	Call(options map[string]interface{}) *response.Response
	GetName() string
}