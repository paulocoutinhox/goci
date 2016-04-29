var Project = new function()
{

    this.addProjectToHTML = function(project)
    {
        var html = '' +
        '<a href="/project/view?project=' + project.id + '" id="project-row-' + project.id + '" class="project-row list-group-item">' +
        '    <h4 class="list-group-item-heading">' + project.name + '</h4>' +
        '    <p class="list-group-item-text">' + project.description + '</p>' +
        '</a>';

        $('#project-list').append(html);
    }

    this.addProjectTaskToHTML = function(projectId, task)
    {
        var html = '' +
        '<div id="project-task-row-' + task.id + '" class="project-task-row list-group-item">' +
        '    <h4 class="list-group-item-heading">' + task.name + '</h4>' +
        '    <div class="list-group-item-text">' +
        '        <p>' +
        '            <strong>Description:</strong> ' + task.description +
        '            <br />' +
        '            <strong>Steps:</strong> ' + task.steps.length +
        '        </p>' +
        '        <div>' +
        '            <button type="button" class="btn btn-success ph-project-task-run-button-' + task.id + '" onclick="projectTaskRun(\'' + projectId + '\', \'' + task.id + '\')">Run</button>' +
        '            <button type="button" class="btn btn-default" onclick="projectTaskView(\'' + projectId + '\', \'' + task.id + '\')">View</button>' +
        '        </div>' +
        '    </div>' +
        '</div>';

        $('#project-task-list').append(html);
    }

    this.list = function(success, error)
    {
        Util.showLoadingData();

        $.ajax({
            url: '/api/project/list',
            type: 'GET',
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
                            var list = response.data.list

                            if (!Util.isUndefined(list) && !Util.isNull(list))
                            {
                                Project.clearProjectList();

                                if (list.length > 0)
                                {
                                    for (var x = 0; x < list.length; x++)
                                    {
                                        if (!$("#project-row-" + list[x].id).length > 0)
                                        {
                                            Project.addProjectToHTML(list[x]);
                                        }
                                    }

                                    Util.showData();

                                    if (!Util.isUndefined(success))
                                    {
                                        success();
                                    }

                                    return;
                                }
                                else
                                {
                                    Util.showNoData();

                                    if (!Util.isUndefined(success))
                                    {
                                        success();
                                    }

                                    return;
                                }
                            }
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

    this.view = function(projectId, success, error)
    {
        Util.showLoadingData();

        $.ajax({
            url: '/api/project/view',
            type: 'GET',
            data: { project: projectId },
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
                            Project.clearProjectTaskList();

                            $('.ph-project-name').html(response.data.project.name);
                            $('.ph-project-description').html(response.data.project.description);
                            $('.ph-project-tasks-num').html(response.data.project.tasks.length);

                            var tasks = response.data.project.tasks;

                            for (var x = 0; x < tasks.length; x++)
                            {
                                if (!$("#project-task-row-" + tasks[x].id).length > 0)
                                {
                                    Project.addProjectTaskToHTML(projectId, tasks[x]);
                                }
                            }

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

    this.clearProjectList = function()
    {
        $('.project-row').remove();
    }

    this.clearProjectTaskList = function()
    {
        $('.project-task-row').remove();
    }

};