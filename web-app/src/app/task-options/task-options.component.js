"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
            .then(function (response) {
            if (response != null && response.success == true) {
                toastr.success("Your task was added to queue with success!");
                _this.taskRunWithSuccess.emit();
            }
            else {
                toastr.error(response.data.errors[0][1]);
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TaskOptionsComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TaskOptionsComponent.prototype, "projectName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TaskOptionsComponent.prototype, "taskId", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TaskOptionsComponent.prototype, "taskName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TaskOptionsComponent.prototype, "taskDescription", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TaskOptionsComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TaskOptionsComponent.prototype, "taskRunWithSuccess", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TaskOptionsComponent.prototype, "taskRunWithError", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TaskOptionsComponent.prototype, "taskRunCancel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], TaskOptionsComponent.prototype, "taskOptions", void 0);
    TaskOptionsComponent = __decorate([
        core_1.Component({
            selector: 'task-options',
            templateUrl: 'task-options.component.html'
        }), 
        __metadata('design:paramtypes', [TaskService_1.TaskService])
    ], TaskOptionsComponent);
    return TaskOptionsComponent;
}());
exports.TaskOptionsComponent = TaskOptionsComponent;
//# sourceMappingURL=task-options.component.js.map