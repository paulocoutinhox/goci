package domain

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"github.com/robertkrimen/otto"
	"io/ioutil"
	"math"
	"math/rand"
	"net"
	"net/http"
	"net/url"
	"os"
	"os/exec"
	"path"
	"path/filepath"
	"regexp"
	"runtime"
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
		This.GoCIJSImport(vm)
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

func (This *PluginJS) GoCIJSImport(vm *otto.Otto) {
	vm.Set("goci", map[string]interface{}{
		"Job":       This.Job,
		"Step":      This.Step,
		"StepIndex": This.StepIndex,
		"Exec":      This.GoCIExec,
		"ExecOnDir": This.GoCIExecOnDir,

		"const": map[string]interface{}{
			"OG_CONSOLE":    OG_CONSOLE,
			"WORKSPACE_DIR": app.Server.WorkspaceDir,
			"RESOURCES_DIR": app.Server.ResourcesDir,
			"CONFIG":        app.Server.Config,
			"HOST":          app.Server.Host,
		},
	})

	vm.Set("ioutil", map[string]interface{}{
		"ReadAll":   ioutil.ReadAll,
		"ReadDir":   ioutil.ReadDir,
		"ReadFile":  ioutil.ReadFile,
		"WriteFile": ioutil.WriteFile,
	})

	vm.Set("json", map[string]interface{}{
		"Marshal":   json.Marshal,
		"Unmarshal": json.Unmarshal,
	})

	vm.Set("fmt", map[string]interface{}{
		"Errorf":   fmt.Errorf,
		"Fprint":   fmt.Fprint,
		"Fprintf":  fmt.Fprintf,
		"Fprintln": fmt.Fprintln,
		"Fscan":    fmt.Fscan,
		"Fscanf":   fmt.Fscanf,
		"Fscanln":  fmt.Fscanln,
		"Print":    fmt.Print,
		"Printf":   fmt.Printf,
		"Println":  fmt.Println,
		"Scan":     fmt.Scan,
		"Scanf":    fmt.Scanf,
		"Scanln":   fmt.Scanln,
		"Sprint":   fmt.Sprint,
		"Sprintf":  fmt.Sprintf,
		"Sprintln": fmt.Sprintln,
		"Sscan":    fmt.Sscan,
		"Sscanf":   fmt.Sscanf,
		"Sscanln":  fmt.Sscanln,
	})

	vm.Set("math", map[string]interface{}{
		"Abs":             math.Abs,
		"Acos":            math.Acos,
		"Acosh":           math.Acosh,
		"Asin":            math.Asin,
		"Asinh":           math.Asinh,
		"Atan":            math.Atan,
		"Atan2":           math.Atan2,
		"Atanh":           math.Atanh,
		"Cbrt":            math.Cbrt,
		"Ceil":            math.Ceil,
		"Copysign":        math.Copysign,
		"Cos":             math.Cos,
		"Cosh":            math.Cosh,
		"Dim":             math.Dim,
		"Erf":             math.Erf,
		"Erfc":            math.Erfc,
		"Exp":             math.Exp,
		"Exp2":            math.Exp2,
		"Expm1":           math.Expm1,
		"Float32bits":     math.Float32bits,
		"Float32frombits": math.Float32frombits,
		"Float64bits":     math.Float64bits,
		"Float64frombits": math.Float64frombits,
		"Floor":           math.Floor,
		"Frexp":           math.Frexp,
		"Gamma":           math.Gamma,
		"Hypot":           math.Hypot,
		"Ilogb":           math.Ilogb,
		"Inf":             math.Inf,
		"IsInf":           math.IsInf,
		"IsNaN":           math.IsNaN,
		"J0":              math.J0,
		"J1":              math.J1,
		"Jn":              math.Jn,
		"Ldexp":           math.Ldexp,
		"Lgamma":          math.Lgamma,
		"Log":             math.Log,
		"Log10":           math.Log10,
		"Log1p":           math.Log1p,
		"Log2":            math.Log2,
		"Logb":            math.Logb,
		"Max":             math.Max,
		"Min":             math.Min,
		"Mod":             math.Mod,
		"Modf":            math.Modf,
		"NaN":             math.NaN,
		"Nextafter":       math.Nextafter,
		"Pow":             math.Pow,
		"Pow10":           math.Pow10,
		"Remainder":       math.Remainder,
		"Signbit":         math.Signbit,
		"Sin":             math.Sin,
		"Sincos":          math.Sincos,
		"Sinh":            math.Sinh,
		"Sqrt":            math.Sqrt,
		"Tan":             math.Tan,
		"Tanh":            math.Tanh,
		"Trunc":           math.Trunc,
		"Y0":              math.Y0,
		"Y1":              math.Y1,
		"Yn":              math.Yn,

		"rand": map[string]interface{}{
			"ExpFloat64":  rand.ExpFloat64,
			"Float32":     rand.Float32,
			"Float64":     rand.Float64,
			"Int":         rand.Int,
			"Int31":       rand.Int31,
			"Int31n":      rand.Int31n,
			"Int63":       rand.Int63,
			"Int63n":      rand.Int63n,
			"Intn":        rand.Intn,
			"NormFloat64": rand.NormFloat64,
			"Perm":        rand.Perm,
			"Seed":        rand.Seed,
			"Uint32":      rand.Uint32,
		},
	})

	vm.Set("net", map[string]interface{}{
		"CIDRMask":                   net.CIDRMask,
		"Dial":                       net.Dial,
		"DialIP":                     net.DialIP,
		"DialTCP":                    net.DialTCP,
		"DialTimeout":                net.DialTimeout,
		"DialUDP":                    net.DialUDP,
		"DialUnix":                   net.DialUnix,
		"ErrWriteToConnected":        net.ErrWriteToConnected,
		"FileConn":                   net.FileConn,
		"FileListener":               net.FileListener,
		"FilePacketConn":             net.FilePacketConn,
		"FlagBroadcast":              net.FlagBroadcast,
		"FlagLoopback":               net.FlagLoopback,
		"FlagMulticast":              net.FlagMulticast,
		"FlagPointToPoint":           net.FlagPointToPoint,
		"FlagUp":                     net.FlagUp,
		"IPv4":                       net.IPv4,
		"IPv4Mask":                   net.IPv4Mask,
		"IPv4allrouter":              net.IPv4allrouter,
		"IPv4allsys":                 net.IPv4allsys,
		"IPv4bcast":                  net.IPv4bcast,
		"IPv4len":                    net.IPv4len,
		"IPv4zero":                   net.IPv4zero,
		"IPv6interfacelocalallnodes": net.IPv6interfacelocalallnodes,
		"IPv6len":                    net.IPv6len,
		"IPv6linklocalallnodes":      net.IPv6linklocalallnodes,
		"IPv6linklocalallrouters":    net.IPv6linklocalallrouters,
		"IPv6loopback":               net.IPv6loopback,
		"IPv6unspecified":            net.IPv6unspecified,
		"IPv6zero":                   net.IPv6zero,
		"InterfaceAddrs":             net.InterfaceAddrs,
		"InterfaceByIndex":           net.InterfaceByIndex,
		"InterfaceByName":            net.InterfaceByName,
		"Interfaces":                 net.Interfaces,
		"JoinHostPort":               net.JoinHostPort,
		"Listen":                     net.Listen,
		"ListenIP":                   net.ListenIP,
		"ListenMulticastUDP":         net.ListenMulticastUDP,
		"ListenPacket":               net.ListenPacket,
		"ListenTCP":                  net.ListenTCP,
		"ListenUDP":                  net.ListenUDP,
		"ListenUnix":                 net.ListenUnix,
		"ListenUnixgram":             net.ListenUnixgram,
		"LookupAddr":                 net.LookupAddr,
		"LookupCNAME":                net.LookupCNAME,
		"LookupHost":                 net.LookupHost,
		"LookupIP":                   net.LookupIP,
		"LookupMX":                   net.LookupMX,
		"LookupNS":                   net.LookupNS,
		"LookupPort":                 net.LookupPort,
		"LookupSRV":                  net.LookupSRV,
		"LookupTXT":                  net.LookupTXT,
		"ParseCIDR":                  net.ParseCIDR,
		"ParseIP":                    net.ParseIP,
		"ParseMAC":                   net.ParseMAC,
		"Pipe":                       net.Pipe,
		"ResolveIPAddr":              net.ResolveIPAddr,
		"ResolveTCPAddr":             net.ResolveTCPAddr,
		"ResolveUDPAddr":             net.ResolveUDPAddr,
		"ResolveUnixAddr":            net.ResolveUnixAddr,
		"SplitHostPort":              net.SplitHostPort,

		"http": map[string]interface{}{
			"Get":            http.Get,
			"Post":           http.Post,
			"PostForm":       http.PostForm,
			"NewRequest":     http.NewRequest,
			"DefaultClient":  http.DefaultClient,
			"NewServeMux":    http.NewServeMux,
			"Handle":         http.Handle,
			"HandleFunc":     http.HandleFunc,
			"ListenAndServe": http.ListenAndServe,
		},

		"url": map[string]interface{}{
			"Parse": url.Parse,
		},
	})

	vm.Set("os", map[string]interface{}{
		"Args":              os.Args,
		"Chdir":             os.Chdir,
		"Chmod":             os.Chmod,
		"Chown":             os.Chown,
		"Chtimes":           os.Chtimes,
		"Clearenv":          os.Clearenv,
		"Create":            os.Create,
		"DevNull":           os.DevNull,
		"Environ":           os.Environ,
		"ErrExist":          os.ErrExist,
		"ErrInvalid":        os.ErrInvalid,
		"ErrNotExist":       os.ErrNotExist,
		"ErrPermission":     os.ErrPermission,
		"Exit":              os.Exit,
		"Expand":            os.Expand,
		"ExpandEnv":         os.ExpandEnv,
		"FindProcess":       os.FindProcess,
		"Getegid":           os.Getegid,
		"Getenv":            os.Getenv,
		"Geteuid":           os.Geteuid,
		"Getgid":            os.Getgid,
		"Getgroups":         os.Getgroups,
		"Getpagesize":       os.Getpagesize,
		"Getpid":            os.Getpid,
		"Getuid":            os.Getuid,
		"Getwd":             os.Getwd,
		"Hostname":          os.Hostname,
		"Interrupt":         os.Interrupt,
		"IsExist":           os.IsExist,
		"IsNotExist":        os.IsNotExist,
		"IsPathSeparator":   os.IsPathSeparator,
		"IsPermission":      os.IsPermission,
		"Kill":              os.Kill,
		"Lchown":            os.Lchown,
		"Link":              os.Link,
		"Lstat":             os.Lstat,
		"Mkdir":             os.Mkdir,
		"MkdirAll":          os.MkdirAll,
		"ModeAppend":        os.ModeAppend,
		"ModeCharDevice":    os.ModeCharDevice,
		"ModeDevice":        os.ModeDevice,
		"ModeDir":           os.ModeDir,
		"ModeExclusive":     os.ModeExclusive,
		"ModeNamedPipe":     os.ModeNamedPipe,
		"ModePerm":          os.ModePerm,
		"ModeSetgid":        os.ModeSetgid,
		"ModeSetuid":        os.ModeSetuid,
		"ModeSocket":        os.ModeSocket,
		"ModeSticky":        os.ModeSticky,
		"ModeSymlink":       os.ModeSymlink,
		"ModeTemporary":     os.ModeTemporary,
		"ModeType":          os.ModeType,
		"NewFile":           os.NewFile,
		"NewSyscallError":   os.NewSyscallError,
		"O_APPEND":          os.O_APPEND,
		"O_CREATE":          os.O_CREATE,
		"O_EXCL":            os.O_EXCL,
		"O_RDONLY":          os.O_RDONLY,
		"O_RDWR":            os.O_RDWR,
		"O_SYNC":            os.O_SYNC,
		"O_TRUNC":           os.O_TRUNC,
		"O_WRONLY":          os.O_WRONLY,
		"Open":              os.Open,
		"OpenFile":          os.OpenFile,
		"PathListSeparator": os.PathListSeparator,
		"PathSeparator":     os.PathSeparator,
		"Pipe":              os.Pipe,
		"Readlink":          os.Readlink,
		"Remove":            os.Remove,
		"RemoveAll":         os.RemoveAll,
		"Rename":            os.Rename,
		"SEEK_CUR":          os.SEEK_CUR,
		"SEEK_END":          os.SEEK_END,
		"SEEK_SET":          os.SEEK_SET,
		"SameFile":          os.SameFile,
		"Setenv":            os.Setenv,
		"StartProcess":      os.StartProcess,
		"Stat":              os.Stat,
		"Stderr":            os.Stderr,
		"Stdin":             os.Stdin,
		"Stdout":            os.Stdout,
		"Symlink":           os.Symlink,
		"TempDir":           os.TempDir,
		"Truncate":          os.Truncate,

		"exec": map[string]interface{}{
			"ErrNotFound": exec.ErrNotFound,
			"LookPath":    exec.LookPath,
			"Command":     exec.Command,
		},
	})

	vm.Set("path", map[string]interface{}{
		"Base":          path.Base,
		"Clean":         path.Clean,
		"Dir":           path.Dir,
		"ErrBadPattern": path.ErrBadPattern,
		"Ext":           path.Ext,
		"IsAbs":         path.IsAbs,
		"Join":          path.Join,
		"Match":         path.Match,
		"Split":         path.Split,

		"filepath": map[string]interface{}{
			"Abs":          filepath.Abs,
			"Base":         filepath.Base,
			"Clean":        filepath.Clean,
			"Dir":          filepath.Dir,
			"EvalSymlinks": filepath.EvalSymlinks,
			"Ext":          filepath.Ext,
			"FromSlash":    filepath.FromSlash,
			"Glob":         filepath.Glob,
			"HasPrefix":    filepath.HasPrefix,
			"IsAbs":        filepath.IsAbs,
			"Join":         filepath.Join,
			"Match":        filepath.Match,
			"Rel":          filepath.Rel,
			"Split":        filepath.Split,
			"SplitList":    filepath.SplitList,
			"ToSlash":      filepath.ToSlash,
			"VolumeName":   filepath.VolumeName,
		},
	})

	vm.Set("regexp", map[string]interface{}{
		"Match":            regexp.Match,
		"MatchReader":      regexp.MatchReader,
		"MatchString":      regexp.MatchString,
		"QuoteMeta":        regexp.QuoteMeta,
		"Compile":          regexp.Compile,
		"CompilePOSIX":     regexp.CompilePOSIX,
		"MustCompile":      regexp.MustCompile,
		"MustCompilePOSIX": regexp.MustCompilePOSIX,
	})

	vm.Set("runtime", map[string]interface{}{
		"GC":         runtime.GC,
		"GOARCH":     runtime.GOARCH,
		"GOMAXPROCS": runtime.GOMAXPROCS,
		"GOOS":       runtime.GOOS,
		"GOROOT":     runtime.GOROOT,
	})

	vm.Set("strings", map[string]interface{}{
		"Contains":       strings.Contains,
		"ContainsAny":    strings.ContainsAny,
		"ContainsRune":   strings.ContainsRune,
		"Count":          strings.Count,
		"EqualFold":      strings.EqualFold,
		"Fields":         strings.Fields,
		"FieldsFunc":     strings.FieldsFunc,
		"HasPrefix":      strings.HasPrefix,
		"HasSuffix":      strings.HasSuffix,
		"Index":          strings.Index,
		"IndexAny":       strings.IndexAny,
		"IndexByte":      strings.IndexByte,
		"IndexFunc":      strings.IndexFunc,
		"IndexRune":      strings.IndexRune,
		"Join":           strings.Join,
		"LastIndex":      strings.LastIndex,
		"LastIndexAny":   strings.LastIndexAny,
		"LastIndexFunc":  strings.LastIndexFunc,
		"Map":            strings.Map,
		"NewReader":      strings.NewReader,
		"NewReplacer":    strings.NewReplacer,
		"Repeat":         strings.Repeat,
		"Replace":        strings.Replace,
		"Split":          strings.Split,
		"SplitAfter":     strings.SplitAfter,
		"SplitAfterN":    strings.SplitAfterN,
		"SplitN":         strings.SplitN,
		"Title":          strings.Title,
		"ToLower":        strings.ToLower,
		"ToLowerSpecial": strings.ToLowerSpecial,
		"ToTitle":        strings.ToTitle,
		"ToTitleSpecial": strings.ToTitleSpecial,
		"ToUpper":        strings.ToUpper,
		"ToUpperSpecial": strings.ToUpperSpecial,
		"Trim":           strings.Trim,
		"TrimFunc":       strings.TrimFunc,
		"TrimLeft":       strings.TrimLeft,
		"TrimLeftFunc":   strings.TrimLeftFunc,
		"TrimPrefix":     strings.TrimPrefix,
		"TrimRight":      strings.TrimRight,
		"TrimRightFunc":  strings.TrimRightFunc,
		"TrimSpace":      strings.TrimSpace,
		"TrimSuffix":     strings.TrimSuffix,
	})

	vm.Set("time", map[string]interface{}{
		"After":           time.After,
		"Sleep":           time.Sleep,
		"Tick":            time.Tick,
		"Since":           time.Since,
		"FixedZone":       time.FixedZone,
		"LoadLocation":    time.LoadLocation,
		"NewTicker":       time.NewTicker,
		"Date":            time.Date,
		"Now":             time.Now,
		"Parse":           time.Parse,
		"ParseDuration":   time.ParseDuration,
		"ParseInLocation": time.ParseInLocation,
		"Unix":            time.Unix,
		"AfterFunc":       time.AfterFunc,
		"NewTimer":        time.NewTimer,
		"SleepDuration":   func (duration string) {
			d, err := time.ParseDuration(duration)

			if err != nil {
				return
			}

			time.Sleep(d)
		},
	})

	vm.Set("converter", map[string]interface{}{
		"ByteArrayToString": func(value []byte) string {
			return string(value)
		},
	})
}
