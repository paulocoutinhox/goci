var Project = new function()
{

    this.add = function(project)
    {
        var html = '' +
        '<a href="#" id="project-row-' + project.id + '" class="project-row list-group-item">' +
        '    <h4 class="list-group-item-heading">' + project.name + '</h4>' +
        '    <p class="list-group-item-text">' + project.description + '</p>' +
        '</a>';

        $('#results').append(html);
    }

    this.list = function()
    {
        this.showLoadingResults();

        this.request = $.ajax({
            url: '/api/project/list',
            type: 'GET',
            dataType: 'json',
            success: function(response)
            {
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

                                for (var x = 0; x < list.length; x++)
                                {
                                    if (!$("#project-row-" + list[x].id).length > 0)
                                    {
                                        Project.add(list[x]);
                                    }
                                }
                            }
                        }

                    }
                }

                Project.showResultsOrNoResultsByLogsQuantity();
            },
            error: function()
            {
                isGettingNewest = false;
                Project.showResultsOrNoResultsByLogsQuantity();
            }
        });
    }

    this.clear = function()
    {
        $('.project-row').remove();
        this.showNoResults();
    }

    this.showResults = function(prefix)
    {
        if (Util.isUndefined(prefix))
        {
            prefix = "";
        }
        else
        {
            if (prefix != "")
            {
                prefix += "-";
            }
        }

        if ($('#' + prefix + 'results').is(':hidden'))
        {
            $('#' + prefix + 'results').show();
        }

        $('#' + prefix + 'no-results').hide();
        $('#' + prefix + 'loading-results').hide();
    }

    this.showNoResults = function(prefix)
    {
        if (Util.isUndefined(prefix))
        {
            prefix = "";
        }
        else
        {
            if (prefix != "")
            {
                prefix += "-";
            }
        }

        if ($('#' + prefix + 'no-results').is(':hidden'))
        {
            $('#' + prefix + 'no-results').show();
        }

        $('#' + prefix + 'results').hide();
        $('#' + prefix + 'loading-results').hide();
    }

    this.showLoadingResults = function(prefix)
    {
        if (Util.isUndefined(prefix))
        {
            prefix = "";
        }
        else
        {
            if (prefix != "")
            {
                prefix += "-";
            }
        }

        if ($('#' + prefix + 'loading-results').is(':hidden'))
        {
            $('#' + prefix + 'loading-results').show();
        }

        $('#' + prefix + 'results').hide();
        $('#' + prefix + 'no-results').hide();
    }

    this.showResultsOrNoResultsByLogsQuantity = function(prefix)
    {
        if (Util.isUndefined(prefix))
        {
            prefix = "";
        }
        else
        {
            if (prefix != "")
            {
                prefix += "-";
            }
        }

        if ($('.project-row').length > 0)
        {
            this.showResults(prefix);
        }
        else
        {
            this.showNoResults(prefix);
        }
    }

};