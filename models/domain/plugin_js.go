package domain

import (
	"errors"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/lib/ioutil"
	"github.com/prsolucoes/goci/lib/net/http"
	"github.com/prsolucoes/goci/lib/os"
	"github.com/prsolucoes/goci/lib/time"
	"github.com/prsolucoes/goci/models/util"
	"github.com/robertkrimen/otto"
	gioutil "io/ioutil"
	"os/exec"
	"strings"
	gtime "time"
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
	This.Job.Log(OG_CONSOLE, This.Step.Description)

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
		fileContent, err := gioutil.ReadFile(file)

		if err != nil {
			util.Debugf("Step executed with error: %v", err.Error())
			return err
		}

		// define variables, functions and execute file content
		vm := otto.New()
		This.ImportLib(vm)
		_, err = vm.Run(string(fileContent))

		if err != nil {
			util.Debugf("Step executed with error: %v", err.Error())
			return err
		}
	}

	// save step result
	stepFinishedAt := gtime.Now().UTC().Unix()
	This.Job.Duration = stepFinishedAt - This.Job.StartedAt
	This.Job.Save()

	return nil
}

func (This *PluginJS) GoCIExec(command string, params ...string) string {
	return This.GoCIExecOnDir("", command, params...)
}

func (This *PluginJS) GoCIExecOnDir(dir string, command string, params ...string) string {
	cmd := exec.Command(command, params...)
	cmd.Dir = dir
	outBytes, err := cmd.Output()
	out := ""

	if outBytes != nil {
		out = string(outBytes)
	}

	outList := strings.Split(out, "\n")

	for _, outListItem := range outList {
		This.Job.Log(OG_CONSOLE, outListItem)
	}

	if err != nil {
		This.Job.LogError(OG_CONSOLE, err.Error())
		return err.Error()
	}

	return out
}

func (This *PluginJS) ImportLib(vm *otto.Otto) {
	vm.Set("goci", map[string]interface{}{
		"Job":       This.Job,
		"Step":      This.Step,
		"StepIndex": This.StepIndex,

		"const": map[string]interface{}{
			"OG_CONSOLE":    OG_CONSOLE,
			"WORKSPACE_DIR": app.Server.WorkspaceDir,
			"RESOURCES_DIR": app.Server.ResourcesDir,
			"CONFIG":        app.Server.Config,
			"HOST":          app.Server.Host,
		},

		"exec": map[string]interface{}{
			"Exec":      This.GoCIExec,
			"ExecOnDir": This.GoCIExecOnDir,
		},
	})

	vm.Set("net", map[string]interface{}{
		"http": map[string]interface{}{
			"Get": http.Lib_Net_Http_Get,
		},
	})

	vm.Set("ioutil", map[string]interface{}{
		"ReadFile":  ioutil.Lib_IoUtil_ReadFile,
		"WriteFile": ioutil.Lib_IoUtil_WriteFile,
	})

	vm.Set("os", map[string]interface{}{
		"Getenv":    os.Lib_OS_Getenv,
		"Mkdir":     os.Lib_OS_Mkdir,
		"MkdirAll":  os.Lib_OS_MkdirAll,
		"Remove":    os.Lib_OS_Remove,
		"RemoveAll": os.Lib_OS_RemoveAll,
	})

	vm.Set("time", map[string]interface{}{
		"Sleep": time.Lib_Time_Sleep,
	})
}
