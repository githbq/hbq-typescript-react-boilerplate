import * as React from 'react'
import './style'

interface State {
  abc: number
}
interface Props {
}
/**
 * 组件demo
 */
export default class extends React.Component<Props, State> {
  constructor(props) {
    super(props)
  }
  render() {
    this.setState({ abc: 1234 })
    return (
      <div>
        <h1 className='demo-component'>
          <a href='detail.html'>跳转到详情页面</a>
        </h1>
      </div>
    )
  }
}


