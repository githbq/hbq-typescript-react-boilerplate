import { observable, useStrict, action } from 'mobx'
import * as  queryString from 'query-string'
import * as  stringify from 'json-stringify-pretty-compact'
useStrict(true)
class MyState {
  @observable content = ''
  @observable contentResult = ''
  @observable jsonResult = ''
  @action setContent(value) {
    this.content = value
  }
  @action urlDecode = () => {
    this.contentResult = decodeURIComponent(this.content)
  }
  @action urlEncode = () => {
    this.contentResult = encodeURIComponent(this.content)
  }
  @action getJsonParams = () => {
    const decodeString = decodeURIComponent(this.content)
    const urlParamsString = decodeString.replace(/[\r\n]/, '').replace(/^.*?\?/, '')
    const urlJson = queryString.parse(urlParamsString)
    const pretty = stringify(
      urlJson,
      {
      }
    )
    this.jsonResult = pretty
  }
  @action convert = (value) => {
    this.setContent(value)
    this.urlDecode()
    this.getJsonParams()
  }
}
export const newState = new MyState()
