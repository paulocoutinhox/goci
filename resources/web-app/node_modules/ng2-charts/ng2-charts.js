"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var charts_1 = require('./components/charts/charts');
__export(require('./components/charts/charts'));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    directives: [
        charts_1.CHART_DIRECTIVES
    ]
};
