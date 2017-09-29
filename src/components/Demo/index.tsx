import * as React from 'react'
import { Route, Link, match } from 'react-router-dom'
import * as styles from './style.styl'
import * as PropTypes from 'prop-types'
interface State {
  abc: number
}
interface Props {
  match?: match<any>
}
/**
 * 组件demo
 */
export default class extends React.Component<Props, State> {
  static contextTypes = {
    match: PropTypes.any
  }
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <h1 className={styles['demo-component']}>
          demo11111
          <a href='demo2.html'>跳转到demo22222</a>
          <b>{JSON.stringify(this.props.match.params)}</b>
        </h1>
      </div>
    )
  }
}


