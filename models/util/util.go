package util

import (
	"fmt"
	"github.com/pborman/uuid"
	"github.com/prsolucoes/goci/app"
	"html/template"
	"log"
	"net/http"
	"github.com/prsolucoes/goci/assets"
	localTemplate "github.com/prsolucoes/goci/template"
)

func Debug(message string) {
	log.Printf("> %s\n", message)
}

func Debugf(format string, params ...interface{}) {
	log.Printf(fmt.Sprintf("> " + format + "\n", params))
}

func RenderTemplate(w http.ResponseWriter, templateName string, params map[string]string) {
	if (app.Server.UseInMemoryResources) {
		tmpl, err := localTemplate.New("layout", assets.Asset).ParseFiles("resources/views/layouts/layout.html", "resources/views/" + templateName + ".html")

		if err != nil {
			Debugf("Error parsing template: %s", err)
		}

		tmpl.Execute(w, params)
	} else {
		tmpl := template.Must(template.ParseFiles(app.Server.ResourcesDir + "/views/layouts/layout.html", app.Server.ResourcesDir + "/views/" + templateName + ".html"))
		tmpl.ExecuteTemplate(w, "layout", params)
	}
}

func CreateNewJobID() string {
	return uuid.NewUUID().String()
}