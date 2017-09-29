import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { root, pathTool, TEMPLATE_PATH, TEMPLATE_PATH_PUG, __DEV__ } from './constants'
import { templateSuffix, regTemplate, entry } from './entry'
import globalConfig from './globalConfig'
const chunks = [
  'vendor', 'common',
  ...(__DEV__ ? ['patch'] : []),
]
//createHtmlPlugin
function createHtmlPlugin(name, isDev = false, template = null) {
  //默认使用 ./index.template.pug 模板
  template = template || TEMPLATE_PATH_PUG
  const data = {
    ...globalConfig
  }
  // 生成html文件
  return new HtmlWebpackPlugin({
    ...(!isDev ? {
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      hash: true, // 引入js/css的时候加个hash, 防止cdn的缓存问题
    } : {}),
    filename: `${name}.html`,
    ...(template ? { template } : {}),
    inject: 'body',
    chunks: [...chunks, name], //选定需要插入的chunk名,
    // chunksSortMode: 'dependency',
    chunksSortMode(chunk1, chunk2) {
      const order1 = chunks.indexOf(chunk1.names[0])
      const order2 = chunks.indexOf(chunk2.names[0])
      if (order1 === -1) {
        return 1
      }
      if (order1 > order2) {
        return 1
      } else if (order1 === order2) {
        return 0
      } else {
        return -1
      }
    },
    data
  })
}

//通过entry上设计的入口配置，生成html插件数组
export const getHtmlPlugins = (isDev = false) => {
  //entry.all 同时包含 entry 以及 template
  return Object.keys(entry.all)
    //排除掉模板
    .filter(key => !regTemplate.test(key))
    .map(key => {
      return createHtmlPlugin(key, isDev, entry.all[`${key}${templateSuffix}`])
    })
}

