"use strict";
exports.__esModule = true;
exports.InDrag = void 0;
var katamari_1 = require("@ephox/katamari");
var porkbun_1 = require("@ephox/porkbun");
exports.InDrag = function () {
    var previous = katamari_1.Optional.none();
    var reset = function () {
        previous = katamari_1.Optional.none();
    };
    // Return position delta between previous position and nu position,
    // or None if this is the first. Set the previous position to nu.
    var update = function (mode, nu) {
        var result = previous.map(function (old) {
            return mode.compare(old, nu);
        });
        previous = katamari_1.Optional.some(nu);
        return result;
    };
    var onEvent = function (event, mode) {
        var dataOption = mode.extract(event);
        // Dragster move events require a position delta. The moveevent is only triggered
        // on the second and subsequent dragster move events. The first is dropped.
        dataOption.each(function (data) {
            var offset = update(mode, data);
            offset.each(function (d) {
                events.trigger.move(d);
            });
        });
    };
    var events = porkbun_1.Events.create({
        move: porkbun_1.Event(['info'])
    });
    return {
        onEvent: onEvent,
        reset: reset,
        events: events.registry
    };
};
