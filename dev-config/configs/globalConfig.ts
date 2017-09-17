/**
 * 全局配置
 */
import { templateObject } from './entry'

import { APPS_PATH, __DEV__, NODE_ENV, pathTool, isWebpackDevServer } from './constants'
const srcRelative = pathTool.relative.bind(pathTool, APPS_PATH)
const htmlPaths = Object.keys(templateObject).map(n => srcRelative(templateObject[n]))

export default {
  htmlPaths: htmlPaths.filter(n => !/index\.(pug|html)/.test(n)),
  title: 'ts-react-boilerplate',
  apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
  favicon: '/assets/favicon.ico',
  isWebpackDevServer,
  __DEV__,
  NODE_ENV
}
