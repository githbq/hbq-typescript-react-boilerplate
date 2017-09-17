/**
 * 因为css module设置比较复杂,单独分离出来
 */
let ExtractTextPlugin = require('extract-text-webpack-plugin')


/**
 * cssModules 启用antdcss modules
 * false 是否分离样式文件
 */
module.exports = ({ __DEV__, cssModules = true, extract = true }) => {
  if (!extract) {
    ExtractTextPlugin = {
      extract: ({ use }) => {
        return use
      }
    }
  }
  const localIdentName = '[name]__[local]___[hash:base64:5]'
  const styleLoader = { loader: 'style-loader', options: { sourceMap: false } }
  const postCSSLoader = { loader: 'postcss-loader', options: { sourceMap: false } }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      minimize: !__DEV__,
      sourceMap: false
    }
  }

  const regMap = {
    less: {
      reg: /\.(css|less)$/,
      loader: {
        loader: 'less-loader',
        options: {
          sourceMap: false,
        }
      }
    },
    stylus: {
      reg: /\.styl$/,
      loader: {
        loader: 'stylus-loader',
        options: {
          options: {
            sourceMap: false,
          },
        }
      }
    }
  }

  let getReulsByType = (type) => {
    const { reg, loader } = regMap[type]
    return [{
      test: reg,
      include: /node_modules/, //针对 node_modeuls里面的less文件
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: [
          ...(extract ? [] : [styleLoader]),
          cssLoader,
          postCSSLoader,
          loader
        ]
      })
    },
    {
      test: reg,
      exclude: /node_modules/, //针对 非 node_modeuls里面的css文件
      use: ExtractTextPlugin.extract({
        fallback: styleLoader,
        use: [
          ...(extract ? [] : [styleLoader]),
          {
            ...cssLoader,
            ... {
              options: {
                modules: cssModules,
                localIdentName,
                minimize: !__DEV__,
              }
            }
          },
          postCSSLoader,
          loader
        ]
      })
    }]
  }
  return [
    ...getReulsByType('less'),
    ...getReulsByType('stylus')
  ]
}
