"use strict";
exports.__esModule = true;
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Blocker_1 = require("../detect/Blocker");
var DragApis_1 = require("./DragApis");
var compare = function (old, nu) {
    return sugar_1.SugarPosition(nu.left - old.left, nu.top - old.top);
};
var extract = function (event) {
    return katamari_1.Optional.some(sugar_1.SugarPosition(event.x, event.y));
};
var mutate = function (mutation, info) {
    mutation.mutate(info.left, info.top);
};
var sink = function (dragApi, settings) {
    var blocker = Blocker_1.Blocker(settings);
    // Included for safety. If the blocker has stayed on the screen, get rid of it on a click.
    var mdown = sugar_1.DomEvent.bind(blocker.element(), 'mousedown', dragApi.forceDrop);
    var mup = sugar_1.DomEvent.bind(blocker.element(), 'mouseup', dragApi.drop);
    var mmove = sugar_1.DomEvent.bind(blocker.element(), 'mousemove', dragApi.move);
    var mout = sugar_1.DomEvent.bind(blocker.element(), 'mouseout', dragApi.delayDrop);
    var destroy = function () {
        blocker.destroy();
        mup.unbind();
        mmove.unbind();
        mout.unbind();
        mdown.unbind();
    };
    var start = function (parent) {
        sugar_1.Insert.append(parent, blocker.element());
    };
    var stop = function () {
        sugar_1.Remove.remove(blocker.element());
    };
    return DragApis_1.DragSink({
        element: blocker.element,
        start: start,
        stop: stop,
        destroy: destroy
    });
};
exports["default"] = DragApis_1.DragMode({
    compare: compare,
    extract: extract,
    sink: sink,
    mutate: mutate
});
