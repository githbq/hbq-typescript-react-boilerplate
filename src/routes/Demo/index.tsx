/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import * as classNames from 'classnames'

export default class extends React.Component {

  render() {
    return <div className={styles['demo-route']}>
      welcome to jsfan.cn!
      <br />
      <a href='./editor.html'>跳转到url解析</a>
    </div>
  }

}

