package domain

import (
	"fmt"
	"github.com/prsolucoes/goci/models/util"
	"os/exec"
	"strings"
	"time"
)

type PluginCLI struct {
}

func (This *PluginCLI) GetName() string {
	return "cli"
}

func (This *PluginCLI) Process(job *Job, step *ProjectTaskStep, stepIndex int) error {
	// create a new output group if empty
	if len(job.OutputGroup) == 0 {
		outputGroup := &JobResultOutputGroup{
			Name:   "Console",
			Output: "",
		}

		outputGroupList := []*JobResultOutputGroup{}
		outputGroupList = append(outputGroupList, outputGroup)

		job.OutputGroup = outputGroupList
	}

	// show step description
	job.OutputGroup[0].Output += fmt.Sprintf("<p>%s</p>", step.Description)

	// set current progress
	totalSteps := len(job.Task.Steps)
	job.SetProgress((100 * (stepIndex + 1)) / totalSteps)

	// set execution options
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
			job.OutputGroup[0].Output += fmt.Sprintf("<p>%s</p>", err.Error())
			return err
		} else {
			outList := strings.Split(string(out), "\n")

			for _, outListItem := range outList {
				job.OutputGroup[0].Output += fmt.Sprintf("<p>%s</p>", outListItem)
			}
		}
	}

	// save step result
	stepFinishedAt := time.Now().UTC().Unix()
	job.Duration = stepFinishedAt - job.StartedAt
	job.Save()

	return nil
}
