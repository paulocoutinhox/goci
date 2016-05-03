package util

import (
	"fmt"
	"github.com/pborman/uuid"
	"github.com/prsolucoes/goci/app"
	"html/template"
	"log"
	"net/http"
)

func Debug(message string) {
	log.Printf("> %s\n", message)
}

func Debugf(format string, params ...interface{}) {
	log.Printf(fmt.Sprintf("> "+format+"\n", params))
}

func RenderTemplate(w http.ResponseWriter, templateName string, params map[string]string) {
	tmpl := template.Must(template.ParseFiles(app.Server.ResourcesDir+"/views/layouts/layout.html", app.Server.ResourcesDir+"/views/"+templateName+".html"))
	tmpl.ExecuteTemplate(w, "layout", params)
}

func CreateNewJobID() string {
	return uuid.NewUUID().String()
}
