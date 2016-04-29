package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"log"
)

type TaskController struct{}

func (This *TaskController) Register() {
	app.Server.Router.GET("/task/view", This.TaskView)
	log.Println("TaskController register : OK")
}

func (This *TaskController) TaskView(c *gin.Context) {
	util.RenderTemplate(c.Writer, "task/view", nil)
}
