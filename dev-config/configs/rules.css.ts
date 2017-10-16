/**
 * 因为css module设置比较复杂,单独分离出来
 */
import * as  ExtractTextPlugin from 'extract-text-webpack-plugin'
import { postCSSConfig } from './utils'
let _ExtractTextPlugin = ExtractTextPlugin

/**
 * cssModules 启用antdcss modules
 * false 是否分离样式文件
 */
export const getCssRules = ({ __DEV__, cssModules = true, extract = true }) => {
  if (!extract) {
    _ExtractTextPlugin = {
      extract: ({ use }) => {
        return use
      }
    }
  }
  const localIdentName = '[name]__[local]___[hash:base64:5]'
  const styleLoader = { loader: 'style-loader', options: { sourceMap: true } }
  const postCSSLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: postCSSConfig
    }
  }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: cssModules,
      localIdentName,
      minimize: !__DEV__,
      sourceMap: true
    }
  }

  const regMap = {
    less: {
      reg: /\.(css|less)$/,
      loader: {
        loader: 'less-loader',
        options: {
          sourceMap: true,
        }
      }
    },
    stylus: {
      reg: /\.styl$/,
      loader: {
        loader: 'stylus-loader',
        options: {
          options: {
            sourceMap: true,
          },
        }
      }
    }
  }

  let getReulsByType = (type) => {
    const { reg, loader } = regMap[type]
    const getCssLoaderInstance = () => {
      return {
        test: reg,
        use: _ExtractTextPlugin.extract({
          fallback: styleLoader,
          use: [
            ...(extract ? [] : [styleLoader]),
            cssLoader,
            postCSSLoader,
            loader
          ]
        })
      }
    }
    return [
      {
        ...getCssLoaderInstance(),
        include: /node_modules/, //针对 node_modeuls里面的less文件
      },
      {
        ...getCssLoaderInstance(),
        exclude: /node_modules/, //针对 非 node_modeuls里面的css文件
      }
    ]
  }
  return [
    ...getReulsByType('less'),
    ...getReulsByType('stylus')
  ]
}
