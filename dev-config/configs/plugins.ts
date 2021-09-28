/**
 * 插件配置
 */

import * as webpack from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { CleanWebpackPlugin } from "clean-webpack-plugin";

import { __DEV__, BUILD_PATH, pathTool, STATIC_PATH, ROOT_PATH } from "./constants";
import { getHtmlPlugins } from "./plugins.html";

import { resolveClientEnv } from "./dotenv";

// _plugins
let _plugins = [
  new CleanWebpackPlugin(),
  ...getHtmlPlugins(__DEV__),
  process.env.analysis ? new BundleAnalyzerPlugin() : () => {},
  new webpack.DefinePlugin(resolveClientEnv(false)),
  // Extracts CSS into separate files
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
    chunkFilename: "[id].css",
  }),

  new CopyWebpackPlugin({
    patterns: [
      {
        from: STATIC_PATH,
        to: BUILD_PATH,
        globOptions: {
          ignore: [pathTool.relative(ROOT_PATH, STATIC_PATH) + "/*.html"],
        },
      },
    ],
  }),
];
if (__DEV__) {
  _plugins = [..._plugins];
} else {
  _plugins = [
    ..._plugins,
    // new WebpackMd5Hash(),
    // new CompressionPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0,
    // }),
  ];
}

export const plugins = _plugins;
