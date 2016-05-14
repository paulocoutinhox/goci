var Job = new function()
{

    this.JOB_STATUS_ON_QUEUE = "onqueue";
    this.JOB_STATUS_RUNNING  = "running";
    this.JOB_STATUS_SUCCESS  = "success";
    this.JOB_STATUS_ERROR    = "error";

    this.lastResult = function(projectId, taskId, preProcess, success, error)
    {
        if (!Util.isNullOrUndefined(preProcess))
        {
            preProcess();
        }

        $.ajax({
            url: '/api/job/lastResult',
            type: 'GET',
            data: { project: projectId, task: taskId },
            dataType: 'json',
            success: function(response)
            {
                var wr = new WebResponse().parse(response);

                if (!Util.isNullOrUndefined(success))
                {
                    success(wr);
                }
            },
            error: function()
            {
                if (!Util.isNullOrUndefined(error))
                {
                    error();
                }
            }
        });
    }

};