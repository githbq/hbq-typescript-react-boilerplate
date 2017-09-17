/**
 * 常量配置
 */
export const pathTool = require('path')
//根路径
export const ROOT_PATH = pathTool.resolve(__dirname, '..', '..')

export const root = pathTool.join.bind(pathTool, ROOT_PATH)
//前端目录
export const APP_PATH = root('src') // __dirname 中的src目录，以此类推
//多页面目录
export const APPS_PATH = root('src', 'apps')
//构建生成目录
export const BUILD_PATH = root('dist')
//资源URL前缀
export const PUBLIC_PATH = ''
// 获取命令行NODE_ENV环境变量,默认为development
export const NODE_ENV = process.env.NODE_ENV || 'development'
// 判断当前是否处于开发状态下
export const __DEV__ = NODE_ENV === 'development'
//模板地址
export const TEMPLATE_PATH = root('dev-config/index.template.html')
export const TEMPLATE_PATH_PUG = root('dev-config/index.template.pug')
export const isWebpackDevServer = process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
