package domain

type IPlugin interface {
	GetName() string
	Process(job *Job, step *ProjectTaskStep, stepIndex int) error
}
