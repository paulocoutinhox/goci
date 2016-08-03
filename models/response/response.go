package response

import (
	"encoding/json"
	"fmt"
)

type Response struct {
	Success bool                   `json:"success"`
	Message string                 `json:"message"`
	Data    map[string]interface{} `json:"data"`
}

func NewResponse() *Response {
	return &Response{
		Success: false,
		Message: "",
		Data:    make(map[string]interface{}),
	}
}

func (s *Response) AddData(key string, value interface{}) {
	if s.Data == nil {
		s.Data = make(map[string]interface{})
	}

	s.Data[key] = value
}

func (s *Response) ClearData() {
	s.Data = make(map[string]interface{})
}

func (s *Response) ClearDataErrors() {
	if s.Data == nil {
		s.Data = make(map[string]interface{})
	}

	m := make([]struct {
		Key   string `json:"0"`
		Value string `json:"1"`
	}, 0)

	s.Data["errors"] = m
}

func (s *Response) AddDataError(key string, message string) error {
	if s.Data == nil {
		s.Data = make(map[string]interface{})
	}

	errMap, ok := s.Data["errors"]

	if !ok {
		v := [2]string{key, message}

		m := make([][2]string, 0)
		m = append(m, v)
		s.Data["errors"] = m

		return nil
	}

	switch m := errMap.(type) {
	default:
		return fmt.Errorf("Unexpected type: %T", m)
	case [][2]string:
		v := [2]string{key, message}

		m = append(m, v)
		s.Data["errors"] = m
	}

	return nil
}

func (s *Response) GetFirstDataError() string {
	return s.GetDataError(0)
}

func (s *Response) GetDataError(index int) string {
	if s.Data == nil {
		return ""
	}

	dataErrorsRaw, ok := s.Data["errors"]

	if ok {
		dataErrors := dataErrorsRaw.([][2]string)

		if index < len(dataErrors) {
			return dataErrors[index][1]
		}
	}

	return ""
}

func (s *Response) ToString() string {
	jsonData, err := json.Marshal(s)

	if err != nil {
		return ""
	}

	return string(jsonData)
}
