package domain

import (
	"encoding/json"
	"fmt"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"io/ioutil"
	"os"
	"os/exec"
	"time"
)

const (
	JOB_STATUS_ON_QUEUE = "onqueue"
	JOB_STATUS_RUNNING  = "running"
	JOB_STATUS_SUCCESS  = "success"
	JOB_STATUS_ERROR    = "error"
)

type Job struct {
	ID         string `json:"id"`
	TaskID     string `json:"taskId"`
	ProjectID  string `json:"projectId"`
	Output     string `json:"output"`
	Duration   int64  `json:"duration"`
	Status     string `json:"status"`
	CreatedAt  int64  `json:"createdAt"`
	StartedAt  int64  `json:"startedAt"`
	FinishedAt int64  `json:"finishedAt"`
	Task       *ProjectTask
}

func NewJob() *Job {
	return &Job{
		ID:        util.CreateNewJobID(),
		Output:    "",
		Duration:  0,
		Status:    JOB_STATUS_ON_QUEUE,
		CreatedAt: time.Now().UTC().Unix(),
	}
}

func (This *Job) Run() {
	util.Debugf("New job started: %v", This.ID)
	This.StartedAt = time.Now().UTC().Unix()
	This.Status = JOB_STATUS_RUNNING

	jobError := false

	for _, step := range This.Task.Steps {
		util.Debug("Step started")

		This.Output += fmt.Sprintf("<p>%s</p>", step.Description)

		if len(step.Options) > 0 {
			command := ""
			params := []string{}
			workingDir := ""

			for _, option := range step.Options {
				if option.ID == "working-dir" {
					workingDir = option.Value
				} else if option.ID == "command" {
					command = option.Value
				} else if option.ID == "param" {
					params = append(params, option.Value)
				}
			}

			cmd := exec.Command(command, params...)
			cmd.Dir = workingDir
			out, err := cmd.Output()

			if err != nil {
				util.Debugf("Step executed with error: %v", err)
				This.Output += fmt.Sprintf("<p>%s</p>", err.Error())
				jobError = true
				break
			} else {
				This.Output += string(out)
			}

			util.Debug("Step finished")
		}
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
	outputGroup := &JobResultOutputGroup{
		Name:   "Console",
		Output: This.Output,
	}

	outputGroupList := make([]*JobResultOutputGroup, 0)
	outputGroupList = append(outputGroupList, outputGroup)

	result := &JobResult{
		JobID:       This.ID,
		ProjectId:   This.ProjectID,
		TaskId:      This.TaskID,
		CreatedAt:   This.CreatedAt,
		StartedAt:   This.StartedAt,
		FinishedAt:  This.FinishedAt,
		Duration:    This.Duration,
		OutputGroup: outputGroupList,
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
	dir := app.Server.Workspace + "/logs/" + This.ProjectID + "/" + This.TaskID + "/"

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
