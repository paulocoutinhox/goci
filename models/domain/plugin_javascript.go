package domain

import (
	"bufio"
	"errors"
	gioutil "io/ioutil"
	"os/exec"
	"strings"
	gtime "time"

	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/lib/ioutil"
	"github.com/prsolucoes/goci/lib/net/http"
	"github.com/prsolucoes/goci/lib/os"
	"github.com/prsolucoes/goci/lib/time"
	"github.com/prsolucoes/goci/models/util"
	"github.com/robertkrimen/otto"
)

const (
	PLUGIN_JS_NAME = "js"
)

type PluginJS struct {
	Job       *Job
	Step      *ProjectTaskStep
	StepIndex int
	vm        *otto.Otto
	cmd       *exec.Cmd
	halt      error
}

func (This *PluginJS) GetName() string {
	return PLUGIN_JS_NAME
}

func (This *PluginJS) Init(job *Job, step *ProjectTaskStep, stepIndex int) error {
	This.Job = job
	This.Step = step
	This.StepIndex = stepIndex

	This.vm = otto.New()
	This.vm.Interrupt = make(chan func(), 1)

	This.halt = errors.New("Stopped by the user")

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
		This.ImportLib(This.vm)

		// check for panic when user stop
		defer func() {
			if caught := recover(); caught != nil {
				if caught == This.halt {
					return
				}

				panic(caught)
			}
		}()

		// run
		_, err = This.vm.Run(string(fileContent))

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

func (This *PluginJS) GoCIExec(options map[string]interface{}, command string, params ...string) string {
	outBuffer := ""

	addToLog := true
	logTabName := OG_CONSOLE
	logErrorTabName := logTabName
	directory := ""

	// check for addToLog option
	addToLogOption, ok := options["addToLog"]

	if ok {
		addToLogValue, ok := addToLogOption.(bool)

		if ok {
			addToLog = addToLogValue
		}
	}

	// check for log tab name option
	logTabNameOption, ok := options["logTabName"]

	if ok {
		logTabNameValue, ok := logTabNameOption.(string)

		if ok {
			logTabName = logTabNameValue
		}
	}

	// check for log tab name option
	logErrorTabNameOption, ok := options["logErrorTabName"]

	if ok {
		logErrorTabNameValue, ok := logErrorTabNameOption.(string)

		if ok {
			logErrorTabName = logErrorTabNameValue
		}
	}

	// check for directory option
	directoryOption, ok := options["dir"]

	if ok {
		directoryValue, ok := directoryOption.(string)

		if ok {
			directory = directoryValue
		}
	}

	// prepare to execute
	This.cmd = exec.Command(command, params...)
	This.cmd.Dir = directory
	stdout, err := This.cmd.StdoutPipe()

	if err != nil {
		if addToLog {
			This.Job.LogError(logErrorTabName, err.Error())
		}

		return err.Error()
	}

	stderr, err := This.cmd.StderrPipe()

	if err != nil {
		if addToLog {
			This.Job.LogError(logErrorTabName, err.Error())
		}

		return err.Error()
	}

	// execute async
	if err := This.cmd.Start(); err != nil {
		if addToLog {
			This.Job.LogError(logErrorTabName, err.Error())
		}

		return err.Error()
	}

	// read stdout while executing
	in := bufio.NewScanner(stdout)

	for in.Scan() {
		outBuffer += in.Text() + "\n"

		if addToLog {
			This.Job.Log(logTabName, in.Text())
		}
	}

	if err := in.Err(); err != nil {
		if addToLog {
			This.Job.LogError(logErrorTabName, err.Error())
		}

		return err.Error()
	}

	// read stderr while executing
	inError := bufio.NewScanner(stderr)

	for inError.Scan() {
		outBuffer += inError.Text() + "\n"

		if addToLog {
			This.Job.LogError(logErrorTabName, inError.Text())
		}
	}

	if err := inError.Err(); err != nil {
		if addToLog {
			This.Job.LogError(logErrorTabName, err.Error())
		}

		return err.Error()
	}

	This.cmd.Wait()
	This.cmd = nil

	return outBuffer
}

func (This *PluginJS) JSRequire(call otto.FunctionCall) otto.Value {
	file := call.Argument(0).String()

	data, err := gioutil.ReadFile(file)

	if err != nil {
		panic(call.Otto.MakeCustomError("RequireException", err.Error()))
	}

	_, err = call.Otto.Run(string(data))

	if err != nil {
		panic(call.Otto.MakeCustomError("RequireException", err.Error()))
	}

	return otto.TrueValue()
}

func (This *PluginJS) ImportLib(vm *otto.Otto) {
	vm.Set("goci", map[string]interface{}{
		"Job":                This.Job,
		"Step":               This.Step,
		"StepIndex":          This.StepIndex,
		"IntegrationManager": app.Server.IntegrationManager,

		"const": map[string]interface{}{
			"OG_CONSOLE":          OG_CONSOLE,
			"WORKSPACE_DIR":       app.Server.WorkspaceDir,
			"CONFIG":              app.Server.Config,
			"HOST":                app.Server.Host,
			"JOB_STATUS_ON_QUEUE": JOB_STATUS_ON_QUEUE,
			"JOB_STATUS_RUNNING":  JOB_STATUS_RUNNING,
			"JOB_STATUS_SUCCESS":  JOB_STATUS_SUCCESS,
			"JOB_STATUS_ERROR":    JOB_STATUS_ERROR,
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
		"Setenv":    os.Lib_OS_Setenv,
		"Mkdir":     os.Lib_OS_Mkdir,
		"MkdirAll":  os.Lib_OS_MkdirAll,
		"Remove":    os.Lib_OS_Remove,
		"RemoveAll": os.Lib_OS_RemoveAll,
		"Exec":      This.GoCIExec,
	})

	vm.Set("time", map[string]interface{}{
		"Sleep": time.Lib_Time_Sleep,
	})

	vm.Set("require", This.JSRequire)
}

func (This *PluginJS) Stop() error {
	This.Job.LogError(OG_CONSOLE, "Job stopped by the user")
	This.Job.UpdateDuration()
	This.Job.Status = JOB_STATUS_ERROR
	This.Job.Save()

	if This.cmd != nil && This.cmd.Process != nil {
		This.cmd.Process.Kill()
	}

	if This.vm.Interrupt != nil {
		This.vm.Interrupt <- func() {
			panic(This.halt)
		}
	}

	return nil
}
