/**
 * webpack配置入口文件
 */
const configs = require('require-dir')('./configs')
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = configs.constants

//设置开发时源代码映射工具
const devTool = __DEV__ ? 'cheap-module-source-map' : 'source-map'

module.exports = {
    devtool: devTool,
    devServer: configs.devServer,
    entry: configs.entry,
    output: { // 输出的目录和文件名
        path: BUILD_PATH,
        filename: !__DEV__ ? '[name].bundle.min.js' : '[name].bundle.js'
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        enforceExtension: false,
        extensions: ['.ts', '.tsx', '.js', '.json', '.less'], // require的时候可以直接使用require('file')，不用require('file.js')
        alias: configs.alias
    },
    module: {
        //noParse 配置用来配置哪些脚本不需要webpack转译
        // noParse: /node_modules\/(react)/,
        rules: configs.rules
    },
    plugins: configs.plugins
}