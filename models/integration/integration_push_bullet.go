package integration

import (
	"github.com/mitsuse/pushbullet-go"
	"github.com/mitsuse/pushbullet-go/requests"
	"github.com/prsolucoes/goci/models/response"
)

type IntegrationPushBullet struct {
}

const (
	INTEGRATION_NAME_PUSH_BULLET = "PushBullet"
)

func (This *IntegrationPushBullet) GetName() string {
	return INTEGRATION_NAME_PUSH_BULLET
}

func (This *IntegrationPushBullet) Call(options map[string]interface{}) *response.Response {
	response := response.NewResponse()

	optAccessToken := ""
	optDeviceIden := ""
	optEmail := ""
	optChannelTag := ""
	optClientIden := ""
	optTitle := ""
	optBody := ""

	for key, value := range options {
		if key == "accessToken" {
			if data, ok := value.(string); ok {
				optAccessToken = data
			}
		} else if key == "deviceIden" {
			if data, ok := value.(string); ok {
				optDeviceIden = data
			}
		} else if key == "email" {
			if data, ok := value.(string); ok {
				optEmail = data
			}
		} else if key == "channelTag" {
			if data, ok := value.(string); ok {
				optChannelTag = data
			}
		} else if key == "clientIden" {
			if data, ok := value.(string); ok {
				optClientIden = data
			}
		} else if key == "title" {
			if data, ok := value.(string); ok {
				optTitle = data
			}
		} else if key == "body" {
			if data, ok := value.(string); ok {
				optBody = data
			}
		}
	}

	pb := pushbullet.New(optAccessToken)

	n := requests.NewNote()
	n.Title = optTitle
	n.Body = optBody
	n.DeviceIden = optDeviceIden
	n.Email = optEmail
	n.ChannelTag = optChannelTag
	n.ClientIden = optClientIden

	_, err := pb.PostPushesNote(n)

	if err == nil {
		response.Success = true
	} else {
		response.AddDataError(INTEGRATION_NAME_PUSH_BULLET, err.Error())
	}

	return response
}
