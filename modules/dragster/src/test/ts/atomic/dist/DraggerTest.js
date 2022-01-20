"use strict";
exports.__esModule = true;
var bedrock_client_1 = require("@ephox/bedrock-client");
var katamari_1 = require("@ephox/katamari");
var DragApis_1 = require("ephox/dragster/api/DragApis");
var Dragging = require("ephox/dragster/core/Dragging");
bedrock_client_1.UnitTest.test('DraggerTest', function () {
    var optApi = katamari_1.Optional.none();
    var argumentToStart = 'start';
    var argumentToMutate = 'mutate';
    var mutations = [];
    var mode = DragApis_1.DragMode({
        compare: function (old, nu) { return (nu - old); },
        extract: function (raw) { return katamari_1.Optional.from(parseInt(raw, 10)); },
        mutate: function (mutation, data) {
            bedrock_client_1.assert.eq(argumentToMutate, mutation);
            mutations.push(data);
        },
        sink: function (dragApi, _settings) {
            optApi = katamari_1.Optional.some(dragApi);
            return DragApis_1.DragSink({
                element: function () { return 'element'; },
                start: function (v) {
                    bedrock_client_1.assert.eq(argumentToStart, v);
                },
                stop: katamari_1.Fun.noop,
                destroy: katamari_1.Fun.noop
            });
        }
    });
    var dragging = Dragging.setup(argumentToMutate, mode, {});
    var api = optApi.getOrDie('API not loaded');
    // While dragging is not on, nothing should be collected
    dragging.go(argumentToStart);
    bedrock_client_1.assert.eq([], mutations);
    api.move('10');
    bedrock_client_1.assert.eq([], mutations);
    api.move('20');
    bedrock_client_1.assert.eq([], mutations);
    dragging.on();
    // The first value is only used for calibration
    api.move('15');
    bedrock_client_1.assert.eq([], mutations);
    api.move('20');
    bedrock_client_1.assert.eq([20 - 15], mutations);
    api.move('21');
    bedrock_client_1.assert.eq([20 - 15, 21 - 20], mutations);
    api.drop();
    bedrock_client_1.assert.eq([20 - 15, 21 - 20], mutations);
    // Now that we have dropped, start moving again and check that it isn't logged.
    api.move('22');
    bedrock_client_1.assert.eq([20 - 15, 21 - 20], mutations);
    api.move('23');
    bedrock_client_1.assert.eq([20 - 15, 21 - 20], mutations);
    // Now, start it again.
    dragging.go(argumentToStart);
    bedrock_client_1.assert.eq([20 - 15, 21 - 20], mutations);
    // First one calibrates.
    api.move('24');
    bedrock_client_1.assert.eq([20 - 15, 21 - 20], mutations);
    api.move('40');
    bedrock_client_1.assert.eq([20 - 15, 21 - 20, 40 - 24], mutations);
});
