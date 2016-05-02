package domain

type IPlugin interface {
	GetName() string
	Process() error
	Init(job *Job, step *ProjectTaskStep, stepIndex int) error
}
