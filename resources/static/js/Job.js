var Job = new function()
{

    this.lastResultJobId = "";

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
                                var currentLastResultJobId = response.data.result.jobId;

                                if (Job.lastResultJobId != currentLastResultJobId)
                                {
                                    $('.ph-project-task-job-last-result-tabs').html('');
                                    $('.ph-project-task-job-last-result-tab-contents').html('');
                                }

                                lastResultJobId = currentLastResultJobId;

                                var tabToActivate = "";

                                for (var x = 0; x < response.data.result.outputGroup.length; x++)
                                {
                                    var outputGroupName = response.data.result.outputGroup[x].name;
                                    var tabId = Util.slugify(response.data.result.outputGroup[x].name);
                                    var outputGroupContent = response.data.result.outputGroup[x].output;

                                    var tabHTML = '' +
                                    '<li role="presentation">' +
                                    '    <a id="tab-' + tabId + '" href="#tab-content-' + tabId + '" aria-controls="tab-content-' + tabId + '" role="tab" data-toggle="tab">' + outputGroupName + '</a>' +
                                    '</li>';

                                    var tabContentHTML = '' +
                                    '<div role="tabpanel" class="tab-pane" id="tab-content-' + tabId + '">' +
                                    '    <div class="panel panel-default">' +
                                    '        <div id="tab-content-body-' + tabId + '" class="panel-body"> ' +
                                    '            ' + outputGroupContent +
                                    '        </div>' +
                                    '    </div>' +
                                    '</div>';

                                    if ($('#tab-' + tabId).length == 0)
                                    {
                                        if (tabToActivate == "")
                                        {
                                            tabToActivate = tabId;
                                        }

                                        $('.ph-project-task-job-last-result-tabs').append(tabHTML);
                                        $('.ph-project-task-job-last-result-tab-contents').append(tabContentHTML);
                                    }
                                    else
                                    {
                                        $('#tab-content-body-' + tabId).html(outputGroupContent);
                                    }
                                }
                            }

                            $('.ph-project-task-job-last-result-tabs a').click(function (e) {
                                e.preventDefault();
                                $(this).tab('show');
                            });

                            $('#tab-' + tabToActivate).tab('show');

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
                if (!Util.isUndefined(error))
                {
                    error();
                }
            }
        });
    }

};