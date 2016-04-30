package domain

type ProjectTaskStep struct {
	Description string                   `json:"description"`
	Plugin      string                   `json:"plugin"`
	Options     []*ProjectTaskStepOption `json:"options"`
}
