package domain

type Step struct {
	Description string `json:"description"`
	Plugin      string `json:"plugin"`
	Params      []string `json:"params"`
}