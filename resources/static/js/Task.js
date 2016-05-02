var Task = new function()
{

    this.view = function(projectId, taskId, preProcess, success, error)
    {
        if (!Util.isNullOrUndefined(preProcess))
        {
            preProcess();
        }

        $.ajax({
            url: '/api/task/view',
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

    this.run = function(projectId, taskId, preProcess, success, error)
    {
        if (!Util.isNullOrUndefined(preProcess))
        {
            preProcess();
        }

        $.ajax({
            url: '/api/task/run',
            type: 'GET',
            data: { project: projectId, task: taskId },
            dataType: 'json',
            success: function(response)
            {
                Util.hideProgressWindow();
                Task.enableRunButton(taskId);

                var errorMessage = "";

                if (!Util.isUndefined(response))
                {
                    if (response != "" && response != null)
                    {
                        if (response.success)
                        {
                            if (!Util.isUndefined(success))
                            {
                                success();
                            }

                            return;
                        }
                        else
                        {
                            errorMessage = Util.getFirstErrorMessage(response.data.errors);
                        }
                    }
                }

                Util.showErrorWindow(errorMessage);

                if (!Util.isUndefined(error))
                {
                    error();
                }
            },
            error: function()
            {
                Util.hideProgressWindow();
                Util.showErrorWindow();

                if (!Util.isUndefined(error))
                {
                    error();
                }
            }
        });
    }

    this.disableRunButton = function(taskId)
    {
        $('.ph-project-task-run-button').addClass('disabled');
        $('.ph-project-task-run-button-' + taskId).addClass('disabled');
    }

    this.enableRunButton = function(taskId)
    {
        $('.ph-project-task-run-button').removeClass('disabled');
        $('.ph-project-task-run-button-' + taskId).removeClass('disabled');
    }

};