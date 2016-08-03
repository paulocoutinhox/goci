// throw error if you need
//throw "My error!";
require(goci.const.WORKSPACE_DIR + "/scripts/functions.js");

// sleep function
goci.Job.SetProgress(10);
time.Sleep("2s");
goci.Job.UpdateDuration();

// append html/string to output
var tab = goci.const.OG_CONSOLE;

// call a function inside functions.js
testFunction("Paulo Coutinho");

goci.Job.SetProgress(20);
goci.Job.Log(tab, "My text!");
goci.Job.Log(tab, "GOCI_WORKSPACE: " + goci.const.WORKSPACE_DIR);
goci.Job.Log(tab, "GOCI_RESOURCES_DIR: " + goci.const.RESOURCES_DIR);
goci.Job.Log(tab, "GOCI_HOST: " + goci.const.HOST);
goci.Job.Log(tab, "JOB ID: " + goci.Job.ID);
goci.Job.Log(tab, "TASK ID: " + goci.Job.TaskID);
goci.Job.Log(tab, "STEP DESC: " + goci.Step.Description);
goci.Job.Log(tab, "STEP INDEX: " + goci.StepIndex);
goci.Job.Log(tab, "OS HOME DIR: " + os.Getenv("HOME"));

goci.Job.LogError(tab, "Sample error message");
goci.Job.LogWarning(tab, "Sample warning message");
goci.Job.LogInfo(tab, "Sample info message");
goci.Job.LogSuccess(tab, "Sample success message");

// http functions - get
goci.Job.Log(tab, "Getting HTTP content using GET...");
var content = net.http.Get("https://httpbin.org/ip");
goci.Job.Log(tab, content);
ioutil.WriteFile("/tmp/test.txt", content, 0777);

// create a new tab with any html/text
goci.Job.SetProgress(30);
tab = "Result";

goci.Job.Log(tab, "<img src='http://placehold.it/350x150'>");
goci.Job.Log(tab, "This is a new content for a new tab. You can create many tabs you want!");
goci.Job.UpdateDuration();

// execute anything command line and append results to output
goci.Job.SetProgress(60);
os.Exec({"addToLog": true, "logTabName": "MyTab"}, "date");
goci.Job.UpdateDuration();

// call functions from GoCI
goci.Job.SetProgress(70);
time.Sleep("2s");
os.Exec({"addToLog": false}, "ls", "-l", "-a", "-h");
goci.Job.UpdateDuration();

// show all options sent
goci.Job.SetProgress(80);
tab = "Options";
goci.Job.Log(tab, "Total of options sent: " + goci.Job.Options.length);

for (var x = 0; x < goci.Job.Options.length; x++)
{
	goci.Job.Log(tab, "Option: <strong>" + goci.Job.Options[x].ID + "</strong> | Values: " + goci.Job.Options[x].Values);
}

goci.Job.UpdateDuration();

// call functions from GoCI to simulate an error
goci.Job.SetProgress(90);
os.Exec({"addToLog": true, "logErrorTabName": "MyTabWithError"}, goci.const.WORKSPACE_DIR + "/bash/simulate-error.sh");
goci.Job.UpdateDuration();

// set job progress
goci.Job.SetProgress(100);