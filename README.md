# Support with donation
[![Support with donation](http://donation.pcoutinho.com/images/donate-button.png)](http://donation.pcoutinho.com/)

# GoCI

GoCI was made to be a simple continuous integration system made with Go (Golang).

It use a simple plugin mechanism that let you use some different plugins to execute tasks. Today we have two main plugins:  
- CLI = Execute anything from command line  
- JS = Execute a javascript file
  
Some project advantages:
- With javascript you can create scripts that have own logic inside and use bultin function like: http request, regexp, command line execution, json parser and more - dont need use bash script for it
- Everything is a simples JSON file - yes, you dont need a database!
- From project to result log - you can versioning everything if you want
- You dont need reload the server for nothing - unless a crash or bug :)
- GoCI use a workspace directory, so you can have a lot of workspaces or one for all projects
- The web interface if nice - made with bootstrap - all results need send HTML
- Each job execution has progress, html ouput compatible with bootstrap, status, etc
- Everything work with API and you can consume using external tools
- You can define task options to be selected in a modal dialog when you RUN (see the screenshot or sample JS task to see it in action)
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

# Sample files

I have created a sample project file, a sample config file and a sample javascript file. Check it on **extras/sample** directory.

# Starting

1. Execute: go get -u github.com/prsolucoes/goci  
2. Execute: cd $GOPATH/src/github.com/prsolucoes/goci  
3. Execute: make deps  
4. Execute: make install  
5. Create config file (config.ini) based on some above example  
6. Execute: goci -f=config.ini
7. Open in your browser: http://localhost:8080  

** dont use character / on any configuration path **

# API

**Check file: controllers/api.go**  
Today we dont have a API doc - but is simple looking code [TODO]  

# Command line interface

You can use some make commands to control GoCI service, like start, stop and update from git repository.

1. make stop   = it will kill current GoCI process
2. make update = it will update code from git and install on $GOPATH/bin directory
3. make deps   = download all dependencies
4. make format = format all files (use it before make a pull-request)

So if you want start your server for example, you only need call "make start".

# Alternative method to Build and Start project

1. go build
2. ./goci -f=config.ini

# Task options

Today we support this types of task option to be selected when RUN it:  
  
1. text 
2. checkbox
3. textarea
4. password
5. hidden
6. select

# Sugestion

Today, only some functions are implemented. If you need one, you can make a pull-request or send a message in Github Issue.

# Supported By Jetbrains IntelliJ IDEA

![alt text](https://github.com/prsolucoes/goci/raw/master/extras/jetbrains/logo.png "Supported By Jetbrains IntelliJ IDEA")

# Author WebSite

> http://www.pcoutinho.com

# License

MIT

# Screenshots

**# HOME**

![SS1](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot1.png "Screenshot 1")

**# PROJECT LIST**

![SS2](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot2.png "Screenshot 2")

**# TASK LIST OF SELECTED PROJECT**

![SS3](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot3.png "Screenshot 3")

**# TASK RESULTS VIEW**

![SS4](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot4.png "Screenshot 4")

**# RUNNING AND LAST JOBS**

![SS5](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot5.png "Screenshot 5")

**# TASK PARAMS WHEN RUN **

![SS5](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot6.png "Screenshot 6")
