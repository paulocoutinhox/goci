package domain

type ProjectTaskStepOption struct {
	ID          string `json:"id"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Value       string `json:"value"`
}
