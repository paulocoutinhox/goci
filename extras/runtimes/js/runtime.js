/**
 * main namespace
 */
var goci = {};

/**
 * project task step option
 */
var ProjectTaskStepOption = {};
ProjectTaskStepOption.ID = "";
ProjectTaskStepOption.Type = "";
ProjectTaskStepOption.Description = "";
ProjectTaskStepOption.Value = "";

/**
 * job output data
 */
var JobOutputData = {};
JobOutputData.Name = "";
JobOutputData.Data = "";
JobOutputData.UpdatedAt = 0;

/**
 * project task step
 */
var ProjectTaskStep = {};
ProjectTaskStep.Description = "";
ProjectTaskStep.Plugin = "";
ProjectTaskStep.Options = [ProjectTaskStepOption];

/**
 * project task option values item
 */
var ProjectTaskOptionValuesItem = {};
ProjectTaskOptionValuesItem.Value = "";
ProjectTaskOptionValuesItem.Text = "";

/**
 * project task option
 */
var ProjectTaskOption = {};
ProjectTaskOption.ID = "";
ProjectTaskOption.Type = "";
ProjectTaskOption.Description = "";
ProjectTaskOption.Value = "";
ProjectTaskOption.Values = [ProjectTaskOptionValuesItem];

/**
 * response
 */
var Response = {};
Response.Success = false;
Response.Message = "";
Response.Data = {};
Response.AddData = function(key, value) {};
Response.ClearData = function() {};
Response.ClearDataErrors = function() {};
Response.AddDataError = function(key, message) {};
Response.GetFirstDataError = function() {};
Response.GetDataError = function(index) {};
Response.ToString = function() {};

/**
 * project task
 */
var ProjectTask = {};
ProjectTask.ID = "";
ProjectTask.Name = "";
ProjectTask.Description = "";
ProjectTask.Steps = [ProjectTaskStep];
ProjectTask.Options = [ProjectTaskOption];

/**
 * job option item
 */
var JobOptionItem = {};
JobOptionItem.ID = "";
JobOptionItem.Values = [String];
JobOptionItem.GetFirstValue = function() {}

/**
 * job
 */
goci.Job = {};
goci.Job.JobFilesGetAllByProjectIdAndTaskId = function (projectId, taskId) {};
goci.Job.JobFilesGetLastByProjectIdAndTaskId = function (projectId, taskId) {};
goci.Job.Run = function () {};
goci.Job.Save = function () {};
goci.Job.SetProgress = function (progress) {};
goci.Job.CreateOutputGroup = function (name) {};
goci.Job.AppendOutputContent = function (name, content) {};
goci.Job.Log = function (name, contentLine) {};
goci.Job.LogInfo = function (name, contentLine) {};
goci.Job.LogWarning = function (name, contentLine) {};
goci.Job.LogError = function (name, contentLine) {};
goci.Job.LogSuccess = function (name, contentLine) {};
goci.Job.LogML = function (name, content) {};
goci.Job.LogInfoML = function (name, content) {};
goci.Job.LogWarningML = function (name, content) {};
goci.Job.LogErrorML = function (name, content) {};
goci.Job.LogSuccessML = function (name, content) {};
goci.Job.UpdateDuration = function () {};
goci.Job.UpdateTemporaryDuration = function () {};
goci.Job.SetStatusError = function () {};
goci.Job.SetStatusSuccess = function () {};
goci.Job.StatusIsFinalState = function () {};
goci.Job.Stop = function () {};
goci.Job.GetOptionById = function (id) {};
goci.Job.GetOptionFirstValue = function (id) {};
goci.Job.GetOptionValues = function (id) {};

goci.Job.ID = "";
goci.Job.TaskID = "";
goci.Job.ProjectID = "";
goci.Job.ProjectName = "";
goci.Job.OutputGroup = [JobOutputData];
goci.Job.Duration = 0;
goci.Job.Progress = 0;
goci.Job.Status = "";
goci.Job.CreatedAt = 0;
goci.Job.StartedAt = 0;
goci.Job.FinishedAt = 0;
goci.Job.Task = ProjectTask;
goci.Job.Options = [JobOptionItem];

/**
 * project task step
 */
goci.Step = {};
goci.Step.Description = "";
goci.Step.Plugin = "";
goci.Step.Options = [ProjectTaskStepOption];
goci.StepIndex = 0;

/**
 * const
 */
goci.const = {};
goci.const.OG_CONSOLE = "Console";
goci.const.WORKSPACE_DIR = "";
goci.const.CONFIG = "";
goci.const.HOST = "";
goci.const.JOB_STATUS_ON_QUEUE = "onqueue";
goci.const.JOB_STATUS_RUNNING = "running";
goci.const.JOB_STATUS_SUCCESS = "success";
goci.const.JOB_STATUS_ERROR = "error";

/**
 * integration manager
 */
goci.IntegrationManager = {};
goci.IntegrationManager.Has = function(name) {};
goci.IntegrationManager.Count = function() {};
goci.IntegrationManager.Call = function(name, options) {};

/**
 * ioutil
 */
var ioutil = {};

ioutil.ReadFile = function(filename) {};
ioutil.WriteFile = function(filename, data, perms) {};

/**
 * net.http
 */
var net = {};
net.http = {};

net.http.Get = function(url) {};

/**
 * os
 */
var os = {};

os.Getenv = function(key) {};
os.Setenv = function(key, value) {};
os.Remove = function(name) {};
os.RemoveAll = function(path) {};
os.Mkdir = function(path, perm) {};
os.MkdirAll = function(path, perm) {};
os.Exec = function(options, command, params) {};

/**
 * time
 */
var time = {};

time.Sleep = function(duration) {};

/**
 * require
 */
var require = function(file) {};