package app

import (
	"flag"
	"github.com/gin-gonic/gin"
	"log"
	"github.com/go-ini/ini"
)

type WebServer struct {
	Router *gin.Engine
	Config *ini.File
	Host   string
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
		}

		host := serverSection.Key("host").Value()

		if host == "" {
			host = ":8080"
		}

		This.Host = host

		log.Println("Configuration file load : OK")
	} else {
		log.Fatalf("Configuration file load error : %s", err.Error())
	}
}

func (This *WebServer) Start() {
	log.Printf("Server started on %v : OK", This.Host)
	This.Router.Run(This.Host)
}