EXECUTABLE=goci
LOG_FILE=/var/log/${EXECUTABLE}.log
GOFMT=gofmt -w
GODEPS=go get

GOFILES=\
	main.go\

build:
	go build -o ${EXECUTABLE}

install:
	go install

format:
	${GOFMT} main.go
	${GOFMT} app/server.go
	${GOFMT} controllers/home.go
	${GOFMT} models/util/util.go

test:

deps:
	${GODEPS} github.com/prsolucoes/gowebresponse
	${GODEPS} github.com/gin-gonic/gin
	${GODEPS} github.com/go-ini/ini

stop:
	pkill -f ${EXECUTABLE}

start:
	-make stop
	cd ${GOPATH}/src/github.com/prsolucoes/${EXECUTABLE}
	nohup ${EXECUTABLE} >> ${LOG_FILE} 2>&1 </dev/null &

update:
	git pull origin master
	make install