# Support with donation
[![Support with donation](http://donation.pcoutinho.com/images/donate-button.png)](http://donation.pcoutinho.com/)

# GoCI

GoCI is a simple continuous integration system made with Go (Golang).

It use a simple plugin mechanism that let you use some different plugins to execute tasks. Today we have two main plugins:
CLI = Execute anything from command line
Anko = Execute anko scripts (like go - but in external script file - https://github.com/mattn/anko)

Some project advantages:
- With anko script you can create scripts that have logic, http request, regexp, command line execution, json parser and more - dont need use bash script
- Everything is a simples JSON file - yes, you dont need one database!
- From project to results - you can versioning everything if you want
- You dont need reload the server for nothing - unless a crash or bug :)
- It use a workspace directory, so you can have a lot of workspaces or one for all projects
- The web interface if nice - made with bootstrap - all results need send HTML
- Each job execution has progress, html ouput compatible with bootstrap, status, etc
- Everything work with API and you can consume using external tools
- It is open-source - you can collaborate
- You can DONATE!

# Configuration

GoCI configuration is a simple INI file called "config.ini".

Example of:

```
[server]
host = :8080
workspaceDir = YOUR-WORKSPACE-DIRECTORY
resourcesDir = YOUR-GOPATH-DIRECTORY + /src/github.com/prsolucoes/goci
```

# Starting

1. Execute: go get -u github.com/prsolucoes/goci  
2. Execute: cd $GOPATH/src/github.com/prsolucoes/goci  
3. Execute: make deps  
4. Execute: make install  
5. Create config file (config.ini) based on some above example  
6. Execute: goci -f=config.ini
7. Open in your browser: http://localhost:8080  

# API

**Check file: controllers/api.go**  
[TODO]  

# Command line interface

You can use some make commands to control GoCI service, like start, stop and update from git repository.

1. make stop   = it will kill current GoCI process
2. make update = it will update code from git and install on $GOPATH/bin directory

So if you want start your server for example, you only need call "make start".

# Alternative method to Build and Start project

1. go build
2. ./goci -f=config.ini

# Author WebSite

> http://www.pcoutinho.com

# License

MIT
