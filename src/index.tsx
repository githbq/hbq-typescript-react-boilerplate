/**
 * 程序的入口 
 */
import * as  React from 'react'
import * as  update from 'react-addons-update'
//追加功能库 用来操作多层state
React.AddonsUpdate = update
import * as  ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
//页面
import DemoRoute from '@/routes/Demo'
// 路由表 
const routes = (
    <Router history={hashHistory}>
        {/*<IndexRoute component={DemoRoute} />*/}
        <Route path='/' component={DemoRoute} />
    </Router>
)
ReactDOM.render(routes, document.getElementById('root'))
