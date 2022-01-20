"use strict";
exports.__esModule = true;
exports.Movement = void 0;
var InDrag_1 = require("./InDrag");
var NoDrag_1 = require("./NoDrag");
exports.Movement = function () {
    var noDragState = NoDrag_1.NoDrag();
    var inDragState = InDrag_1.InDrag();
    var dragState = noDragState;
    var on = function () {
        dragState.reset();
        dragState = inDragState;
    };
    var off = function () {
        dragState.reset();
        dragState = noDragState;
    };
    var onEvent = function (event, mode) {
        dragState.onEvent(event, mode);
    };
    var isOn = function () {
        return dragState === inDragState;
    };
    return {
        on: on,
        off: off,
        isOn: isOn,
        onEvent: onEvent,
        events: inDragState.events
    };
};
