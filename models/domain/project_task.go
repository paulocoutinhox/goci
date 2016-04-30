package domain

import (
	"errors"
	"github.com/prsolucoes/goci/models/util"
	"strings"
)

type ProjectTask struct {
	ID          string             `json:"id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Steps       []*ProjectTaskStep `json:"steps"`
}

func TaskGetById(project *Project, taskID string) (*ProjectTask, error) {
	taskID = strings.Trim(taskID, " ")

	if project == nil {
		return nil, errors.New("Project is invalid")
	}

	if taskID == "" {
		return nil, errors.New("Task ID is invalid")
	}

	tasks := project.Tasks

	if tasks == nil {
		tasks = []*ProjectTask{}
	}

	for _, task := range tasks {
		if task.ID == taskID {
			util.Debugf("Task found: %v", taskID)
			return task, nil
		}
	}

	return nil, errors.New("Task not found")
}
