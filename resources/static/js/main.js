var jobList = [];

function loadJobRunningList() {
    Job.runningList(function () {
        // ?
    }, function (response) {
        if (response.success) {
            var count = response.data.count;

            $(".ph-job-running-list-count").html(count);

            if (count == 1) {
                $(".ph-job-running-list-text").html("job");
            } else {
                $(".ph-job-running-list-text").html("jobsCount");
            }
        } else {
            $(".ph-job-running-list-count").html('0');
            $(".ph-job-running-list-text").html("jobsCount");
        }

        autoLoadJobRunningList();
    }, function (error) {
        $(".ph-job-running-list-count").html('0');
        $(".ph-job-running-list-text").html("jobsCount");
        autoLoadJobRunningList();
    });
}

function autoLoadJobRunningList() {
    setTimeout(function () {
        loadJobRunningList();
    }, 2000);
}

$(document).ready(function () {
    loadJobRunningList();
});