/**
 * 路由页面
 */

import * as React from 'react'
import { Route, Router, Switch } from 'react-router-dom'

import createHistory from 'history/createHashHistory'
const history = createHistory()

import * as styles from './style.less'

import DemoComponent from '@/components/Demo'
import DemoComponent2 from '@/components/Demo2'
export default class extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route render={({ location }) => {
          return (
            <Switch>
              <Route component={DemoComponent}
                exact
                location={location}
                path='/'
              />
              <Route component={DemoComponent}
                location={location}
                path='/aaa/:aaa'
              />
              <Route component={DemoComponent2}
                location={location}
                path='/aaa'
              />
              <Route component={DemoComponent}
                location={location}
                path='/bbb'
              />
            </Switch>
          )
        }}
        />
      </Router>
    )
  }
}
