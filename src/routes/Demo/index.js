"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * 路由页面
 */
var styles = require("./style.less");
var React = require("react");
var Demo_1 = require("@/components/Demo");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { list: [1, 2, 34, 34] };
        return _this;
    }
    default_1.prototype.render = function () {
        var a = 1111;
        console.log(this.state);
        return React.createElement("div", { className: styles['demo-route'] },
            "this is demo-route",
            React.createElement(Demo_1.default, null),
            this.state.list.join('---'),
            this.props.list.join('****'));
    };
    default_1.defaultProps = {
        list: [6, 7, 87, 8, 4]
    };
    return default_1;
}(React.Component));
exports.default = default_1;
//# sourceMappingURL=index.js.map