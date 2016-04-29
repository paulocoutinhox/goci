var Task = new function()
{

    this.view = function(projectId, taskId, success, error)
    {
        Util.showLoadingData();

        $.ajax({
            url: '/api/task/view',
            type: 'GET',
            data: { project: projectId, task: taskId },
            dataType: 'json',
            success: function(response)
            {
                var errorMessage = "";

                if (!Util.isUndefined(response))
                {
                    if (response != "" && response != null)
                    {
                        if (response.success)
                        {
                            $('.ph-project-task-name').html(response.data.task.name);
                            $('.ph-project-task-description').html(response.data.task.description);
                            $('.ph-project-task-steps-num').html(response.data.task.steps.length);

                            Util.showData();

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

                Util.showErrorData(errorMessage);

                if (!Util.isUndefined(error))
                {
                    error();
                }
            },
            error: function()
            {
                Util.showErrorData();

                if (!Util.isUndefined(error))
                {
                    error();
                }
            }
        });
    }

    this.run = function(projectId, taskId, success, error)
    {
        Task.disableRunButton(taskId);
        return;
        Util.showProgressWindow();

        $.ajax({
            url: '/api/task/run',
            type: 'GET',
            data: { project: projectId, task: taskId },
            dataType: 'json',
            success: function(response)
            {
                Util.hideProgressWindow();

                var errorMessage = "";

                if (!Util.isUndefined(response))
                {
                    if (response != "" && response != null)
                    {
                        if (response.success)
                        {
                            setTimeout(function() { Task.enableRunButton(taskId); }, 5000);

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
        console.log('.ph-project-task-run-button-' + taskId);
        $('.ph-project-task-run-button-' + taskId).addClass('disabled');
    }

    this.enableRunButton = function(taskId)
    {
        $('.ph-project-task-run-button').removeClass('disabled');
        $('.ph-project-task-run-button-' + taskId).removeClass('disabled');
    }

};