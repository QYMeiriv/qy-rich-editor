"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Blocker = void 0;
var katamari_1 = require("@ephox/katamari");
var sugar_1 = require("@ephox/sugar");
var Styles = require("../style/Styles");
exports.Blocker = function (options) {
    var settings = __assign({ layerClass: Styles.resolve('blocker') }, options);
    var div = sugar_1.SugarElement.fromTag('div');
    sugar_1.Attribute.set(div, 'role', 'presentation');
    sugar_1.Css.setAll(div, {
        position: 'fixed',
        left: '0px',
        top: '0px',
        width: '100%',
        height: '100%'
    });
    sugar_1.Class.add(div, Styles.resolve('blocker'));
    sugar_1.Class.add(div, settings.layerClass);
    var element = katamari_1.Fun.constant(div);
    var destroy = function () {
        sugar_1.Remove.remove(div);
    };
    return {
        element: element,
        destroy: destroy
    };
};
