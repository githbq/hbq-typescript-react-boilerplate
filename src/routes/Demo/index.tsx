/**
 * 路由页面
 */
import './style'
import * as React from 'react'
import DemoComponent from '@/components/Demo'
export default class extends React.Component {
  render() {
    return <div className='demo-route'>
      this is demo-route
            <DemoComponent />
    </div>
  }

}
