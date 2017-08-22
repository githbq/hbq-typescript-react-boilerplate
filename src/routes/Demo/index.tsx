/**
 * 路由页面
 */
import './style'
import * as React from 'react'
import DemoComponent from '@/components/Demo'
interface State {
  list: Array<any>
}
export default class extends React.Component<void, State> {

  render() {
    return <div className='demo-route'>
      this is demo-route
             <DemoComponent />
    </div>
  }

}
