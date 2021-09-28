import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { TEMPLATE_PATH, __DEV__ } from "./constants";
import { templateSuffix, regTemplate, entry } from "./entry";
import { resolveClientEnv } from "./dotenv";
const chunks = ["vendor", "common", ...(__DEV__ ? ["patch"] : [])];
//createHtmlPlugin
function createHtmlPlugin(name, isDev = false, template = null) {
  template = TEMPLATE_PATH;
  const data = {
    ...resolveClientEnv(true),
  };
  // 生成html文件
  return new HtmlWebpackPlugin({
    ...(!isDev
      ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
          },
          hash: true, // 引入js/css的时候加个hash, 防止cdn的缓存问题
        }
      : {}),
    filename: `${name}.html`,
    ...(template ? { template } : {}),
    inject: "body",
    chunks: [...chunks, name], //选定需要插入的chunk名,
    chunksSortMode: "auto",
    data,
  });
}

//通过entry上设计的入口配置，生成html插件数组
export const getHtmlPlugins = (isDev = false) => {
  //entry.all 同时包含 entry 以及 template
  return (
    Object.keys(entry.all)
      //排除掉模板
      .filter((key) => !regTemplate.test(key))
      .map((key) => {
        return createHtmlPlugin(key, isDev, entry.all[`${key}${templateSuffix}`]);
      })
  );
};
