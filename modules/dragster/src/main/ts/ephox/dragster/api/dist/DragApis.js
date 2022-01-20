"use strict";
exports.__esModule = true;
exports.api = exports.sink = exports.mode = exports.DragApi = exports.DragSink = exports.DragMode = void 0;
var katamari_1 = require("@ephox/katamari");
exports.DragMode = katamari_1.Contracts.exactly([
    'compare',
    'extract',
    'mutate',
    'sink'
]);
exports.DragSink = katamari_1.Contracts.exactly([
    'element',
    'start',
    'stop',
    'destroy'
]);
exports.DragApi = katamari_1.Contracts.exactly([
    'forceDrop',
    'drop',
    'move',
    'delayDrop'
]);
// API for backwards compatibility
var mode = exports.DragMode;
exports.mode = mode;
var sink = exports.DragSink;
exports.sink = sink;
var api = exports.DragApi;
exports.api = api;
