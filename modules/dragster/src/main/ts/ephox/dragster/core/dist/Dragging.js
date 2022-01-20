"use strict";
exports.__esModule = true;
exports.setup = void 0;
var katamari_1 = require("@ephox/katamari");
var porkbun_1 = require("@ephox/porkbun");
var DragApis_1 = require("../api/DragApis");
var Movement_1 = require("../detect/Movement");
var setup = function (mutation, mode, settings) {
    var active = false;
    var events = porkbun_1.Events.create({
        start: porkbun_1.Event([]),
        stop: porkbun_1.Event([])
    });
    var movement = Movement_1.Movement();
    var drop = function () {
        sink.stop();
        if (movement.isOn()) {
            movement.off();
            events.trigger.stop();
        }
    };
    var throttledDrop = katamari_1.Throttler.last(drop, 200);
    var go = function (parent) {
        sink.start(parent);
        movement.on();
        events.trigger.start();
    };
    var mousemove = function (event) {
        throttledDrop.cancel();
        movement.onEvent(event, mode);
    };
    movement.events.move.bind(function (event) {
        mode.mutate(mutation, event.info);
    });
    var on = function () {
        active = true;
    };
    var off = function () {
        active = false;
        // acivate some events here?
    };
    var runIfActive = function (f) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (active) {
                f.apply(null, args);
            }
        };
    };
    var sink = mode.sink(DragApis_1.DragApi({
        // ASSUMPTION: runIfActive is not needed for mousedown. This is pretty much a safety measure for
        // inconsistent situations so that we don't block input.
        forceDrop: drop,
        drop: runIfActive(drop),
        move: runIfActive(mousemove),
        delayDrop: runIfActive(throttledDrop.throttle)
    }), settings);
    var destroy = function () {
        sink.destroy();
    };
    return {
        element: sink.element,
        go: go,
        on: on,
        off: off,
        destroy: destroy,
        events: events.registry
    };
};
exports.setup = setup;
