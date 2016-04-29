package domain

const (
	RESULT_SUCCESS = "success"
	RESULT_ERROR   = "error"
)

type Result struct {
	JobID       string               `json:"jobId"`
	ProjectId   string               `json:"projectId"`
	TaskId      string               `json:"taskId"`
	CreatedAt   int64                `json:"createdAt"`
	StartedAt   int64                `json:"startedAt"`
	FinishedAt  int64                `json:"finishedAt"`
	Duration    int64                `json:"duration"`
	Status      string               `json:"string"`
	OutputGroup []*ResultOutputGroup `json:"outputGroup"`
}
