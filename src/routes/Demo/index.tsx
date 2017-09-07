/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import DemoComponent from '@/components/Demo'
export interface State {
  list: Array<any>
}
export interface Props {
  list: Array<any>
}
export default class extends React.Component<Props, State> {
  state = { list: [1, 2, 34, 34] }
  static defaultProps = {
    list: [6, 7, 87, 8, 4]
  }
  render() {
    console.log(this.state)
    return <div className={styles['demo-route']}>
      this is demo-route
             <DemoComponent />
      {this.state.list.join('---')}
      {this.props.list.join('****')}
    </div>
  }

}
