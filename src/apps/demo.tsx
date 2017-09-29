/**
 * 程序的入口
 */
import '@/vendors'
import * as  React from 'react'
import * as  ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

//解决移动端300毫秒延迟
import * as  fastClick from 'fastclick'
fastClick.attach(document.body)

import App from '@/routes/Demo'
const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>
  , rootEl
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('@/routes/Demo', () => {
    const NextApp = require<{ default: typeof App }>('@/routes/Demo').default
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl
    )
  })
}
