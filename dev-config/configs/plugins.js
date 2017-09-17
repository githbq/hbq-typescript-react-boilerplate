/**
 * 插件配置
 */

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
//webpack-md5-hash不需要再使用了 https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/
// const WebpackMd5Hash = require('webpack-md5-hash')
const { postCSSConfig } = require('./utils')
const { NODE_ENV, __DEV__ } = require('./constants')
const devServer = require('./devServer')
const CompressionPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const { getHtmlPlugins } = require('./plugins.html')
// plugins
let plugins = [
  ...getHtmlPlugins(__DEV__),
  new FriendlyErrorsWebpackPlugin(),
  process.env.analysis ? new BundleAnalyzerPlugin() : () => { },
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    '__DEV__': JSON.stringify(__DEV__)
  }),
  new CopyWebpackPlugin([{
    from: 'src/assets',
    to: 'assets'
  }]),
  // new ExtractTextPlugin('style/[name].[contenthash:8].css'),
  new ExtractTextPlugin('css/[name].css'),
]
if (__DEV__) {
  plugins = [
    ...plugins,
    new webpack.HashedModuleIdsPlugin(),
    // Use NoErrorsPlugin for webpack 1.x 这个插件1.x版本以上不需要
    // new webpack.NoEmitOnErrorsPlugin(),
    //提取Loader定义到同一地方
    new webpack.LoaderOptionsPlugin({
      options: {
        context: '/',
        postcss: () => postCSSConfig,
        stylus: {
          default: {
            use: [

            ],
          },
        },
      }
    }),
  ]
} else {
  plugins = [
    ...plugins,
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          /node_modules/.test(module.resource)
        )
      }
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new WebpackMd5Hash(),
    new webpack.HashedModuleIdsPlugin(), //这个比 webpack.NamedModulesPlugin 更有用
    // new webpack.NamedModulesPlugin(),
    // 生成文件时加上注释
    new webpack.BannerPlugin('This file is created by hbq'),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
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
      options: {
        context: '/',
        postcss: () => postCSSConfig,
        stylus: {
          default: {
            use: [

            ],
          },
        },
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
  ]
}
module.exports = plugins
