package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/jobs"
	"github.com/prsolucoes/goci/models/domain"
	"github.com/prsolucoes/gowebresponse"
	"log"
)

type APIController struct{}

func (This *APIController) Register() {
	app.Server.Router.GET("/api/project/list", This.APIProjectList)
	app.Server.Router.GET("/api/project/view", This.APIProjectView)
	app.Server.Router.GET("/api/task/view", This.APIProjectTaskView)
	app.Server.Router.GET("/api/task/run", This.APIProjectTaskRun)
	app.Server.Router.GET("/api/job/lastResult", This.APIProjectTaskJobGetLastResult)
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

func (This *APIController) APIProjectTaskRun(c *gin.Context) {
	projectId := c.Request.URL.Query().Get("project")
	project, err := domain.ProjectGetById(projectId)

	response := new(gowebresponse.WebResponse)

	if err == nil {
		taskId := c.Request.URL.Query().Get("task")
		task, err := domain.TaskGetById(project, taskId)

		if err == nil {
			job := domain.NewJob()
			job.Task = task
			job.TaskID = task.ID
			job.ProjectID = projectId
			jobs.JobList = append(jobs.JobList, job)

			response.Success = true
			response.Message = ""
			response.AddData("job", job)
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

func (This *APIController) APIProjectTaskJobGetLastResult(c *gin.Context) {
	projectId := c.Request.URL.Query().Get("project")
	project, err := domain.ProjectGetById(projectId)

	response := new(gowebresponse.WebResponse)

	if err == nil {
		taskId := c.Request.URL.Query().Get("task")
		_, err := domain.TaskGetById(project, taskId)

		if err == nil {
			// try get the first job on memory
			var result *domain.JobResult

			job, err := jobs.JobGetFirstByProjectIdAndTaskId(projectId, taskId)

			if err == nil {
				result, err = domain.JobResultCreateFromJob(job)
			}

			// try get the result from disk
			if result == nil {
				result, err = domain.JobResultGetLastByProjectIdAndTaskId(projectId, taskId)
			}

			// send response
			if err == nil {
				response.Success = true
				response.Message = ""
				response.AddData("result", result)
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
	} else {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
	}

	c.JSON(200, response)
}
