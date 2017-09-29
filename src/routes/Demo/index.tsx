/**
 * 路由页面
 */

import * as React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import createHistory from 'history/createHashHistory'

import * as styles from './style.less'

import DemoComponent from '@/components/Demo'
import DemoComponent2 from '@/components/Demo2'
export default class extends React.Component<{}, {}> {

  render() {
    // return <div className={styles['demo-route']}>
    //   this is demo-route hello everyone
    //          <DemoComponent />
    // </div>
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
