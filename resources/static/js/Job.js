var Job = new function()
{

    this.lastResultJobId = "";

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

                if (wr.success)
                {
                    if (!Util.isNullOrUndefined(success))
                    {
                        success(wr);
                    }
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