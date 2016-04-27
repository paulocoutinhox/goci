package util

import (
	"html/template"
	"net/http"
	"log"
	"fmt"
)

func Debug(message string) {
	log.Printf("> %s\n", message)
}

func Debugf(format string, params ...interface{}) {
	log.Printf(fmt.Sprintf("> " + format + "\n", params))
}

func RenderTemplate(w http.ResponseWriter, templateName string, params map[string]string) {
	tmpl := template.Must(template.ParseFiles("resources/views/layouts/layout.html", "resources/views/" + templateName + ".html"))
	tmpl.ExecuteTemplate(w, "layout", params)
}