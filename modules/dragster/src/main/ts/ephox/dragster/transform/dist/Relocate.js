"use strict";
exports.__esModule = true;
exports.both = void 0;
var porkbun_1 = require("@ephox/porkbun");
var sugar_1 = require("@ephox/sugar");
var both = function (element) {
    var mutate = function (x, y) {
        var location = sugar_1.SugarLocation.absolute(element);
        sugar_1.Css.setAll(element, {
            left: (location.left + x) + 'px',
            top: (location.top + y) + 'px'
        });
        events.trigger.relocate(x, y);
    };
    var events = porkbun_1.Events.create({
        relocate: porkbun_1.Event(['x', 'y'])
    });
    return {
        mutate: mutate,
        events: events.registry
    };
};
exports.both = both;
