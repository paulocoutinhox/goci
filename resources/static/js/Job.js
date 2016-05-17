var Job = new function () {

	this.JOB_STATUS_ON_QUEUE = "onqueue";
	this.JOB_STATUS_RUNNING = "running";
	this.JOB_STATUS_SUCCESS = "success";
	this.JOB_STATUS_ERROR = "error";

	this.addJobToHTML = function (job) {
		var html = '' +
			'<div class="job-row list-group-item">' +
			'    <h4 class="list-group-item-heading">' + job.task.name + '</h4>' +
			'    <div class="list-group-item-text">' +
			//'        <div><strong>Job:</strong> <span class="ph-project-task-last-job-id-' + job.id + '"></span></div>' +
			//'        <div><strong>Created at:</strong> <span class="ph-project-task-last-job-created-at-' + job.id + '"></span></div>' +
			//'        <div><strong>Started at:</strong> <span class="ph-project-task-last-job-started-at-' + job.id + '"></span></div>' +
			//'        <div><strong>Finished at:</strong> <span class="ph-project-task-last-job-finished-at-' + job.id + '"></span></div>' +
			'        <div><strong>Duration:</strong> <span class="ph-project-task-last-job-duration-' + job.id + '"></span></div>' +
			'        <div><strong>Status:</strong> <span class="ph-project-task-last-job-status-' + job.id + '"></span></div>' +
			'        <div><strong>Progress:</strong> <span class="ph-project-task-last-job-progress-' + job.id + '"></span></div>' +
			'    </div>' +
			'</div>';

		$('#job-list').append(html);
	};

	this.clearJobList = function () {
		$('.job-row').remove();
	};

	this.last = function (projectId, taskId, preProcess, success, error) {
		if (!Util.isNullOrUndefined(preProcess)) {
			preProcess();
		}

		$.ajax({
			url: '/api/job/last',
			type: 'GET',
			data: {project: projectId, task: taskId},
			dataType: 'json',
			success: function (response) {
				var wr = new WebResponse().parse(response);

				if (!Util.isNullOrUndefined(success)) {
					success(wr);
				}
			},
			error: function () {
				if (!Util.isNullOrUndefined(error)) {
					error();
				}
			}
		});
	};

	this.runningList = function (preProcess, success, error) {
		if (!Util.isNullOrUndefined(preProcess)) {
			preProcess();
		}

		$.ajax({
			url: '/api/job/runningList',
			type: 'GET',
			dataType: 'json',
			success: function (response) {
				var wr = new WebResponse().parse(response);

				if (!Util.isNullOrUndefined(success)) {
					success(wr);
				}
			},
			error: function () {
				if (!Util.isNullOrUndefined(error)) {
					error();
				}
			}
		});
	};

};