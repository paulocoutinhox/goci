# Support with donation
[![Support with donation](http://donation.pcoutinho.com/images/donate-button.png)](http://donation.pcoutinho.com/)

# GoCI

GoCI was made to be a simple and generic continuous integration system made with Go (Golang).

GoCI uses a simple plugin system that let you use some different ways to execute tasks. Today we have two plugins:  
- CLI = Execute anything from command line interface (CLI).
- JS = Execute a javascript file that can have any logic, CLI execution, etc.
  
# Project Architecture
  
![Architecture](https://github.com/prsolucoes/goci/raw/master/extras/images/architecture.png?rnd=20160905 "Architecture")
  
# Why GoCI? Why a new tool?
- Small memory usage, only 10MB
- You can call your existing CLI script (bash file, sh file, BAT file) using CLI plugin
- You can call a javascript file with your own logic, calling external programs and updating web interface in real time
- The GoCI project is a simple JSON file - you dont need a database and you can put on Git
- All execution log are a json file too, you can put all in Git or ignore it
- You dont need reload the server to create new projects or tasks, when change the project file, click on Refresh button from GoCI web interface
- The web interface is clean, perfect and mobile ready, you can use desktop, smartphone or tablet to use GoCI
- All tasks uses HTML to show the results on web interface (GoCI uses bootstrap)
- GoCI expose all in API model, so you can consume using your own external tools if need
- Your tasks can have options to be typed/selected in a modal dialog when you run it
- Built-in native integrations to be called from your javascript file (SendGrid, Slack, PushBullet and more), check sample task file "task-integration-test.js"
- It is open-source, so you can collaborate too
- You can DONATE!

# Get started

Before start:
  
- Workspace in GoCI is any directory and is inside workspace directory that your projects and logs will be store. When start GoCI it will create inside our workspace some other folders automatically.  

Start now:

1 - Create a configuration file (config.ini):

```
[server]
host = localhost:8080
workspaceDir = YOUR-GOPATH-DIRECTORY/src/github.com/prsolucoes/goci/extras/sample
```

3 - Execute from terminal: goci -f config.ini  
4 - Open in your browser: http://localhost:8080  

# More samples

GoCI come with all functions, project options, integrations and capabilities inside "**extras/samples**" directory. Check it for more information and javscript task.

# Downloading and installing

If you dont want install Go (golang), you can get GoCI compiled directory from this repository inside folder "build".  

If you have Go (golang) installed, follow this steps:  

1. Execute: go get -u github.com/prsolucoes/goci  
2. Execute: cd $GOPATH/src/github.com/prsolucoes/goci  
3. Execute: make deps  
4. Execute: make install  

** Dont use the character **/** on end of any configuration path **

# API

**Check file: controllers/api.go**  
Today we dont have a API doc - but is simple looking code [TODO]  

# Command line interface

You can use some make commands to control GoCI service, like start, stop and update from git repository.

1. make stop   = it will kill current GoCI process
2. make update = it will update code from git and install on $GOPATH/bin directory
3. make deps   = download all dependencies
4. make format = format all files (use it before make a pull-request)
5. make generate-assets = generate all assets from resources folder to load in-memory resources assets (js, css, images, ...)

# Alternative method to Build and Start project

1. go build
2. ./goci -f extras/sample/config.ini

or

1. go run -f extras/sample/config.ini

# Task options for web interface

Today we support this types of fields for task option:  
  
1. text 
2. checkbox
3. textarea
4. password
5. hidden
6. select

# Integrations

Today we support this integrations:  
  
1. SendGrid (send emails)
2. PushBullet (send push message)
3. HttpGet (call any URL using GET method)
4. SlackWebHook (send message using web hook to Slack)

# Sugestions

Today, only some functions are implemented in javascript integration. If you need one, you can make a pull-request or send a message in Github Issue.

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

**# TASK PARAMS WHEN RUN**

![SS5](https://github.com/prsolucoes/goci/raw/master/extras/screenshots/screenshot6.png "Screenshot 6")
