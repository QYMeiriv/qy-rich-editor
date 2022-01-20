"use strict";
exports.__esModule = true;
exports.vertical = exports.horizontal = exports.both = void 0;
var porkbun_1 = require("@ephox/porkbun");
var sugar_1 = require("@ephox/sugar");
var grower = function (f) {
    return function (element) {
        var events = porkbun_1.Events.create({
            grow: porkbun_1.Event(['x', 'y'])
        });
        var mutate = function (x, y) {
            var growth = f(x, y);
            var width = sugar_1.Width.get(element);
            var height = sugar_1.Height.get(element);
            sugar_1.Width.set(element, width + growth.x);
            sugar_1.Height.set(element, height + growth.y);
            events.trigger.grow(growth.x, growth.y);
        };
        return {
            mutate: mutate,
            events: events.registry
        };
    };
};
var both = grower(function (x, y) {
    return {
        x: x,
        y: y
    };
});
exports.both = both;
var horizontal = grower(function (x, _y) {
    return {
        x: x,
        y: 0
    };
});
exports.horizontal = horizontal;
var vertical = grower(function (x, y) {
    return {
        x: 0,
        y: y
    };
});
exports.vertical = vertical;
