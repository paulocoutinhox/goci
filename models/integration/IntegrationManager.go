package integration

import (
	"github.com/prsolucoes/goci/models/response"
	"fmt"
)

type IntegrationManager struct {
	Integrations []IIntegration
}

func (This *IntegrationManager)Init() {
	This.Integrations = []IIntegration{}
}

func (This *IntegrationManager)Add(integration IIntegration) {
	This.Integrations = append(This.Integrations, integration)
}

func (This *IntegrationManager)Has(name string) bool {
	if This.Integrations == nil {
		return false
	}

	for _, integration := range This.Integrations {
		if integration.GetName() == name {
			return true
		}
	}

	return false
}

func (This *IntegrationManager)Count() int {
	if This.Integrations == nil {
		return 0
	}

	return len(This.Integrations)
}

func (This *IntegrationManager)Call(name string, options map[string]interface{}) *response.Response {
	response := response.NewResponse()

	if This.Integrations == nil {
		response.AddDataError("integrations", "Integration list is invalid")
		return response
	}

	for _, integration := range This.Integrations {
		if integration.GetName() == name {
			return integration.Call(options)
		}
	}

	response.AddDataError("integration", fmt.Sprintf("Integration was not found (%v)", name))
	return response
}