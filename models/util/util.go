package util

import (
	"fmt"
	"github.com/pborman/uuid"
	"log"
)

func Debug(message string) {
	log.Printf("> %s\n", message)
}

func Debugf(format string, params ...interface{}) {
	log.Printf(fmt.Sprintf("> "+format+"\n", params))
}

func CreateNewJobID() string {
	return uuid.NewUUID().String()
}
