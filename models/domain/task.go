package domain

import (
	"github.com/prsolucoes/goci/models/util"
	"errors"
	"strings"
)

type Task struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Steps       []*Step `json:"steps"`
}

func TaskGetById(project *Project, taskID string) (*Task, error) {
	taskID = strings.Trim(taskID, " ")

	if project == nil {
		return nil, errors.New("Project is invalid")
	}

	if taskID == "" {
		return nil, errors.New("Task ID is invalid")
	}

	tasks := project.Tasks

	if (tasks == nil) {
		tasks = []*Task{}
	}

	for _, task := range tasks {
		if task.ID == taskID {
			util.Debugf("Task found: %v", taskID)
			return task, nil
		}
	}

	return nil, errors.New("Task not found")
}