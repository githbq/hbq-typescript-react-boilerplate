/**
 * 路由页面
 */
import './style'
import * as React from 'react'
import Detail from '@/components/Detail'
export default class extends React.Component {
  render() {
    return <div className='demo-route'>
      this is detail-route
      <Detail />
    </div>
  }

}
