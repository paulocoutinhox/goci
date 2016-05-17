package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/prsolucoes/goci/app"
	"github.com/prsolucoes/goci/jobs"
	"github.com/prsolucoes/goci/models/domain"
	"github.com/prsolucoes/gowebresponse"
	"log"
	"strings"
)

type APIController struct{}

func (This *APIController) Register() {
	app.Server.Router.GET("/api/project/list", This.APIProjectList)
	app.Server.Router.GET("/api/project/view", This.APIProjectView)
	app.Server.Router.GET("/api/task/view", This.APITaskView)
	app.Server.Router.GET("/api/task/run", This.APITaskRun)
	app.Server.Router.GET("/api/job/last", This.APIJobLast)
	app.Server.Router.GET("/api/job/runningList", This.APIJobRunningList)
	app.Server.Router.GET("/api/job/runningView", This.APIJobRunningView)
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

func (This *APIController) APITaskView(c *gin.Context) {
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

func (This *APIController) APITaskRun(c *gin.Context) {
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

func (This *APIController) APIJobLast(c *gin.Context) {
	projectId := c.Request.URL.Query().Get("project")
	project, err := domain.ProjectGetById(projectId)

	response := new(gowebresponse.WebResponse)

	if err == nil {
		taskId := c.Request.URL.Query().Get("task")
		_, err := domain.TaskGetById(project, taskId)

		if err == nil {
			// try get the first job on memory
			job, err := jobs.JobGetFirstByProjectIdAndTaskId(projectId, taskId)

			// try get the result from disk
			if job == nil {
				job, err = domain.JobFilesGetLastByProjectIdAndTaskId(projectId, taskId)
			}

			// send response
			if err == nil {
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
	} else {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
	}

	c.JSON(200, response)
}

func (This *APIController) APIJobRunningList(c *gin.Context) {
	projectId := strings.Trim(c.Request.URL.Query().Get("project"), " ")
	taskId := strings.Trim(c.Request.URL.Query().Get("task"), " ")

	response := new(gowebresponse.WebResponse)

	if projectId != "" {
		project, err := domain.ProjectGetById(projectId)

		if err != nil {
			response.Success = false
			response.Message = "error"
			response.AddDataError("error", err.Error())
			c.JSON(200, response)
			return
		}

		if taskId != "" {
			_, err := domain.TaskGetById(project, taskId)

			if err != nil {
				response.Success = false
				response.Message = "error"
				response.AddDataError("error", err.Error())
				c.JSON(200, response)
				return
			}
		}
	}

	jobs, err := jobs.JobGetAllByProjectIdAndTaskId(projectId, taskId)

	if err != nil {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
		c.JSON(200, response)
		return
	}

	response.Success = true
	response.Message = ""
	response.AddData("jobs", jobs)
	response.AddData("count", len(jobs))

	c.JSON(200, response)
}

func (This *APIController) APIJobRunningView(c *gin.Context) {
	jobId := strings.Trim(c.Request.URL.Query().Get("job"), " ")
	response := new(gowebresponse.WebResponse)

	job, err := jobs.JobGetByJobId(jobId)

	if err != nil {
		response.Success = false
		response.Message = "error"
		response.AddDataError("error", err.Error())
		c.JSON(200, response)
		return
	}

	response.Success = true
	response.Message = ""
	response.AddData("job", job)

	c.JSON(200, response)
}
