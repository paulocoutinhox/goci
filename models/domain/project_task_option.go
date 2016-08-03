package domain

type ProjectTaskOption struct {
	ID          string                         `json:"id"`
	Type        string                         `json:"type"`
	Description string                         `json:"description"`
	Value       string                         `json:"value"`
	Values      []*ProjectTaskOptionValuesItem `json:"values"`
}
