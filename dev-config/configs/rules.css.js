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
  const styleLoader = { loader: 'style-loader', options: { sourceMap: true } }
  const postCSSLoader = { loader: 'postcss-loader', options: { sourceMap: true } }
  const cssLoader = {
    loader: 'css-loader',
    options: {
      importLoaders: 3,
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
        use: ExtractTextPlugin.extract({
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
