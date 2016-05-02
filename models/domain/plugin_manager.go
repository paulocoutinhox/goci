package domain

import (
	"errors"
	"log"
	"reflect"
)

var (
	pluginRegistry = make(map[string]reflect.Type)
)

func PluginManagerLoadPlugins() {
	PluginManagerAddPlugin(PLUGIN_CLI_NAME, reflect.TypeOf(PluginCLI{}))
	PluginManagerAddPlugin(PLUGIN_ANKO_NAME, reflect.TypeOf(PluginAnko{}))
	log.Println("Plugins loaded : OK")
}

func PluginManagerAddPlugin(name string, plugin reflect.Type) {
	pluginRegistry[name] = plugin
}

func PluginManagerProcess(job *Job, step *ProjectTaskStep, stepIndex int) error {
	if job == nil {
		return errors.New("Job is invalid")
	}

	if step == nil {
		return errors.New("Step is invalid")
	}

	for pluginName, pluginType := range pluginRegistry {
		if pluginName == step.Plugin {
			plugin := reflect.New(pluginType).Interface().(IPlugin)
			plugin.Init(job, step, stepIndex)
			return plugin.Process()
		}
	}

	return errors.New("Plugin not found")
}
