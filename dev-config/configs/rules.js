/**
 * 文件处理
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { __DEV__ } = require('./constants')
const lessLoaderVars = {}
const postCSSConfig = JSON.stringify(require('./utils').postCSSConfig);
let rules = [ // 定义各种loader
  {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'assets/generates/[hash].[ext]'
      }
    }]
  },
  {
    test: /\.tsx?$/,
    enforce: 'pre',
    loader: 'tslint-loader',
    options: {
      emitErrors: true,
      failOnHint: true,
      typeCheck: false,
      fix: true,
    }
  },
  {
    test: /\.less$/,
    enforce: 'pre',
    loader: 'stylefmt-loader',
    options: {
      config: '.stylelintrc.json'
    }
  },
  ...require('./rules.css')({
    __DEV__,
    lessLoaderVars,
    postCSSConfig
  }, true, !__DEV__),
  {
    test: /\.(png|jpg|gif|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash:8]'
    }
  },
]

if (__DEV__) {
  rules.push({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'react-hot-loader'
    },
    {
      loader: 'ts-loader',
      options: {
        jsx: true,
        happyPackMode: true,
        transpileOnly: true,
      }
    }
    ]
  })
} else {
  //生产环境
  rules.push({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'ts-loader',
      options: {
        jsx: true,
        happyPackMode: true,
        transpileOnly: true,
      }
    },
    {
      loader: 'strip-loader',
      options: {
        strip: ['logger.info', 'logger.debug', 'console.log',
          'console.debug'
        ]
      }
    }
    ]
  })
}
module.exports = rules
