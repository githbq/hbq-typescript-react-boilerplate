/**
 * 入口配置
 */
const pathTool = require('path')
const color = require('cli-color')
const { ROOT_PATH, APP_PATH } = require('./constants')

const globby = require('globby')
const basePath = './src/apps/**'
const apps = globby.sync(
  [
    `${basePath}/*.tsx`,
    `${basePath}/*.html`,
    `!${basePath}/_*.*`,
    `!${basePath}/*.test.*`,
    `!${basePath}/components/**/*`,
    `!${basePath}/routes/**/*`,
    `!${basePath}/common/**/*`,
    `!${basePath}/assets/**/*`,
    `!${basePath}/data/**/*`
  ],
  { cwd: ROOT_PATH }
)

const entryObject = {}
const templateObject = {}

const regExt = /\.\w*$/
//模板的后缀
const templateSuffix = '-template'


apps.forEach(n => {
  let key = pathTool.relative(`${APP_PATH}/apps`, n)
  key = '/' + key
  key = key.replace(/^(\.|\\|\/)*/, '').replace(regExt, '')
  if (/\.html$/.test(n)) {
    //如果是html文件 则以-template结尾
    key += templateSuffix
    templateObject[key] = n
    return
  }
  entryObject[key] = n.replace(regExt, '')
})
console.log('entryObject', color.green(JSON.stringify(entryObject)))
module.exports = {
  //只包含入口tsx
  apps: {
    index: './src/index',
    ...entryObject
  },
  //包含入口tsx  以及 template
  all: {
    index: './src/index',
    ...entryObject,
    ...templateObject
  }
}
