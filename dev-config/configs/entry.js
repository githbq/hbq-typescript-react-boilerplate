/**
 * 入口配置
 */
const pathTool = require('path')
const color = require('cli-color')
const { ROOT_PATH, APP_PATH } = require('./constants')

const globby = require('globby')
const basePath = './src/entries/**'
const entries = globby.sync([`${basePath}/*.tsx`, `!${basePath}/_*.tsx`, `!${basePath}/*.test.tsx`], { cwd: ROOT_PATH })
const ext = '.tsx'
const entryObject = {}
entries.forEach(n => {
  let key = pathTool.relative(`${APP_PATH}/entries`, n)
  key = '/' + key
  key = key.replace(/^(\.|\\|\/)*/, '').replace(ext, '')
  entryObject[key] = n.replace(ext, '')
})
console.log('entryObject', color.green(JSON.stringify(entryObject)))
module.exports = {
  index: './src/index',
  ...entryObject
}
