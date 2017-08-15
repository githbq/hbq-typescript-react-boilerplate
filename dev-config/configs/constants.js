 /**
  * 常量配置
  */
 const pathTool = require('path')
 //根路径
 const ROOT_PATH = pathTool.resolve(__dirname, '..', '..')
//前端目录
 const APP_PATH = pathTool.join(ROOT_PATH, 'src') // __dirname 中的src目录，以此类推
 //构建生成目录
 const BUILD_PATH = pathTool.join(ROOT_PATH, 'dist')
 //资源URL前缀
 const PUBLIC_PATH = ''
 // 获取命令行NODE_ENV环境变量,默认为development
 const NODE_ENV = process.env.NODE_ENV || 'development'
 // 判断当前是否处于开发状态下
 const __DEV__ = NODE_ENV === 'development'
 //模板地址
 const TEMPLATE_PATH = pathTool.join(ROOT_PATH, './dev-config/index.template.html')  

 module.exports = { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ }