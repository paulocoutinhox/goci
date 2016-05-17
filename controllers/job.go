package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/models/util"
	"log"
)

type JobController struct{}

func (This *JobController) Register() {
	app.Server.Router.GET("/job/list", This.JobList)
	log.Println("JobController register : OK")
}

func (This *JobController) JobList(c *gin.Context) {
	util.RenderTemplate(c.Writer, "job/list", nil)
}
