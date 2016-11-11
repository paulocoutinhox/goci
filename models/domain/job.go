package domain

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"io/ioutil"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

const (
	JOB_STATUS_ON_QUEUE = "onqueue"
	JOB_STATUS_RUNNING = "running"
	JOB_STATUS_SUCCESS = "success"
	JOB_STATUS_ERROR = "error"

	OG_CONSOLE = "Console"
)

type Job struct {
	ID                string           `json:"id"`
	TaskID            string           `json:"taskId"`
	ProjectID         string           `json:"projectId"`
	ProjectName       string           `json:"projectName"`
	OutputGroup       []*JobOutputData `json:"outputGroup"`
	Duration          int64            `json:"duration"`
	Progress          int              `json:"progress"`
	Status            string           `json:"status"`
	CreatedAt         int64            `json:"createdAt"`
	StartedAt         int64            `json:"startedAt"`
	FinishedAt        int64            `json:"finishedAt"`
	Task              *ProjectTask     `json:"task"`
	Options           []*JobOptionItem `json:"options"`
	runningStepPlugin *IPlugin         `json:"runningStepPlugin"`
}

func NewJob() *Job {
	return &Job{
		ID:          util.CreateNewJobID(),
		OutputGroup: []*JobOutputData{},
		Duration:    0,
		Status:      JOB_STATUS_ON_QUEUE,
		CreatedAt:   time.Now().UTC().Unix(),
	}
}

func JobFilesGetAllByProjectIdAndTaskId(projectId string, taskId string) (JobsByCreatedAtDesc, error) {
	if projectId == "" {
		return nil, errors.New("Project ID is invalid")
	}

	if taskId == "" {
		return nil, errors.New("Task ID is invalid")
	}

	path := app.Server.WorkspaceDir + "/logs/" + projectId + "/" + taskId + "/*.json"
	fileList, err := filepath.Glob(path)

	if err != nil {
		return nil, errors.New(fmt.Sprintf("Failed to get all job result files: %v", err))
	}

	resultList := []*Job{}

	for _, resultFile := range fileList {
		file, err := ioutil.ReadFile(resultFile)

		if err != nil {
			return nil, errors.New(fmt.Sprintf("Failed to load job result file: %v", err))
		}

		result := &Job{}
		err = json.Unmarshal(file, &result)

		if err != nil {
			return nil, errors.New(fmt.Sprintf("Failed to read job result file: %v", err))
		}

		resultList = append(resultList, result)

	}

	return resultList, nil
}

func JobFilesGetLastByProjectIdAndTaskId(projectId string, taskId string) (*Job, error) {
	projectId = strings.Trim(projectId, " ")
	taskId = strings.Trim(taskId, " ")

	if projectId == "" {
		return nil, errors.New("Project ID is invalid")
	}

	if taskId == "" {
		return nil, errors.New("Task ID is invalid")
	}

	results, err := JobFilesGetAllByProjectIdAndTaskId(projectId, taskId)
	sort.Sort(sort.Reverse(results))

	if err != nil {
		return nil, err
	}

	if len(results) > 0 {
		return results[0], nil
	}

	return nil, errors.New("Job result not found")
}

func (This *Job) Run() {
	util.Debugf("New job started: %v", This.ID)
	This.StartedAt = time.Now().UTC().Unix()
	This.FinishedAt = 0
	This.Status = JOB_STATUS_RUNNING

	jobError := false

	for stepIndex, step := range This.Task.Steps {
		var err error
		This.runningStepPlugin, err = PluginManagerInit(This, step, stepIndex)

		if err != nil {
			jobError = true
			This.LogError(OG_CONSOLE, err.Error())
			break
		}

		err = (*This.runningStepPlugin).Process()

		if err != nil {
			jobError = true
			This.LogError(OG_CONSOLE, err.Error())
			break
		}

		This.runningStepPlugin = nil
	}

	if !This.StatusIsFinalState() {
		if jobError {
			This.Status = JOB_STATUS_ERROR
		} else {
			This.Status = JOB_STATUS_SUCCESS
		}
	}

	This.FinishedAt = time.Now().UTC().Unix()
	This.Duration = This.FinishedAt - This.StartedAt
	This.Save()
	util.Debugf("Job finished: %v", This.ID)
}

func (This *Job) Save() {
	// create file content
	content, err := json.Marshal(This)

	if err != nil {
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
	err = ioutil.WriteFile(dir + filename, content, 0777)

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

func (This *Job) CreateOutputGroup(name string) (*JobOutputData, error) {
	for _, outputGroup := range This.OutputGroup {
		if outputGroup.Name == name {
			return outputGroup, nil
		}
	}

	outputGroup := &JobOutputData{
		Name:   name,
		Output: "",
	}

	This.OutputGroup = append(This.OutputGroup, outputGroup)

	return outputGroup, nil
}

func (This *Job) AppendOutputContent(name string, content string) {
	og, err := This.CreateOutputGroup(name)

	if err == nil {
		og.Output += content
		og.UpdateUpdatedAt()
	}
}

func (This *Job) Log(name string, contentLine string) {
	This.AppendOutputContent(name, fmt.Sprintf("<p>%s</p>", contentLine))
}

func (This *Job) LogInfo(name string, contentLine string) {
	This.AppendOutputContent(name, fmt.Sprintf("<p class='output-content-line-info'>%s</p>", contentLine))
}

func (This *Job) LogWarning(name string, contentLine string) {
	This.AppendOutputContent(name, fmt.Sprintf("<p class='output-content-line-warning'>%s</p>", contentLine))
}

func (This *Job) LogError(name string, contentLine string) {
	This.AppendOutputContent(name, fmt.Sprintf("<p class='output-content-line-error'>%s</p>", contentLine))
}

func (This *Job) LogSuccess(name string, contentLine string) {
	This.AppendOutputContent(name, fmt.Sprintf("<p class='output-content-line-success'>%s</p>", contentLine))
}

func (This *Job) LogML(name string, content string) {
	outList := strings.Split(content, "\n")

	for _, outListItem := range outList {
		This.Log(name, outListItem)
	}
}

func (This *Job) LogInfoML(name string, content string) {
	outList := strings.Split(content, "\n")

	for _, outListItem := range outList {
		This.LogInfo(name, outListItem)
	}
}

func (This *Job) LogWarningML(name string, content string) {
	outList := strings.Split(content, "\n")

	for _, outListItem := range outList {
		This.LogWarning(name, outListItem)
	}
}

func (This *Job) LogErrorML(name string, content string) {
	outList := strings.Split(content, "\n")

	for _, outListItem := range outList {
		This.LogError(name, outListItem)
	}
}

func (This *Job) LogSuccessML(name string, content string) {
	outList := strings.Split(content, "\n")

	for _, outListItem := range outList {
		This.LogSuccess(name, outListItem)
	}
}

func (This *Job) UpdateDuration() {
	currentTime := time.Now().UTC().Unix()
	startedTime := This.StartedAt

	if startedTime == 0 {
		startedTime = currentTime
	}

	This.Duration = currentTime - startedTime
}

func (This *Job) UpdateTemporaryDuration() {
	if This.Duration > 0 && This.FinishedAt > 0 {
		return
	}

	currentTime := time.Now().UTC().Unix()
	startedTime := This.StartedAt

	if startedTime == 0 {
		startedTime = currentTime
	}

	This.Duration = currentTime - startedTime
}

func (This *Job) SetStatusError() {
	This.Status = JOB_STATUS_ERROR
}

func (This *Job) SetStatusSuccess() {
	This.Status = JOB_STATUS_SUCCESS
}

func (This *Job) StatusIsFinalState() bool {
	return (This.Status == JOB_STATUS_SUCCESS || This.Status == JOB_STATUS_ERROR)
}

func (This *Job) Stop() error {
	if This.runningStepPlugin != nil {
		(*This.runningStepPlugin).Stop();
	}

	return nil
}
