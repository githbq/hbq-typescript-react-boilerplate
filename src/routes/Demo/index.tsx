/**
 * 路由页面
 */

import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./index.less";

import DemoComponent from "@/components/Demo";
import DemoComponent2 from "@/components/Demo2";

interface IProps {
  history: any;
}
export default (props:IProps)=>
      (
      <Router history={props.history}>
        <Route
          render={({ location }) => {
            return (
              <Switch>
                <Route component={DemoComponent} exact location={location} path="/" />
                <Route component={DemoComponent} location={location} path="/aaa/:aaa" />
                <Route component={DemoComponent2} location={location} path="/aaa" />
                <Route component={DemoComponent} location={location} path="/bbb" />
              </Switch>
            );
          }}
        />
      </Router>
    ); 
}
