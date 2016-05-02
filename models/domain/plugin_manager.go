package domain

import (
	"errors"
	"log"
)

var (
	plugins []IPlugin
)

func PluginManagerLoadPlugins() {
	PluginManagerAddPlugin(&PluginCLI{})
	log.Println("Plugins loaded : OK")
}

func PluginManagerAddPlugin(plugin IPlugin) {
	plugins = append(plugins, plugin)
}

func PluginManagerProcess(job *Job, step *ProjectTaskStep, stepIndex int) error {
	if job == nil {
		return errors.New("Job is invalid")
	}

	if step == nil {
		return errors.New("Step is invalid")
	}

	for _, plugin := range plugins {
		if plugin.GetName() == step.Plugin {
			return plugin.Process(job, step, stepIndex)
		}
	}

	return errors.New("Plugin not found")
}
