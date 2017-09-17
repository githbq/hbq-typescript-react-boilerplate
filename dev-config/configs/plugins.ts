/**
 * 插件配置
 */

import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as  CompressionPlugin from 'compression-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
//webpack-md5-hash不需要再使用了 https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/
// const WebpackMd5Hash = require('webpack-md5-hash')
import { postCSSConfig } from './utils'
import { NODE_ENV, __DEV__ } from './constants'
import { devServer } from './devServer'
import { getHtmlPlugins } from './plugins.html'

// _plugins
let _plugins = [
  ...getHtmlPlugins(__DEV__),
  new FriendlyErrorsWebpackPlugin(),
  process.env.analysis ? new BundleAnalyzerPlugin() : () => { },
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    '__DEV__': JSON.stringify(__DEV__)
  }),
  new CopyWebpackPlugin(
    [
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]
  ),
]
if (__DEV__) {
  _plugins = [
    ..._plugins,
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
  _plugins = [
    ..._plugins,
    // new ExtractTextPlugin('css/[name].[contenthash:8].css'),
    new ExtractTextPlugin('css/[name].css'),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          // module.resource &&
          // /\.js$/.test(module.resource) &&
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

export const plugins = _plugins
