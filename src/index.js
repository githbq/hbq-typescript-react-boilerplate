"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 程序的入口
 */
require("@/vendors");
var React = require("react");
var ReactDOM = require("react-dom");
var react_router_1 = require("react-router");
//页面
var Demo_1 = require("@/routes/Demo");
// 路由表
var routes = (React.createElement(react_router_1.Router, { history: react_router_1.hashHistory },
    React.createElement(react_router_1.Route, { path: '/', component: Demo_1.default })));
ReactDOM.render(routes, document.getElementById('root'));
//# sourceMappingURL=index.js.map