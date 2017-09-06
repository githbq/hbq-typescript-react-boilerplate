/**
 * 插件配置
 */

const webpack = require('webpack')
const _ = require('lodash')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const utils = require('./utils')
const globalConfig = require('./globalConfig')
const path = require('path')
const { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } = require('./constants')
const devServer = require('./devServer')
const chunks = ['vendor', 'common']
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const entry = require('./entry')

//模板的正则
const regTemplate = /-template$/
//模板的后缀
const templateSuffix = '-template'

let plugins = [
  process.env.analysis ? new BundleAnalyzerPlugin() : () => { },
  new webpack.optimize.ModuleConcatenationPlugin(),
  new WebpackMd5Hash(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.BannerPlugin('This file is created by hbq'), // 生成文件时加上注释
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    '__DEV__': JSON.stringify(__DEV__)
  }),
  // 抽离公共部分, 要了解CommonsChunkPlugin的原理, 首先要搞清楚chunk的概念
  // CommonsChunkPlugin做的其实就是把公共模块抽出来, 可以单独生成一个新的文件, 也可以附加到已有的chunk上
  // 同时还会加上webpack的runtime相关代码
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'common.js',
    // 这个函数决定哪些模块会被放到vender.min.js中
    minChunks: module => /node_modules/.test(module.resource)
  }),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' }
  ]),
  // new ExtractTextPlugin('style/[name].[contenthash:8].css'),
  new ExtractTextPlugin('style/[name].css'),

]

//createHtmlPlugin
function createHtmlPlugin(name, isDev = false, templateUrl = null) {
  // 生成html文件
  return new HtmlWebpackPlugin({
    ...(!isDev ? {
      minify: { removeComments: true, collapseWhitespace: true },
      hash: true, // 引入js/css的时候加个hash, 防止cdn的缓存问题
    } : {}),
    filename: `${name}.html`,
    template: templateUrl || TEMPLATE_PATH,
    inject: 'body',
    chunks: chunks.concat(name), //选定需要插入的chunk名,
    title: globalConfig.title,
    __DEV__: isDev,
    // HtmlWebpackPlugin自己有一个favicon属性, 但用起来有点问题, 所以自己重新搞个favIcon属性
    favIcon: globalConfig.favicon,
    chunksSortMode: 'dependency'
  })
}
//通过entry上设计的入口配置，生成html插件数组
function getHtmlPlugins(isDev = false) {
  //entry.all 同时包含 entry 以及 template
  return Object.keys(entry.all)
    //排除掉模板
    .filter(key => !regTemplate.test(key))
    .map(key => {
      return createHtmlPlugin(key, isDev, entry.all[`${key}${templateSuffix}`])
    })
}

if (__DEV__) {
  plugins = plugins.concat([
    ...getHtmlPlugins(__DEV__),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: utils.postCSSConfig
      }
    }),
    // new webpack.SourceMapDevToolPlugin(
    //     {}
    // ),
    //现在使用rules做sourcemap 此插件会导致变卡
    // new webpack.optimize.UglifyJsPlugin({
    //     sourceMap: true
    // })
  ])
} else {
  plugins = plugins.concat([
    // 生成html文件
    ...getHtmlPlugins(__DEV__),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0,
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    //提取Loader定义到同一地方
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        context: '/',
        postcss: utils.postCSSConfig
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
  ])
}
module.exports = plugins
