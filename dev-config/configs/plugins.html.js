const HtmlWebpackPlugin = require('html-webpack-plugin')
const { root, pathTool, TEMPLATE_PATH, TEMPLATE_PATH_PUG } = require('./constants')
const { templateSuffix, regTemplate, ...entry } = require('./entry')
const globalConfig = require('./globalConfig')
const chunks = ['vendor', 'common']
const pug = require('../templateCompilers/pug')
//createHtmlPlugin
function createHtmlPlugin(name, isDev = false, templateUrl = null) {
  templateUrl = templateUrl || TEMPLATE_PATH_PUG
  const data = {
    ...globalConfig
  }
  let templateContent = undefined
  if (templateUrl && /.pug$/.test(templateUrl)) {
    templateUrl = pathTool.isAbsolute(templateUrl) ? templateUrl : root(templateUrl)
    templateContent = pug.compile(templateUrl, data)
    //如果有templateContent 则不能有templateUrl 会有冲突
    templateUrl = null
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
    ...(templateUrl ?
      {
        template: templateUrl
      }
      : {}
    ),
    templateContent,
    inject: 'body',
    chunks: chunks.concat(name), //选定需要插入的chunk名,
    chunksSortMode: 'dependency',
    data
  })
}
module.exports = {
  //通过entry上设计的入口配置，生成html插件数组
  getHtmlPlugins(isDev = false) {
    //entry.all 同时包含 entry 以及 template
    return Object.keys(entry.all)
      //排除掉模板
      .filter(key => !regTemplate.test(key))
      .map(key => {
        return createHtmlPlugin(key, isDev, entry.all[`${key}${templateSuffix}`])
      })
  }
}
