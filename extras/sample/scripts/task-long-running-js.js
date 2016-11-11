for (var x = 0; x < 20; x++) {
	goci.Job.SetProgress(x+1);
	time.Sleep("1s");
	goci.Job.UpdateDuration();
}

goci.Job.UpdateDuration();
goci.Job.SetProgress(100);