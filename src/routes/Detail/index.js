"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * 路由页面
 */
require("./style");
var React = require("react");
var Detail_1 = require("@/components/Detail");
var default_1 = (function (_super) {
    tslib_1.__extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.render = function () {
        return React.createElement("div", { className: 'demo-route' },
            "this is detail-route",
            React.createElement(Detail_1.default, null));
    };
    return default_1;
}(React.Component));
exports.default = default_1;
//# sourceMappingURL=index.js.map