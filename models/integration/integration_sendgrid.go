package integration

import (
	"github.com/prsolucoes/goci/models/response"
	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
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

	// create the message
	message := mail.NewV3Mail()
	message.From = mail.NewEmail(optMailFromName, optMailFromEmail)
	message.Subject = optMailSubject

	content := []*mail.Content{}
	content = append(content, mail.NewContent("text/html", optMailBody))
	message.Content = content

	for _, mailTo := range optMailToList {
		p := mail.NewPersonalization()
		p.AddTos(mail.NewEmail("", mailTo))
		message.AddPersonalizations(p)
	}

	// create the request to API
	request := sendgrid.GetRequest(optSendGridKey, "/v3/mail/send", "https://api.sendgrid.com")
	request.Method = "POST"
	request.Body = mail.GetRequestBody(message)
	_, err := sendgrid.API(request)

	if err == nil {
		response.Success = true
	} else {
		response.AddDataError(INTEGRATION_NAME_SEND_GRID, err.Error())
	}

	return response
}