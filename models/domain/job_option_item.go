package domain

type JobOptionItem struct {
	ID     string   `json:"id"`
	Values []string `json:"values"`
}

func (This *JobOptionItem) GetFirstValue() string {
	return This.GetValue(0)
}

func (This *JobOptionItem) GetValue(index int) string {
	if This.Values != nil && len(This.Values) > 0 && index < len(This.Values) {
		return This.Values[index]
	}

	return ""
}
