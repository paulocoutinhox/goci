"use strict";
var core_1 = require("@angular/core");
var TaskService_1 = require("../services/TaskService");
var forms_1 = require("@angular/forms");
var Utils_1 = require("../models/Utils");
var ProjectTaskOption_1 = require("../models/ProjectTaskOption");
var TaskOptionsComponent = (function () {
    function TaskOptionsComponent(taskService) {
        this.taskService = taskService;
        this.form = new forms_1.FormGroup({});
        this.taskRunWithSuccess = new core_1.EventEmitter();
        this.taskRunWithError = new core_1.EventEmitter();
        this.taskRunCancel = new core_1.EventEmitter();
    }
    TaskOptionsComponent.prototype.ngOnInit = function () {
        this.load();
    };
    TaskOptionsComponent.prototype.ngAfterViewInit = function () {
        this.btRun.nativeElement.focus();
    };
    TaskOptionsComponent.prototype.load = function () {
        var _this = this;
        var controlList = {};
        this.taskOptions = [];
        if (this.options != null) {
            this.options.forEach(function (option) {
                controlList[option["id"]] = new forms_1.FormControl(option["value"]);
                _this.taskOptions.push(new ProjectTaskOption_1.ProjectTaskOption({
                    id: option['id'],
                    type: option['type'],
                    description: option['description'],
                    value: option['value'],
                    values: option['values']
                }));
            });
        }
        else {
            this.showEmptyMessage = true;
        }
        this.form = new forms_1.FormGroup(controlList);
    };
    TaskOptionsComponent.prototype.run = function () {
        var _this = this;
        var formValues = this.form.value;
        var formData = Utils_1.Utils.formValuesEncoded(formValues);
        formData += "&project=" + this.projectId + "&task=" + this.taskId;
        this.taskService.run(formData)
            .then(function (wr) {
            if (wr.success) {
                toastr.success("Your task was added to queue with success!");
                _this.taskRunWithSuccess.emit();
            }
            else {
                toastr.error(Utils_1.Utils.getFirstErrorMessage(wr));
                _this.taskRunWithError.emit();
            }
        })
            .catch(function (error) {
            toastr.error(error);
            _this.taskRunWithError.emit();
        });
    };
    TaskOptionsComponent.prototype.cancel = function () {
        this.taskRunCancel.emit();
    };
    TaskOptionsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'task-options',
                    templateUrl: 'task-options.component.html'
                },] },
    ];
    /** @nocollapse */
    TaskOptionsComponent.ctorParameters = [
        { type: TaskService_1.TaskService, },
    ];
    TaskOptionsComponent.propDecorators = {
        'projectId': [{ type: core_1.Input },],
        'projectName': [{ type: core_1.Input },],
        'taskId': [{ type: core_1.Input },],
        'taskName': [{ type: core_1.Input },],
        'taskDescription': [{ type: core_1.Input },],
        'options': [{ type: core_1.Input },],
        'taskRunWithSuccess': [{ type: core_1.Output },],
        'taskRunWithError': [{ type: core_1.Output },],
        'taskRunCancel': [{ type: core_1.Output },],
        'taskOptions': [{ type: core_1.Input },],
        'btRun': [{ type: core_1.ViewChild, args: ['btRun',] },],
    };
    return TaskOptionsComponent;
}());
exports.TaskOptionsComponent = TaskOptionsComponent;
//# sourceMappingURL=task-options.component.js.map