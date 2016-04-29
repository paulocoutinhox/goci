package domain

import (
	"path/filepath"
	"io/ioutil"
	"encoding/json"
	"github.com/prsolucoes/goci/models/util"
	"fmt"
	"errors"
	"github.com/prsolucoes/goci/app"
	"strings"
)

type Project struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Tasks       []*Task `json:"tasks"`
}

func ProjectGetAll() ([]*Project, error) {
	path := app.Server.Workspace + "/projects/*.json"
	fileList, err := filepath.Glob(path)

	if (err != nil) {
		return nil, errors.New(fmt.Sprintf("Failed to project files: %v", err))
	}

	util.Debugf("Projects files found: %v", len(fileList))

	projectList := []*Project{}

	for _, projectFile := range fileList {
		util.Debugf("Loading project: %s", projectFile)
		file, err := ioutil.ReadFile(projectFile)

		if (err != nil) {
			return nil, errors.New(fmt.Sprintf("Failed to load project file: %v", err))
		}

		project := &Project{}
		err = json.Unmarshal(file, &project)

		if (err != nil) {
			return nil, errors.New(fmt.Sprintf("Failed to read project file: %v", err))
		}

		projectList = append(projectList, project)

		util.Debugf("Project (%s) loaded", projectFile)
	}

	return projectList, nil
}

func ProjectGetById(projectID string) (*Project, error) {
	projectID = strings.Trim(projectID, " ")

	if projectID == "" {
		return nil, errors.New("Project ID is invalid")
	}

	projects, err := ProjectGetAll()

	if (err != nil) {
		return nil, err
	}

	for _, project := range projects {
		if project.ID == projectID {
			util.Debugf("Project found: %v", projectID)
			return project, nil
		}
	}

	return nil, errors.New("Project not found")
}
