package integration

import (
	"github.com/prsolucoes/goci/models/response"
	"github.com/sendgrid/sendgrid-go"
)

type IntegrationSendGrid struct {
}

const (
	INTEGRATION_NAME_SEND_GRID = "SendGrid"
)

func (This *IntegrationSendGrid) GetName() string {
	return INTEGRATION_NAME_SEND_GRID
}

func (This *IntegrationSendGrid) Call(options map[string]interface{}) *response.Response {
	response := response.NewResponse()

	optMailToList := []string{}
	optMailFromEmail := ""
	optMailFromName := ""
	optSendGridKey := ""
	optMailSubject := ""
	optMailBody := ""

	for key, value := range options {
		if key == "to" {
			if data, ok := value.([]string); ok {
				for _, mailTo := range data {
					optMailToList = append(optMailToList, mailTo)
				}
			}
		} else if key == "key" {
			if data, ok := value.(string); ok {
				optSendGridKey = data
			}
		} else if key == "fromEmail" {
			if data, ok := value.(string); ok {
				optMailFromEmail = data
			}
		} else if key == "fromName" {
			if data, ok := value.(string); ok {
				optMailFromName = data
			}
		} else if key == "mailSubject" {
			if data, ok := value.(string); ok {
				optMailSubject = data
			}
		} else if key == "mailBody" {
			if data, ok := value.(string); ok {
				optMailBody = data
			}
		}
	}

	sg := sendgrid.NewSendGridClientWithApiKey(optSendGridKey)

	message := sendgrid.NewMail()

	for _, mailTo := range optMailToList {
		message.AddTo(mailTo)
	}

	message.SetFrom(optMailFromEmail)
	message.SetFromName(optMailFromName)

	message.SetSubject(optMailSubject)
	message.SetHTML(optMailBody)

	err := sg.Send(message)

	if err == nil {
		response.Success = true
	} else {
		response.AddDataError(INTEGRATION_NAME_SEND_GRID, err.Error())
	}

	return response
}
