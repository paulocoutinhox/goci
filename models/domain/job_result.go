package domain

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"io/ioutil"
	"path/filepath"
	"strings"
	"sort"
)

type JobResult struct {
	JobID       string                  `json:"jobId"`
	ProjectId   string                  `json:"projectId"`
	TaskId      string                  `json:"taskId"`
	CreatedAt   int64                   `json:"createdAt"`
	StartedAt   int64                   `json:"startedAt"`
	FinishedAt  int64                   `json:"finishedAt"`
	Duration    int64                   `json:"duration"`
	Status      string                  `json:"status"`
	OutputGroup []*JobResultOutputGroup `json:"outputGroup"`
}

func JobResultGetAllByProjectIdAndTaskId(projectId string, taskId string) (JobResults, error) {
	if projectId == "" {
		return nil, errors.New("Project ID is invalid")
	}

	if taskId == "" {
		return nil, errors.New("Task ID is invalid")
	}

	path := app.Server.Workspace + "/logs/" + projectId + "/" + taskId + "/*.json"
	fileList, err := filepath.Glob(path)

	if err != nil {
		return nil, errors.New(fmt.Sprintf("Failed to get all job result files: %v", err))
	}

	util.Debugf("Job result files found: %v", len(fileList))

	resultList := []*JobResult{}

	for _, resultFile := range fileList {
		util.Debugf("Loading job result: %s", resultFile)
		file, err := ioutil.ReadFile(resultFile)

		if err != nil {
			return nil, errors.New(fmt.Sprintf("Failed to load job result file: %v", err))
		}

		result := &JobResult{}
		err = json.Unmarshal(file, &result)

		if err != nil {
			return nil, errors.New(fmt.Sprintf("Failed to read job result file: %v", err))
		}

		resultList = append(resultList, result)

		util.Debugf("Job result (%s) loaded", resultFile)
	}

	return resultList, nil
}

func JobResultGetLastByProjectIdAndTaskId(projectId string, taskId string) (*JobResult, error) {
	projectId = strings.Trim(projectId, " ")
	taskId = strings.Trim(taskId, " ")

	if projectId == "" {
		return nil, errors.New("Project ID is invalid")
	}

	if taskId == "" {
		return nil, errors.New("Task ID is invalid")
	}

	results, err := JobResultGetAllByProjectIdAndTaskId(projectId, taskId)
	sort.Sort(results)

	if err != nil {
		return nil, err
	}

	if len(results) > 0 {
		return results[len(results)-1], nil
	}

	return nil, errors.New("Job result not found")
}