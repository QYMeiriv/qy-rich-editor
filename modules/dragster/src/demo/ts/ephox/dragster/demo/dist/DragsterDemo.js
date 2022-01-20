"use strict";
exports.__esModule = true;
var sugar_1 = require("@ephox/sugar");
var Dragger = require("ephox/dragster/api/Dragger");
var Sizers_1 = require("ephox/dragster/demo/Sizers");
var Grow = require("ephox/dragster/transform/Grow");
var Relocate = require("ephox/dragster/transform/Relocate");
// const container = $('<div/>').append('Hi.');
// const dialog = Dragster();
// const titlebar = SugarElement.fromText('title', document);
// const content = (function () {
//   const text = SugarElement.fromText('This is the body of the text ...', document);
//   const p = SugarElement.fromTag('p');
//   Insert.append(p, text);
//   return p;
// })();
// dialog.setHeader(titlebar);
// dialog.setContent(content);
// // Demonstrate that dialog can change after being created.
// setTimeout(function () {
//   dialog.setHeader(SugarElement.fromText('blah'));
//   dialog.setContent(SugarElement.fromText('new content'));
// }, 5000);
// container.append(dialog.element().dom);
// $('#ephox-ui').append(container);
// dialog.show(10, 10);
var div = sugar_1.SugarElement.fromTag('div');
sugar_1.Css.setAll(div, {
    position: 'absolute',
    left: '10px',
    top: '20px',
    width: '100px',
    height: '50px',
    background: 'blue'
});
// will need closers.
var sizers = Sizers_1.Sizers();
sugar_1.DomEvent.bind(div, 'mousedown', function () {
    sizers.show();
    sizers.update(div);
    relocater.on();
});
var ephoxUi = sugar_1.SelectorFind.first('#ephox-ui').getOrDie();
sugar_1.Insert.append(ephoxUi, div);
var neGrow = Grow.both(div);
neGrow.events.grow.bind(function () {
    sizers.hide();
    relocater.off();
});
var relocate = Relocate.both(div);
relocate.events.relocate.bind(function () {
    sizers.hide();
});
var grower = Dragger.transform(neGrow);
grower.events.stop.bind(function () {
    sizers.update(div);
    sizers.show();
    relocater.on();
});
grower.on();
sugar_1.DomEvent.bind(sizers.southeast().element(), 'mousedown', function () {
    grower.go(ephoxUi);
});
var relocater = Dragger.transform(relocate);
relocater.events.stop.bind(function () {
    sizers.update(div);
    sizers.show();
});
sugar_1.DomEvent.bind(div, 'mousedown', function () {
    relocater.go(sugar_1.SugarElement.fromDom(document.body));
});
relocater.off();
