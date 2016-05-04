// sleep function
goci.Job.SetProgress(10);
time.SleepDuration("10s");
goci.Job.UpdateDuration();

// append html/string to output
var tabName = goci.const.OG_CONSOLE;

goci.Job.SetProgress(20);
goci.Job.AppendOutputLine(tabName, "My text!")
goci.Job.AppendOutputLine(tabName, "GOCI_WORKSPACE: " + goci.const.WORKSPACE_DIR);
goci.Job.AppendOutputLine(tabName, "GOCI_RESOURCES_DIR: " + goci.const.RESOURCES_DIR);
goci.Job.AppendOutputLine(tabName, "GOCI_HOST: " + goci.const.HOST);
goci.Job.AppendOutputLine(tabName, "JOB ID: " + goci.Job.ID);
goci.Job.AppendOutputLine(tabName, "TASK ID: " + goci.Job.TaskID);
goci.Job.AppendOutputLine(tabName, "STEP DESC: " + goci.Step.Description);
goci.Job.AppendOutputLine(tabName, "STEP INDEX: " + goci.StepIndex);
goci.Job.AppendOutputLine(tabName, "OS HOME DIR: " + os.Getenv("HOME"));

// http functions - get
goci.Job.AppendOutputLine(tabName, "Getting HTTP content using GET...");
var r = net.http.Get("https://httpbin.org/ip");
var b = ioutil.ReadAll(r[0].Body);
var cBytes = b[0];
var cString = converter.ByteArrayToString(cBytes);
goci.Job.AppendOutputLine(tabName, cString);
ioutil.WriteFile("/tmp/test.txt", cBytes, 0777);

// http functions - post
//goci.Job.AppendOutputLine(tabName, "Getting HTTP content using POST...");
//console.log(http.Post("https://httpbin.org/post"));

// create a new tab with any html/text
goci.Job.SetProgress(30);
tabName = "Result";

goci.Job.AppendOutputLine(tabName, "<img src='http://placehold.it/350x150'>");
goci.Job.AppendOutputLine(tabName, "This is a new content for a new tab. You can create many tabs you want!");
goci.Job.UpdateDuration();

// execute anything command line and append results to output
goci.Job.SetProgress(70);
// cmd = exec.Command("ls", "-lah")
// o = cmd.Run()
goci.Job.UpdateDuration();

// call functions from GoCI
goci.Job.SetProgress(80);
time.SleepDuration("10s");
goci.Exec("ls", "-l");
goci.Job.UpdateDuration();

// set job progress
goci.Job.SetProgress(100);