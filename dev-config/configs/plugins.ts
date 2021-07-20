/**
 * 插件配置
 */

import * as webpack from "webpack";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as CopyWebpackPlugin from "copy-webpack-plugin";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

import { CleanWebpackPlugin } from "clean-webpack-plugin";
import * as ScriptExtHtmlWebpackPlugin from "script-ext-html-webpack-plugin";

import { __DEV__, BUILD_PATH, pathTool, STATIC_PATH, ROOT_PATH } from "./constants";
import { getHtmlPlugins } from "./plugins.html";

import { resolveClientEnv } from "./dotenv";

// _plugins
let _plugins = [
  new ScriptExtHtmlWebpackPlugin({
    sync: /polyfills|vendor|common/,
    defaultAttribute: "async",
    preload: [/polyfills|vendor|index|common/],
    prefetch: [/chunk/],
  }),
  new CleanWebpackPlugin(),
  ...getHtmlPlugins(__DEV__),
  // new webpack.HashedModuleIdsPlugin(),
  process.env.analysis ? new BundleAnalyzerPlugin() : () => {},
  new webpack.DefinePlugin(resolveClientEnv(false)),
  // Extracts CSS into separate files
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
    chunkFilename: "[id].css",
  }),

  new CopyWebpackPlugin([
    {
      from: STATIC_PATH,
      to: BUILD_PATH,
      toType: "dir",
      ignore: pathTool.relative(ROOT_PATH, STATIC_PATH) + "/*.html",
    },
  ]),
];
if (__DEV__) {
  _plugins = [..._plugins];
} else {
  _plugins = [
    ..._plugins,
    // new WebpackMd5Hash(),
    // 生成文件时加上注释
    new webpack.BannerPlugin("This file is created by hbq"),
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
