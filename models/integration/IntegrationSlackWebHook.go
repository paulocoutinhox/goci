package integration

import (
	"github.com/prsolucoes/goci/models/response"
	"github.com/bluele/slack"
)

type IntegrationSlackWebHook struct {

}

const (
	INTEGRATION_NAME_SLACK_WEB_HOOK = "SlackWebHook"
)

func (This *IntegrationSlackWebHook)GetName() string {
	return INTEGRATION_NAME_SLACK_WEB_HOOK
}

func (This *IntegrationSlackWebHook)Call(options map[string]interface{}) *response.Response {
	response := response.NewResponse()

	optWebHookURL := ""
	optChannel := ""
	optAttachmentTitle := ""
	optAttachmentBody := ""
	optAttachmentColor := ""
	optMessageBody := ""

	for key, value := range options {
		if key == "url" {
			if data, ok := value.(string); ok {
				optWebHookURL = data
			}
		} else if key == "channel" {
			if data, ok := value.(string); ok {
				optChannel = data
			}
		} else if key == "attachmentTitle" {
			if data, ok := value.(string); ok {
				optAttachmentTitle = data
			}
		} else if key == "attachmentBody" {
			if data, ok := value.(string); ok {
				optAttachmentBody = data
			}
		} else if key == "attachmentColor" {
			if data, ok := value.(string); ok {
				optAttachmentColor = data
			}
		} else if key == "messageBody" {
			if data, ok := value.(string); ok {
				optMessageBody = data
			}
		}
	}

	attachments := []*slack.Attachment{}

	if optAttachmentTitle != "" && optAttachmentBody != "" {
		attachment := &slack.Attachment{}
		attachment.MarkdownIn = []string{"text", "preText", "fields"}
		attachment.Text = optAttachmentBody
		attachment.Title = optAttachmentTitle
		attachment.Color = optAttachmentColor
		attachment.Fallback = optMessageBody

		attachments = append(attachments, attachment)
	}

	hook := slack.NewWebHook(optWebHookURL)

	err := hook.PostMessage(&slack.WebHookPostPayload{
		Text:        optMessageBody,
		Channel:     optChannel,
		Attachments: attachments,
	})

	if err == nil {
		response.Success = true
	} else {
		response.AddDataError(INTEGRATION_NAME_SLACK_WEB_HOOK, err.Error())
	}

	return response
}