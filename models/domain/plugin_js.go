package domain

import (
	"errors"
	"github.com/robertkrimen/otto"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"io/ioutil"
	"os/exec"
	"strings"
	"time"
)

const (
	PLUGIN_JS_NAME = "js"
)

type PluginJS struct {
	Job       *Job
	Step      *ProjectTaskStep
	StepIndex int
}

func (This *PluginJS) GetName() string {
	return PLUGIN_JS_NAME
}

func (This *PluginJS) Init(job *Job, step *ProjectTaskStep, stepIndex int) error {
	This.Job = job
	This.Step = step
	This.StepIndex = stepIndex

	return nil
}

func (This *PluginJS) Process() error {
	This.Job.AppendOutputLine(OG_CONSOLE, This.Step.Description)

	// set execution options
	if len(This.Step.Options) > 0 {
		file := ""

		for _, option := range This.Step.Options {
			if option.ID == "file" {
				file = option.Value
			}
		}

		// check for file name
		file = strings.Replace(file, "${GOCI_WORKSPACE_DIR}", app.Server.WorkspaceDir, -1)
		file = strings.Trim(file, " ")

		if file == "" {
			errorMessage := "File is invalid"
			util.Debugf("Step executed with error: %v", errorMessage)
			return errors.New(errorMessage)
		}

		// check for file content
		fileContent, err := ioutil.ReadFile(file)

		if err != nil {
			util.Debugf("Step executed with error: %v", err.Error())
			return err
		}

		// define variables, functions and execute file content
		vm := otto.New()
		_, err = vm.Run(string(fileContent))

		if err != nil {
			util.Debugf("Step executed with error: %v", err.Error())
			return err
		}
	}

	// save step result
	stepFinishedAt := time.Now().UTC().Unix()
	This.Job.Duration = stepFinishedAt - This.Job.StartedAt
	This.Job.Save()

	return nil
}

func (This *PluginJS) GoCIExec(command string, params ...string) error {
	return This.GoCIExecOnDir("", command, params...)
}

func (This *PluginJS) GoCIExecOnDir(dir string, command string, params ...string) error {
	cmd := exec.Command(command, params...)
	cmd.Dir = dir
	out, err := cmd.Output()

	if err != nil {
		return err
	} else {
		outList := strings.Split(string(out), "\n")

		for _, outListItem := range outList {
			This.Job.AppendOutputLine(OG_CONSOLE, outListItem)
		}
	}

	return nil
}

func (This *PluginJS) GoCIJSImport(vm *otto.Otto) *otto.Otto {
	return vm
}
