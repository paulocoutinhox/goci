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
    };

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
    };

    this.clearProjectList = function()
    {
        $('.project-row').remove();
    };

    this.clearProjectTaskList = function()
    {
        $('.project-task-row').remove();
    };

    this.list = function(preProcess, success, error)
    {
        if (!Util.isNullOrUndefined(preProcess))
        {
            preProcess();
        }

        $.ajax({
            url: '/api/project/list',
            type: 'GET',
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
    };

    this.view = function(projectId, preProcess, success, error)
    {
        if (!Util.isNullOrUndefined(preProcess))
        {
            preProcess();
        }

        $.ajax({
            url: '/api/project/view',
            type: 'GET',
            data: { project: projectId },
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
    };

};