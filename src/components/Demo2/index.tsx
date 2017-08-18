import * as React from 'react'
import { observer } from 'mobx-react'
import './style'
import { newState } from '@/models/demo'

@observer
export default class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      newState.init()
    }, 4000)
  }
  render() {
    return (
      <div className='demo-component2'>
        <p>{newState.num}</p>
        <button className='btn-add' onClick={newState.addNum}>点我+1</button>
      </div>
    )
  }
}
