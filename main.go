package main

import (
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/controllers"
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
		controller := controllers.APIController{}
		controller.Register()
	}

	app.Server.Start()
}
