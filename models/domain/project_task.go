package domain

import (
	"errors"
	"strings"
)

type ProjectTask struct {
	ID          string             `json:"id"`
	Name        string             `json:"name"`
	Description string             `json:"description"`
	Steps       []*ProjectTaskStep `json:"steps"`
	Options     []*ProjectTaskStepOption `json:"options"`
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
			return task, nil
		}
	}

	return nil, errors.New("Task not found")
}
