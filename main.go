package main

import (
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/controllers"
)

func main() {
	app.Server = app.NewWebServer()
	app.Server.LoadConfiguration()
	app.Server.CreateBasicRoutes()

	{
		controller := controllers.HomeController{}
		controller.Register()
	}

	app.Server.Start()
}
