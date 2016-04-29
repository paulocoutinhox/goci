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
	Task       *Task
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

	error := false

	for _, step := range This.Task.Steps {
		This.Output += fmt.Sprintf("<p>%s</p>", step.Description)

		if len(step.Params) > 0 {
			command := step.Params[0]

			if err := exec.Command(command, step.Params...).Run(); err != nil {
				error = true
				break
				//fmt.Fprintln(os.Stderr, err)
			}
		}
	}

	if error {
		This.Status = JOB_STATUS_ERROR
	} else {
		This.Status = JOB_STATUS_SUCCESS
	}

	This.Output = "<p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p> <p>sdasdsadadasdsd</p> <p>246324364876387463284683</p>"
	time.Sleep(10 * time.Second)

	This.FinishedAt = time.Now().UTC().Unix()
	This.Duration = This.FinishedAt - This.StartedAt
	This.Save()
	util.Debugf("Job finished: %v", This.ID)
}

func (This *Job) Save() {
	outputGroup := &ResultOutputGroup{
		Name:   "Console",
		Output: This.Output,
	}

	outputGroupList := make([]*ResultOutputGroup, 0)
	outputGroupList = append(outputGroupList, outputGroup)

	result := &Result{
		JobID:       This.ID,
		ProjectId:   This.ProjectID,
		TaskId:      This.TaskID,
		CreatedAt:   This.CreatedAt,
		StartedAt:   This.StartedAt,
		FinishedAt:  This.FinishedAt,
		Duration:    This.Duration,
		OutputGroup: outputGroupList,
	}

	// create file content
	content, err := json.Marshal(result)

	if err != nil {
		util.Debugf("Erro while marshal the job result: %v", err)
		return
	}

	// create log structure for this project
	filename := fmt.Sprintf("%d.json", time.Now().UTC().UnixNano())
	dir := app.Server.Workspace + "/logs/" + This.ProjectID + "/"

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
