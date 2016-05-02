package domain

import (
	"errors"
	"fmt"
	anko_core "github.com/mattn/anko/builtins"
	anko_encoding_json "github.com/mattn/anko/builtins/encoding/json"
	anko_flag "github.com/mattn/anko/builtins/flag"
	anko_fmt "github.com/mattn/anko/builtins/fmt"
	anko_io "github.com/mattn/anko/builtins/io"
	anko_io_ioutil "github.com/mattn/anko/builtins/io/ioutil"
	anko_math "github.com/mattn/anko/builtins/math"
	anko_math_rand "github.com/mattn/anko/builtins/math/rand"
	anko_net "github.com/mattn/anko/builtins/net"
	anko_net_http "github.com/mattn/anko/builtins/net/http"
	anko_net_url "github.com/mattn/anko/builtins/net/url"
	anko_os "github.com/mattn/anko/builtins/os"
	anko_os_exec "github.com/mattn/anko/builtins/os/exec"
	anko_os_signal "github.com/mattn/anko/builtins/os/signal"
	anko_path "github.com/mattn/anko/builtins/path"
	anko_path_filepath "github.com/mattn/anko/builtins/path/filepath"
	anko_regexp "github.com/mattn/anko/builtins/regexp"
	anko_runtime "github.com/mattn/anko/builtins/runtime"
	anko_sort "github.com/mattn/anko/builtins/sort"
	anko_strings "github.com/mattn/anko/builtins/strings"
	anko_time "github.com/mattn/anko/builtins/time"
	"github.com/mattn/anko/vm"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"io/ioutil"
	"os/exec"
	"strings"
	"time"
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
	This.Job.AppendOutputContentLine(JOB_OUTPUT_GROUP_CONSOLE_NAME, This.Step.Description)

	// set execution options
	if len(This.Step.Options) > 0 {
		file := ""

		for _, option := range This.Step.Options {
			if option.ID == "file" {
				file = option.Value
			}
		}

		// check for file name
		file = strings.Replace(file, "${GOCI_WORKSPACE}", app.Server.WorkspaceDir, -1)
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
		var env = vm.NewEnv()
		anko_core.Import(env)

		pkgs := map[string]func(env *vm.Env) *vm.Env{
			"encoding/json": anko_encoding_json.Import,
			"flag":          anko_flag.Import,
			"fmt":           anko_fmt.Import,
			"io":            anko_io.Import,
			"io/ioutil":     anko_io_ioutil.Import,
			"math":          anko_math.Import,
			"math/rand":     anko_math_rand.Import,
			"net":           anko_net.Import,
			"net/http":      anko_net_http.Import,
			"net/url":       anko_net_url.Import,
			"os":            anko_os.Import,
			"os/exec":       anko_os_exec.Import,
			"os/signal":     anko_os_signal.Import,
			"path":          anko_path.Import,
			"path/filepath": anko_path_filepath.Import,
			"regexp":        anko_regexp.Import,
			"runtime":       anko_runtime.Import,
			"sort":          anko_sort.Import,
			"strings":       anko_strings.Import,
			"time":          anko_time.Import,
			"goci":          This.GociAnkoImport,
		}

		env.Define("import", func(s string) interface{} {
			if loader, ok := pkgs[s]; ok {
				m := loader(env)
				return m
			}
			panic(fmt.Sprintf("package '%s' not found", s))
		})

		env.Define("JOB_OUTPUT_GROUP_CONSOLE_NAME", JOB_OUTPUT_GROUP_CONSOLE_NAME)
		env.Define("GOCI_WORKSPACE", app.Server.WorkspaceDir)
		env.Define("GOCI_CONFIG", app.Server.Config)
		env.Define("GOCI_HOST", app.Server.Host)

		env.Define("job", This.Job)
		env.Define("step", This.Step)
		env.Define("stepIndex", This.StepIndex)

		_, err = env.Execute(string(fileContent))

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

func (This *PluginAnko) GociExec(command string, params ...string) error {
	cmd := exec.Command(command, params...)
	out, err := cmd.Output()

	if err != nil {
		return err
	} else {
		outList := strings.Split(string(out), "\n")

		for _, outListItem := range outList {
			This.Job.AppendOutputContentLine(JOB_OUTPUT_GROUP_CONSOLE_NAME, outListItem)
		}
	}

	return nil
}

func (This *PluginAnko) GociAnkoImport(env *vm.Env) *vm.Env {
	m := env.NewPackage("goci")
	m.Define("Exec", This.GociExec)
	return m
}
