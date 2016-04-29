package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/prsolucoes/gowebresponse"
	"github.com/prsolucoes/goci/app"
	"log"
	"github.com/prsolucoes/goci/models/domain"
)

type APIController struct{}

func (This *APIController) Register() {
	app.Server.Router.GET("/api/project/list", This.APIProjectList)
	app.Server.Router.GET("/api/project/view", This.APIProjectView)
	app.Server.Router.GET("/api/task/view", This.APIProjectTaskView)
	log.Println("APIController register : OK")
}

func (This *APIController) APIProjectList(c *gin.Context) {
	list, err := domain.ProjectGetAll()

	response := new(gowebresponse.WebResponse)

	if err == nil {
		response.Success = true
		response.Message = ""
		response.AddData("list", list)
	} else {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
	}

	c.JSON(200, response)
}

func (This *APIController) APIProjectView(c *gin.Context) {
	projectId := c.Request.URL.Query().Get("project")
	project, err := domain.ProjectGetById(projectId)

	response := new(gowebresponse.WebResponse)

	if err == nil {
		response.Success = true
		response.Message = ""
		response.AddData("project", project)
	} else {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
	}

	c.JSON(200, response)
}

func (This *APIController) APIProjectTaskView(c *gin.Context) {
	projectId := c.Request.URL.Query().Get("project")
	project, err := domain.ProjectGetById(projectId)

	response := new(gowebresponse.WebResponse)

	if err == nil {
		taskId := c.Request.URL.Query().Get("task")
		task, err := domain.TaskGetById(project, taskId)

		if err == nil {
			response.Success = true
			response.Message = ""
			response.AddData("task", task)
		} else {
			response.Success = false
			response.Message = "error"
			response.AddDataError("error", err.Error())
		}
	} else {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
	}

	c.JSON(200, response)
}