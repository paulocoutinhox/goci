"use strict";
var ProjectTaskOption = (function () {
    function ProjectTaskOption(options) {
        if (options === void 0) { options = {}; }
        this.id = options["id"] || '';
        this.type = options["type"] || '';
        this.description = options["description"] || '';
        this.value = options["value"] || '';
        this.values = options["values"] || '';
    }
    return ProjectTaskOption;
}());
exports.ProjectTaskOption = ProjectTaskOption;
//# sourceMappingURL=ProjectTaskOption.js.map