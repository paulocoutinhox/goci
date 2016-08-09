var Task = new function () {

	this.view = function (projectId, taskId, preProcess, success, error) {
		if (!Util.isNullOrUndefined(preProcess)) {
			preProcess();
		}

		$.ajax({
			url: '/api/task/view',
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

	this.run = function (projectId, taskId, preProcess, success, error) {
		if (!Util.isNullOrUndefined(preProcess)) {
			preProcess();
		}

		$.ajax({
			url: '/api/task/options',
			type: 'GET',
			data: {project: projectId, task: taskId},
			dataType: 'json',
			success: function (response) {
				var wr = new WebResponse().parse(response);
				var errorMessage = null;

				if (wr.success) {
					Util.callAfterDelay(function () {
						// create the form content
						var formContent = '';
						formContent += '<form id="formTaskOptions" action="" class="form-task-options" autocomplete="off">';
						formContent += Util.createTaskOptionsFields(wr.data.options);
						formContent += '<input type="submit" class="hidden" />';
						formContent += '</form>';

						// create the header content
						var headerContent = '';
						headerContent += '<p><strong>Project:</strong> ' + wr.data.project.name + '</p>';
						headerContent += '<p><strong>Task:</strong> ' + wr.data.task.name + '</p>';

						Util.hideProgressWindow();
						Util.showTaskOptionsWindow(headerContent, formContent);

						// after form was showed, add bind events
						$('#modalTaskOptionsButtonRun').off().on('click', function () {
							Task.submitTaskOptionsForm(projectId, taskId, preProcess, success, error);
						});

						$('#formTaskOptions').off().submit(function (e) {
							Task.submitTaskOptionsForm(projectId, taskId, preProcess, success, error);
							e.preventDefault();
						});
					});
				} else {
					errorMessage = Util.getFirstErrorMessage(wr.data.errors);
				}

				if (errorMessage) {
					Util.hideProgressWindow();
					Util.showErrorNotification(errorMessage);
				}
			},
			error: function () {
				if (!Util.isNullOrUndefined(error)) {
					Util.callAfterDelay(function () {
						error();
					});
				}
			}
		});
	};

	this.submitTaskOptionsForm = function (projectId, taskId, preProcess, success, error) {
		var formData = $('#formTaskOptions').serialize();

		formData += '&project=' + projectId;
		formData += '&task=' + taskId;

		if (!Util.isNullOrUndefined(preProcess)) {
			preProcess();
		}

		Util.hideTaskOptionsWindow();

		Util.callAfterDelay(function () {
			$.ajax({
				url: '/api/task/run',
				type: 'POST',
				data: formData,
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
		});
	}

};