"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
require("./style");
/**
 * 组件demo
 */
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1(props) {
        return _super.call(this, props) || this;
    }
    default_1.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h1", { className: 'demo-component' }, "xx/components/Demo")));
    };
    return default_1;
}(React.Component));
exports.default = default_1;
//# sourceMappingURL=index.js.map