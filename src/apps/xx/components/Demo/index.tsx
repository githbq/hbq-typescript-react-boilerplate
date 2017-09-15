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
    return (
      <div>
        <h1 className='demo-component'>
          xx/components/Demo
        </h1>
      </div>
    )
  }
}

