"use strict";
exports.__esModule = true;
exports.NoDrag = void 0;
var katamari_1 = require("@ephox/katamari");
var porkbun_1 = require("@ephox/porkbun");
exports.NoDrag = function () {
    var events = porkbun_1.Events.create({
        move: porkbun_1.Event(['info'])
    });
    return {
        onEvent: katamari_1.Fun.noop,
        reset: katamari_1.Fun.noop,
        events: events.registry
    };
};
