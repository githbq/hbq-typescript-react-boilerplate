/**
 * 文件处理
 */
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import { __DEV__, APP_PATH } from './constants'
import { getCssRules } from './rules.css'

let _rules = [ // 定义各种loader
  // {
  //   enforce: 'pre',
  //   test: /\.js$/,
  //   loader: 'source-map-loader'
  // },
  {
    enforce: 'pre',
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    include: APP_PATH,
    use: [
      {
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
          failOnHint: true,
          typeCheck: false,
          fix: false,
        }
      }
    ]
  },
  {
    test: /\.pug$/,
    loader: 'pug-loader',
    options: {
      pretty: true
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
  ...getCssRules({
    __DEV__,
    cssModules: true,
    extract: !__DEV__
  }),
  //files
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'images/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'media/[name].[hash:7].[ext]'
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]

if (__DEV__) {
  _rules.push({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    include: APP_PATH,
    use: [
      {
        loader: 'react-hot-loader/webpack'
      },
      // {
      //   loader: 'ts-loader',
      //   options: {
      //     jsx: true,
      //     happyPackMode: true,
      //     transpileOnly: true,
      //   }
      // }
      {
        loader: 'awesome-typescript-loader',
        options: {
        }
      }
    ]
  })
} else {
  //生产环境
  _rules.push({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    include: APP_PATH,
    use: [
      // {
      //   loader: 'ts-loader',
      //   options: {
      //     jsx: true,
      //     happyPackMode: true,
      //     transpileOnly: true,
      //   }
      // },
      {
        loader: 'awesome-typescript-loader',
        options: {
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

export const rules = _rules
