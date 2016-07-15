package domain

import "time"

type JobOutputData struct {
	Name      string `json:"name"`
	Output    string `json:"output"`
	UpdatedAt int `json:"updatedAt"`
}

func (This *JobOutputData)UpdateUpdatedAt() {
	This.UpdatedAt = time.Now().Nanosecond()
}