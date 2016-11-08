package app

import (
	"flag"
	"log"
	"os"

	"github.com/gin-gonic/contrib/gzip"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/go-ini/ini"
	"github.com/prsolucoes/goci/assets"
	"github.com/prsolucoes/goci/models/integration"
)

type WebServer struct {
	Router             *gin.Engine
	Config             *ini.File
	Host               string
	WorkspaceDir       string
	IntegrationManager *integration.IntegrationManager
}

var (
	Server *WebServer
)

func NewWebServer() *WebServer {
	server := new(WebServer)

	gin.SetMode(gin.ReleaseMode)
	server.Router = gin.New()
	server.Router.Use(gin.Recovery())
	server.Router.Use(gzip.Gzip(gzip.DefaultCompression))

	server.IntegrationManager = &integration.IntegrationManager{}

	return server
}

func (This *WebServer) CreateBasicRoutes() {
	This.Router.NoRoute(This.RouteGeneral)
	This.Router.Use(static.Serve("/web-app", BinaryFileSystem("web-app")))
	log.Println("Router creation : OK")
}

func (This *WebServer) RouteGeneral(c *gin.Context) {
	data, err := assets.Asset("web-app/index.html")

	if err != nil {
		// asset was not found.
	}

	c.Data(200, "text/html", data)
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
			This.WorkspaceDir = "./"
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
				workspaceDir := serverSection.Key("workspaceDir").Value()
				This.WorkspaceDir = workspaceDir
			}
		}

		log.Println("Configuration file load : OK")
	} else {
		log.Fatalf("Configuration file load error : %s", err.Error())
	}
}

func (This *WebServer) LoadIntegrations() {
	This.IntegrationManager.Add(&integration.IntegrationHttpGet{})
	This.IntegrationManager.Add(&integration.IntegrationPushBullet{})
	This.IntegrationManager.Add(&integration.IntegrationSendGrid{})
	This.IntegrationManager.Add(&integration.IntegrationSlackWebHook{})
	log.Println("Integrations : OK")
}

func (This *WebServer) CreateStructure() {
	{
		dir := This.WorkspaceDir + "/projects"
		err := os.MkdirAll(dir, 0777)

		if err != nil {
			log.Fatalf("Failed to create directory: %v", err)
		}
	}

	{
		dir := This.WorkspaceDir + "/logs"
		err := os.MkdirAll(dir, 0777)

		if err != nil {
			log.Fatalf("Failed to create directory: %v", err)
		}
	}

	log.Printf("Structure created on %v : OK", This.WorkspaceDir)
}

func (This *WebServer) Start() {
	log.Printf("Open GoCI on your browser: %v", This.Host)
	err := This.Router.Run(This.Host)

	if err != nil {
		log.Fatalf("Server not started: %v", err)
	}
}
