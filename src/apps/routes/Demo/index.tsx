/**
 * 路由页面
 */
import * as styles from './style.less'
import * as React from 'react'
import * as classNames from 'classnames'

import { newState } from '@/models/editor'
import { observer } from 'mobx-react'

import * as CopyToClipboard from 'react-copy-to-clipboard'

interface Props {
  value: string
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  title: string
}
interface State {
  copyed: boolean
}
class TextArea extends React.Component<Props, State> {

  state = {
    copyed: false
  }
  componentWillReceiveProps(newProps) {
    this.setState({ copyed: false })
  }
  onCopyed = () => {
    this.setState({ copyed: true })
  }
  render() {
    return <div className={classNames(styles['text-area-panel'], styles['textarea-container'])}>
      <div className={styles['head-container']}>
        <div className={styles['title']}>{this.props.title}</div>
        <div className={styles['btn-container']}>
          <CopyToClipboard text={this.props.value} onCopy={this.onCopyed}>
            <div className={classNames({ [styles['btn-copy']]: true, [styles['ok']]: this.state.copyed })}>
              {this.state.copyed ? '已复制!' : '复制'}
            </div>
          </CopyToClipboard>
        </div>
      </div>

      <textarea onChange={this.props.onChange} value={this.props.value} className={styles['text-area-big']}></textarea>
    </div >
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
        <TextArea title='url 或者 formData' onChange={this.onChange} value={newState.content} />
        <TextArea title='解码结果' value={newState.contentResult} />
        <TextArea title='参数结果' value={newState.jsonResult} />
      </div>
    </div>
  }

}

