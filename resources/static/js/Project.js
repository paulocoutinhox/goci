var Project = new function()
{

    this.addProjectToHTML = function(project)
    {
        var html = '' +
        '<a href="/project/view?project=' + project.id + '" id="project-row-' + project.id + '" class="project-row list-group-item">' +
        '    <h4 class="list-group-item-heading">' + project.name + '</h4>' +
        '    <p class="list-group-item-text">' + project.description + '</p>' +
        '</a>';

        $('#data').append(html);
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
                                Project.clear();

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

    this.view = function(project, success, error)
    {
        Util.showLoadingData();

        $.ajax({
            url: '/api/project/view',
            type: 'GET',
            data: { project: project },
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
                            $('.ph-project-name').html(response.data.project.name);
                            $('.ph-project-description').html(response.data.project.description);
                            $('.ph-project-tasks-num').html(response.data.project.tasks.length);

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

    this.clear = function()
    {
        $('.project-row').remove();
        Util.showNoData();
    }



};