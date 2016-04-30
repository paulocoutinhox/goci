var Job = new function()
{

    this.lastResult = function(projectId, taskId, success, error)
    {
        $.ajax({
            url: '/api/job/lastResult',
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
                            var html = '';

                            if (!Util.isUndefined(response.data.result) && !Util.isUndefined(response.data.result.outputGroup))
                            {
                                var html2 = '<ul id="project-task-job-results" class="nav nav-tabs" role="tablist">';
                                var html3 = '<div class="tab-content">';
                                var html4 = '';
                                var html5 = '</div>';

                                for (var x = 0; x < response.data.result.outputGroup.length; x++)
                                {
                                    var outputGroupName = response.data.result.outputGroup[x].name;
                                    var tabId = response.data.result.outputGroup[x].name;
                                    var outputGroupContent = response.data.result.outputGroup[x].output;

                                    html2 = html2 +
                                    '<li role="presentation" class="' + (x == 0 ? ' active ' : '') + '">' +
                                    '    <a href="#tab-' + tabId + '" aria-controls="tab-' + tabId + '" role="tab" data-toggle="tab">' + outputGroupName + '</a>' +
                                    '</li>';

                                    html4 = html4 +
                                    '<div role="tabpanel" class="tab-pane' + (x == 0 ? ' active ' : '') + '" id="tab-' + tabId + '">' +
                                    '    <div class="panel panel-default">' +
                                    '        <div class="panel-body"> ' +
                                    '            ' + outputGroupContent +
                                    '        </div>' +
                                    '    </div>' +
                                    '</div>';
                                }

                                html2 += '</ul><br />';
                                html = html + html2 + html3 + html4 + html5;
                            }

                            $('.ph-project-task-job-last-result').html(html);

                            $('#project-task-job-results a').click(function (e) {
                                e.preventDefault();
                                $(this).tab('show');
                            });

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

};