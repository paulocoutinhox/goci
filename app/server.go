package app

import (
	"flag"
	"github.com/gin-gonic/gin"
	"github.com/go-ini/ini"
	"log"
	"os"
)

type WebServer struct {
	Router    *gin.Engine
	Config    *ini.File
	Host      string
	Workspace string
}

var (
	Server *WebServer
)

func NewWebServer() *WebServer {
	server := new(WebServer)

	gin.SetMode(gin.ReleaseMode)
	server.Router = gin.New()
	server.Router.Use(gin.Recovery())

	return server
}

func (This *WebServer) CreateBasicRoutes() {
	This.Router.Static("/static", "resources/static")
	log.Println("Router creation : OK")
}

func (This *WebServer) LoadConfiguration() {
	var configFileName = ""
	flag.StringVar(&configFileName, "f", "config.ini", "set config.ini location")
	flag.Parse()

	config, err := ini.Load([]byte(""), configFileName)

	if err == nil {
		This.Config = config

		serverSection, err := config.GetSection("server")

		if err != nil {
			This.Host = ":8080"
			This.Workspace = "./"
		} else {
			{
				// host
				host := serverSection.Key("host").Value()

				if host == "" {
					host = ":8080"
				}

				This.Host = host
			}

			{
				// workspace
				workspace := serverSection.Key("workspace").Value()

				if workspace == "" {
					workspace = "./"
				}

				This.Workspace = workspace
			}
		}

		log.Println("Configuration file load : OK")
	} else {
		log.Fatalf("Configuration file load error : %s", err.Error())
	}
}

func (This *WebServer) CreateStructure() {
	{
		dir := This.Workspace + "/projects"
		err := os.MkdirAll(dir, 0777)

		if err != nil {
			log.Fatalf("Failed to create directory: %v", err)
		}
	}

	{
		dir := This.Workspace + "/logs"
		err := os.MkdirAll(dir, 0777)

		if err != nil {
			log.Fatalf("Failed to create directory: %v", err)
		}
	}

	log.Printf("Structure created on %v : OK", This.Workspace)
}

func (This *WebServer) Start() {
	log.Printf("Server started on %v : OK", This.Host)
	This.Router.Run(This.Host)
}
