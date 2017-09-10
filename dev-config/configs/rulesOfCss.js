/**
 * 因为css module设置比较复杂,单独分离出来
 */
let ExtractTextPlugin = require('extract-text-webpack-plugin')


/**
 * isAntCssModule 启用antdcss modules
 * false 是否分离样式文件
 */
module.exports = ({ lessLoaderVars, __DEV__, postCSSConfig }, isAntCssModule = true, extract = true) => {
    const localIdentName = '[name]__[local]___[hash:base64:5]'
    const styleLoader = { loader: 'style-loader', options: { sourceMap: __DEV__ } }
    const postCSSLoader = { loader: 'postcss-loader', query: postCSSConfig }
    const cssReg = /\.(css|less|styl)$/
    const cssLoader = {
        loader: 'css-loader',
        options: {
            importLoaders: 3,
            minimize: !__DEV__,
            //sourceMap: __DEV__
        }
    }
    const lessLoader = {
        loader: 'less-loader',
        options: {
            //sourceMap: __DEV__,
            modifyVars: lessLoaderVars
        }
    }
    const stylusLoader = {
        loader: 'stylus-loader',
        options: {
            options: {},
        }
    }
    if (!extract) {
        ExtractTextPlugin = {
            extract: ({ use }) => {
                return use
            }
        }
    }
    if (isAntCssModule) { //antd css模块化处理
        return [{
                test: cssReg,
                include: /node_modules/, //针对 node_modeuls里面的less文件
                use: ExtractTextPlugin.extract({
                    use: [
                        ...(extract ? [] : [styleLoader]),
                        cssLoader,
                        postCSSLoader,
                        {
                            ...lessLoader,
                            ... {
                                options: {
                                    //sourceMap: false
                                }
                            }
                        },
                        stylusLoader
                    ]
                })
            },
            {
                test: cssReg,
                exclude: /node_modules/, //针对 非 node_modeuls里面的css文件
                use: ExtractTextPlugin.extract({
                    use: [
                        ...(extract ? [] : [styleLoader]),
                        {
                            ...cssLoader,
                            ... {
                                options: {
                                    modules: true,
                                    localIdentName,
                                    minimize: !__DEV__,
                                    //sourceMap: __DEV__,
                                }
                            }
                        },
                        postCSSLoader,
                        {
                            ...lessLoader,
                            ... {
                                options: {
                                    //sourceMap: __DEV__,
                                    modifyVars: lessLoaderVars
                                }
                            }
                        },
                        stylusLoader
                    ]
                })
            }
        ]
    } else {
        ///////////////////////////////////////////////////一般处理
        return [{
            test: cssReg,
            use: ExtractTextPlugin.extract({
                fallback: styleLoader,
                use: [ //extract 时需要注释
                    ...(extract ? [] : [styleLoader]),
                    cssLoader,
                    postCSSLoader,
                    lessLoader,
                    stylusLoader
                ]
            })
        }]
    }
}
