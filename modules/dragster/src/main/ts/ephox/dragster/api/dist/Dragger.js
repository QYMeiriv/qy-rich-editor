"use strict";
exports.__esModule = true;
exports.transform = void 0;
var Dragging = require("../core/Dragging");
var MouseDrag_1 = require("./MouseDrag");
var transform = function (mutation, settings) {
    var _a;
    if (settings === void 0) { settings = {}; }
    var mode = (_a = settings.mode) !== null && _a !== void 0 ? _a : MouseDrag_1["default"];
    return Dragging.setup(mutation, mode, settings);
};
exports.transform = transform;
