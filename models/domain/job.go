package domain

import (
	"encoding/json"
	"fmt"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"io/ioutil"
	"os"
	"time"
)

const (
	JOB_STATUS_ON_QUEUE = "onqueue"
	JOB_STATUS_RUNNING  = "running"
	JOB_STATUS_SUCCESS  = "success"
	JOB_STATUS_ERROR    = "error"

	JOB_OUTPUT_GROUP_CONSOLE_NAME = "Console"
)

type Job struct {
	ID          string                  `json:"id"`
	TaskID      string                  `json:"taskId"`
	ProjectID   string                  `json:"projectId"`
	OutputGroup []*JobResultOutputGroup `json:"outputGroup"`
	Duration    int64                   `json:"duration"`
	Progress    int                     `json:"progress"`
	Status      string                  `json:"status"`
	CreatedAt   int64                   `json:"createdAt"`
	StartedAt   int64                   `json:"startedAt"`
	FinishedAt  int64                   `json:"finishedAt"`
	Task        *ProjectTask
}

func NewJob() *Job {
	return &Job{
		ID:          util.CreateNewJobID(),
		OutputGroup: []*JobResultOutputGroup{},
		Duration:    0,
		Status:      JOB_STATUS_ON_QUEUE,
		CreatedAt:   time.Now().UTC().Unix(),
	}
}

func (This *Job) Run() {
	util.Debugf("New job started: %v", This.ID)
	This.StartedAt = time.Now().UTC().Unix()
	This.FinishedAt = 0
	This.Status = JOB_STATUS_RUNNING

	jobError := false

	for stepIndex, step := range This.Task.Steps {
		util.Debugf("Step started: %v", step.Description)
		err := PluginManagerProcess(This, step, stepIndex)

		if err != nil {
			jobError = true

			This.AppendOutputContentLine(JOB_OUTPUT_GROUP_CONSOLE_NAME, err.Error())
		}

		util.Debugf("Step finished: %v", step.Description)
	}

	if jobError {
		This.Status = JOB_STATUS_ERROR
	} else {
		This.Status = JOB_STATUS_SUCCESS
	}

	This.FinishedAt = time.Now().UTC().Unix()
	This.Duration = This.FinishedAt - This.StartedAt
	This.Save()
	util.Debugf("Job finished: %v", This.ID)
}

func (This *Job) Save() {
	result := &JobResult{
		JobID:       This.ID,
		ProjectId:   This.ProjectID,
		TaskId:      This.TaskID,
		CreatedAt:   This.CreatedAt,
		StartedAt:   This.StartedAt,
		FinishedAt:  This.FinishedAt,
		Duration:    This.Duration,
		Progress:    This.Progress,
		OutputGroup: This.OutputGroup,
		Status:      This.Status,
	}

	// create file content
	content, err := json.Marshal(result)

	if err != nil {
		util.Debugf("Erro while marshal the job result: %v", err)
		return
	}

	// create log structure for this project
	filename := fmt.Sprintf("%s.json", This.ID)
	dir := app.Server.WorkspaceDir + "/logs/" + This.ProjectID + "/" + This.TaskID + "/"

	err = os.MkdirAll(dir, 0777)

	if err != nil {
		util.Debugf("Failed to create directory: %v", err)
		return
	}

	// write file contents
	err = ioutil.WriteFile(dir+filename, content, 0777)

	if err != nil {
		util.Debugf("Erro while save the job result file: %v", err)
		return
	}
}

func (This *Job) SetProgress(progress int) {
	if progress < 0 {
		progress = 0
	} else if progress > 100 {
		progress = 100
	}

	This.Progress = progress
}

func (This *Job) CreateOutputGroup(name string) (*JobResultOutputGroup, error) {
	for _, outputGroup := range This.OutputGroup {
		if outputGroup.Name == name {
			return outputGroup, nil
		}
	}

	outputGroup := &JobResultOutputGroup{
		Name:   name,
		Output: "",
	}

	This.OutputGroup = append(This.OutputGroup, outputGroup)

	return outputGroup, nil
}

func (This *Job) CreateConsoleOutputGroup(name string, content string) {
	This.CreateOutputGroup(JOB_OUTPUT_GROUP_CONSOLE_NAME)
}

func (This *Job) AppendOutputGroupContent(name string, content string) {
	og, err := This.CreateOutputGroup(name)

	if err == nil {
		og.Output += content
	}
}

func (This *Job) AppendOutputContentLine(name string, contentLine string) {
	This.AppendOutputGroupContent(name, fmt.Sprintf("<p>%s</p>", contentLine))
}

func (This *Job) UpdateDuration() {
	currentTime := time.Now().UTC().Unix()
	This.Duration = currentTime - This.StartedAt
}
