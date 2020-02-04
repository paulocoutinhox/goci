package domain

import (
	"os/exec"
	"strings"
	"time"

	"github.com/prsolucoes/goci/models/util"
)

const (
	PLUGIN_CLI_NAME = "cli"
)

type PluginCLI struct {
	Job       *Job
	Step      *ProjectTaskStep
	StepIndex int
	cmd       *exec.Cmd
}

func (This *PluginCLI) GetName() string {
	return PLUGIN_CLI_NAME
}

func (This *PluginCLI) Init(job *Job, step *ProjectTaskStep, stepIndex int) error {
	This.Job = job
	This.Step = step
	This.StepIndex = stepIndex

	return nil
}

func (This *PluginCLI) Process() error {
	This.Job.Log(OG_CONSOLE, This.Step.Description)

	// set current progress
	totalSteps := len(This.Job.Task.Steps)
	This.Job.SetProgress((100 * (This.StepIndex + 1)) / totalSteps)

	// set execution options
	if len(This.Step.Options) > 0 {
		command := ""
		params := []string{}
		workingDir := ""

		for _, option := range This.Step.Options {
			if option.ID == "working-dir" {
				workingDir = option.Value
			} else if option.ID == "command" {
				command = option.Value
			} else if option.ID == "param" {
				params = append(params, option.Value)
			}
		}

		This.cmd = exec.Command(command, params...)
		This.cmd.Dir = workingDir
		out, err := This.cmd.Output()

		if err != nil {
			util.Debugf("Step executed with error: %v", err)
			return err
		} else {
			outList := strings.Split(string(out), "\n")

			for _, outListItem := range outList {
				This.Job.Log(OG_CONSOLE, outListItem)
			}
		}
	}

	// save step result
	stepFinishedAt := time.Now().UTC().Unix()
	This.Job.Duration = stepFinishedAt - This.Job.StartedAt
	This.Job.Save()

	return nil
}

func (This *PluginCLI) Stop() error {
	This.Job.LogError(OG_CONSOLE, "Job stopped by the user")
	This.Job.UpdateDuration()
	This.Job.Status = JOB_STATUS_ERROR
	This.Job.Save()

	if This.cmd != nil && This.cmd.Process != nil {
		This.cmd.Process.Kill()
	}

	return nil
}
