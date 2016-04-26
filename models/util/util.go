package util

import (
	"html/template"
	"net/http"
)

func RenderTemplate(w http.ResponseWriter, templateName string, params map[string]string) {
	tmpl := template.Must(template.ParseFiles("resources/views/layouts/layout.html", "resources/views/" + templateName + ".html"))
	tmpl.ExecuteTemplate(w, "layout", params)
}