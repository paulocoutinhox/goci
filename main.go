package main

import (
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/controllers"
	"github.com/prsolucoes/goci/jobs"
)

func main() {
	app.Server = app.NewWebServer()
	app.Server.LoadConfiguration()
	app.Server.CreateStructure()
	app.Server.CreateBasicRoutes()

	{
		controller := controllers.HomeController{}
		controller.Register()
	}

	{
		controller := controllers.ProjectController{}
		controller.Register()
	}

	{
		controller := controllers.TaskController{}
		controller.Register()
	}

	{
		controller := controllers.APIController{}
		controller.Register()
	}

	jobs.CanRunJobs = true
	jobs.StartJobProcessor()

	app.Server.Start()
}
