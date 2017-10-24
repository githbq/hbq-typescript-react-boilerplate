/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import DemoComponent2 from '@/components/Demo2'

interface Props {
  history: any
}
class Child extends React.Component<{ list: any }, {}>  {
  render() {
    return (
      <div>{this.props.list.map((n, i) => {
        return <div key={i}>{n.a}</div>
      })}</div>
    )
  }
}

export default class extends React.Component<Props, {}> {
  state = {
    list: [
      { a: 11 }, { a: 22 }, { a: 3 }, { a: 4 }]
  }
  reset = () => {
    this.setState({
      list: [
        { a: 99 }, { a: 88 }, { a: 77 }, { a: 66 }
      ]
    })
  }
  render() {
    return <div className={styles['demo-route']}>
      this is demo-route2222 hello everyone  1
      <br />
      [Child:<Child list={this.state.list} />]
      <button onClick={this.reset}>点击更新</button>
      <DemoComponent2 />
    </div>
  }
}
