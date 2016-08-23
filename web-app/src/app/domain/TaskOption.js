"use strict";
var TaskOption = (function () {
    function TaskOption(options) {
        if (options === void 0) { options = {}; }
        this.id = options["id"] || '';
        this.type = options["type"] || '';
        this.description = options["description"] || '';
        this.value = options["value"] || '';
        this.values = options["values"] || '';
    }
    return TaskOption;
}());
exports.TaskOption = TaskOption;
//# sourceMappingURL=TaskOption.js.map