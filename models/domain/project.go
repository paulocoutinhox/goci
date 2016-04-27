package domain

import (
	"path/filepath"
	"io/ioutil"
	"encoding/json"
	"github.com/prsolucoes/goci/models/util"
	"fmt"
	"errors"
	"github.com/prsolucoes/goci/app"
)

type Project  struct {
	Description string `json:"description"`
	Name        string `json:"name"`
	Tasks       []struct {
		Description string `json:"description"`
		Name        string `json:"name"`
		Steps       []struct {
			Command     string `json:"command"`
			Description string `json:"description"`
		} `json:"steps"`
	} `json:"tasks"`
}

func (This *Project)GetAll() ([]*Project, error) {
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
