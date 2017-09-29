/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import DemoComponent2 from '@/components/Demo2'
export default class extends React.Component<{}, {}> {

  render() {
    return <div className={styles['demo-route']}>
      this is demo-route2222 hello everyone  1
             <DemoComponent2 />
    </div>
  }
}
