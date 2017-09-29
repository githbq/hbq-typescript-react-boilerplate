import * as React from 'react'
import * as styles from './style.styl'

interface State {
  abc: number
}
interface Props {
  match: any
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
          <a href='demo2.html'>跳转到demo22222</a>
          <b>{JSON.stringify(this.props.match.params)}</b>
        </h1>
      </div>
    )
  }
}


