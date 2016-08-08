package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/prsolucoes/goci/app"
	"log"
)

type HomeController struct{}

func (This *HomeController) Register() {
	app.Server.Router.GET("/", This.HomeIndex)
	//app.Server.Router.NoRoute(This.HomeIndex)
	log.Println("HomeController register : OK")
}

func (This *HomeController) HomeIndex(c *gin.Context) {
	//util.RenderTemplate(c.Writer, "home/index", nil)
	//c.Redirect(302, "web-app")
	c.File(app.Server.ResourcesDir + "/web-app/index.html")
	//c.File(http.Dir(app.Server.ResourcesDir + "/web-app/"))
}
