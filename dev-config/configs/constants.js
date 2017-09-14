/**
 * 常量配置
 */
const pathTool = require('path')
//根路径
const ROOT_PATH = pathTool.resolve(__dirname, '..', '..')

const root = pathTool.join.bind(pathTool, ROOT_PATH);
//前端目录
const APP_PATH = root('src') // __dirname 中的src目录，以此类推
//多页面目录
const APPS_PATH = root('src', 'apps')
//构建生成目录
const BUILD_PATH = root('dist')
//资源URL前缀
const PUBLIC_PATH = ''
// 获取命令行NODE_ENV环境变量,默认为development
const NODE_ENV = process.env.NODE_ENV || 'development'
// 判断当前是否处于开发状态下
const __DEV__ = NODE_ENV === 'development'
//模板地址
const TEMPLATE_PATH = root('dev-config/index.template.html')
const TEMPLATE_PATH_PUG = root('dev-config/index.template.pug')

module.exports = { root, pathTool, APPS_PATH, TEMPLATE_PATH_PUG, TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ }
