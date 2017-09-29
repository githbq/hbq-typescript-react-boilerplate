/**
 * 程序的入口
 */
import '@/vendors'
import * as  React from 'react'
import * as  ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '@/routes/Demo2'
const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>
  , rootEl
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('@/routes/Demo2', () => {
    const NextApp = require<{ default: typeof App }>('@/routes/Demo2').default
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootEl
    )
  })
}
