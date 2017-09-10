import * as React from 'react'
import * as styles from './style.styl'

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
    return (
      <div>
        <h1 className={styles['demo-component']}>
          <a href='xx/detail.html'>跳转到详情页面222</a>
        </h1>
      </div>
    )
  }
}


