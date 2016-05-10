package time

import (
	"time"
)

func Lib_Time_Sleep(s string) bool {
	d, err := time.ParseDuration(s)

	if err != nil {
		return false
	}

	time.Sleep(d)
	return true
}
