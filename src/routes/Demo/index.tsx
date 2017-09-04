/**
 * 路由页面
 */
import './style'
import * as React from 'react'
import DemoComponent from '@/components/Demo'
import DemoComponent2 from '@/components/Demo2'
export default class extends React.Component {
  render() {
    console.log(this.state)
    return <div className='demo-route'>
      this is demo-route
            <DemoComponent />
      <DemoComponent2 />
      <DemoComponent2 />
      <DemoComponent2 />
    </div>
  }

}

