/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import * as classNames from 'classnames'

import { newState } from '@/models/editor'
import { observer } from 'mobx-react'

interface Props {
  value: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  title: string
}
class TextArea extends React.Component<Props, {}> {
  render() {
    return <div className={classNames(styles['text-area-panel'], styles['textarea-container'])}>
      <div className={styles['title']}>{this.props.title}</div>
      <textarea onChange={this.props.onChange} value={this.props.value} className={styles['text-area-big']}></textarea>
    </div>
  }
}

@observer
export default class extends React.Component {
  onChange = (e) => {
    newState.convert(e.target.value)
  }
  render() {
    return <div className={styles['demo-route']}>
      <div className={classNames('container', styles['container-head'])}>
        <h1>即时url参数解析</h1>
      </div>
      <div className={classNames('container', styles['container-body'])}>
        <TextArea title='原码' onChange={this.onChange} value={newState.content} />
        <TextArea title='解码结果' value={newState.contentResult} />
        <TextArea title='参数结果' value={newState.jsonResult} />
      </div>
    </div>
  }

}

