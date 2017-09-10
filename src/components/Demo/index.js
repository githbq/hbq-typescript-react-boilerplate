"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var styles = require("./style.styl");
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
            React.createElement("h1", { className: styles['demo-component'] },
                React.createElement("a", { href: 'xx/detail.html' }, "\u8DF3\u8F6C\u5230\u8BE6\u60C5\u9875\u9762222"))));
    };
    return default_1;
}(React.Component));
exports.default = default_1;
//# sourceMappingURL=index.js.map