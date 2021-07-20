/**
 * webpack配置入口文件
 */
import * as webpack from "webpack";
import * as path from "path";
import {
  BUILD_PATH,
  __DEV__,
  devServer,
  entry,
  alias,
  rules,
  plugins,
  performance,
  optimization,
  PUBLIC_PATH,
  externals,
} from "./configs";

//设置开发时源代码映射
const devtool = __DEV__ ? "source-map" : false;
const jsPrefixPath = "js";
// const webpackConfig: webpack.Configuration = {
const webpackConfig = {
  mode: __DEV__ ? "development" : "production",
  devtool,
  devServer,
  entry: entry.apps,
  output: {
    publicPath: PUBLIC_PATH,
    // 输出的目录和文件名
    path: BUILD_PATH,
    filename: `${jsPrefixPath}/[name]${!__DEV__ ? ".min" : ""}.js`,
    chunkFilename: `${jsPrefixPath}/[name].chunk${!__DEV__ ? ".min" : ""}.js`,
    sourceMapFilename: "maps/[file].map",
  },
  resolve: {
    modules: ["node_modules"],
    enforceExtension: false,
    extensions: [".tsx", ".ts", ".mjs", ".js", ".json", ".less"], // require的时候可以直接使用require('file')，不用require('file.js')
    alias,
  },
  module: {
    //noParse 配置用来配置哪些脚本不需要webpack转译
    // noParse: /node_modules\/(react)/,
    rules, // 定义各种loader
  },
  plugins,
  performance,
  optimization,
  externals,
};

export default webpackConfig;
