"use strict";
exports.__esModule = true;
exports.Sizers = void 0;
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
exports.Sizers = function () {
    var box = function () {
        var r = sugar_1.SugarElement.fromTag('div');
        sugar_1.Width.set(r, 8);
        sugar_1.Height.set(r, 8);
        sugar_1.Css.set(r, 'position', 'absolute');
        sugar_1.Css.set(r, 'border', '1px solid gray');
        sugar_1.Css.set(r, 'z-index', '1000');
        var set = function (x, y) {
            sugar_1.Css.set(r, 'left', (x - 4) + 'px');
            sugar_1.Css.set(r, 'top', (y - 4) + 'px');
        };
        var destroy = function () {
            sugar_1.Remove.remove(r);
        };
        var hider = sugar_1.Visibility.displayToggler(r, 'block');
        return {
            element: katamari_1.Fun.constant(r),
            show: hider.off,
            hide: hider.on,
            set: set,
            destroy: destroy
        };
    };
    var northwest = box();
    var north = box();
    var northeast = box();
    var southeast = box();
    sugar_1.Css.set(southeast.element(), 'cursor', 'se-resize');
    var update = function (target) {
        var loc = sugar_1.SugarLocation.viewport(target);
        var w = sugar_1.Width.get(target);
        var h = sugar_1.Height.get(target);
        var minx = loc.left;
        var maxx = loc.left + w;
        var midx = loc.left + w / 2;
        var y = loc.top;
        var maxy = y + h;
        northwest.set(minx, y);
        north.set(midx, y);
        northeast.set(maxx, y);
        southeast.set(maxx, maxy);
        var body = sugar_1.SelectorFind.first('body');
        body.each(function (b) {
            sugar_1.InsertAll.append(b, [southeast.element()]);
        });
    };
    var hide = function () {
        katamari_1.Arr.each([northwest, north, northeast, southeast], function (x) {
            x.hide();
        });
    };
    var show = function () {
        katamari_1.Arr.each([northwest, north, northeast, southeast], function (x) {
            x.show();
        });
    };
    var destroy = function () {
        northwest.destroy();
        north.destroy();
        northeast.destroy();
        southeast.destroy();
    };
    return {
        northeast: katamari_1.Fun.constant(northeast),
        southeast: katamari_1.Fun.constant(southeast),
        hide: hide,
        show: show,
        update: update,
        destroy: destroy
    };
};
