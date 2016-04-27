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
	log.Println("APIController register : OK")
}

func (This *APIController) APIProjectList(c *gin.Context) {
	project := domain.Project{}
	list, err := project.GetAll()

	response := new(gowebresponse.WebResponse)

	if err == nil {
		response.Success = true
		response.Message = ""
		response.AddData("list", list)
	} else {
		response.Success = false
		response.Message = "error"
		response.AddDataError("list", err.Error())
	}

	c.JSON(200, response)
}