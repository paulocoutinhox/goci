package domain

import (
	"errors"
	"fmt"
	anko_core "github.com/mattn/anko/builtins"
	"github.com/mattn/anko/vm"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/lib/ioutil"
	"github.com/prsolucoes/goci/lib/net/http"
	"github.com/prsolucoes/goci/lib/os"
	"github.com/prsolucoes/goci/lib/time"
	"github.com/prsolucoes/goci/models/util"
	goioutil "io/ioutil"
	"os/exec"
	"strings"
	gtime "time"
)

const (
	PLUGIN_ANKO_NAME = "anko"
)

type PluginAnko struct {
	Job       *Job
	Step      *ProjectTaskStep
	StepIndex int
}

func (This *PluginAnko) GetName() string {
	return PLUGIN_ANKO_NAME
}

func (This *PluginAnko) Init(job *Job, step *ProjectTaskStep, stepIndex int) error {
	This.Job = job
	This.Step = step
	This.StepIndex = stepIndex

	return nil
}

func (This *PluginAnko) Process() error {
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
		fileContent, err := goioutil.ReadFile(file)

		if err != nil {
			util.Debugf("Step executed with error: %v", err.Error())
			return err
		}

		// define variables, functions and execute file content
		var env = vm.NewEnv()
		anko_core.Import(env)

		pkgs := map[string]func(env *vm.Env) *vm.Env{
			"goci":       This.LibGoCIImport,
			"goci/const": This.LibGoCIConstantsImport,
			"goci/exec":  This.LibGoCIExecImport,
			"ioutil":     This.LibIoUtilImport,
			"net/http":   This.LibNetHttpImport,
			"os":         This.LibOSImport,
			"time":       This.LibTimeImport,
		}

		env.Define("import", func(s string) interface{} {
			if loader, ok := pkgs[s]; ok {
				m := loader(env)
				return m
			}

			errorMessage := fmt.Sprintf("Step executed with error: package '%s' not found", s)
			util.Debugf(errorMessage)
			return err
		})

		_, err = env.Execute(string(fileContent))

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

func (This *PluginAnko) GoCIExec(command string, params ...string) error {
	return This.GoCIExecOnDir("", command, params...)
}

func (This *PluginAnko) GoCIExecOnDir(dir string, command string, params ...string) error {
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

func (This *PluginAnko) LibGoCIImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("goci")
	m.Define("Job", This.Job)
	m.Define("Step", This.Step)
	m.Define("StepIndex", This.StepIndex)
	return m
}

func (This *PluginAnko) LibGoCIConstantsImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("goci/const")
	m.Define("WORKSPACE_DIR", app.Server.WorkspaceDir)
	m.Define("RESOURCES_DIR", app.Server.ResourcesDir)
	m.Define("CONFIG", app.Server.Config)
	m.Define("HOST", app.Server.Host)
	m.Define("OG_CONSOLE", OG_CONSOLE)
	return m
}

func (This *PluginAnko) LibGoCIExecImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("goci/exec")
	m.Define("Exec", This.GoCIExec)
	m.Define("ExecOnDir", This.GoCIExecOnDir)
	return m
}

func (This *PluginAnko) LibNetHttpImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("net/http")
	m.Define("Get", http.Lib_Net_Http_Get)
	return m
}

func (This *PluginAnko) LibIoUtilImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("ioutil")
	m.Define("ReadFile", ioutil.Lib_IoUtil_ReadFile)
	m.Define("WriteFile", ioutil.Lib_IoUtil_WriteFile)
	return m
}

func (This *PluginAnko) LibOSImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("os")
	m.Define("Getenv", os.Lib_OS_Getenv)
	m.Define("Mkdir", os.Lib_OS_Mkdir)
	m.Define("MkdirAll", os.Lib_OS_MkdirAll)
	m.Define("Remove", os.Lib_OS_Remove)
	m.Define("RemoveAll", os.Lib_OS_RemoveAll)
	return m
}

func (This *PluginAnko) LibTimeImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("time")
	m.Define("Sleep", time.Lib_Time_Sleep)
	return m
}
