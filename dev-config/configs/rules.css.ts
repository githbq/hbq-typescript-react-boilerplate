import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
/**
 * cssModules 启用antdcss modules
 * false 是否分离样式文件
 */
export const getCssRules = ({ cssModules = false }) => {
  const localIdentName = "[name]__[local]___[hash:base64:5]";
  const postCSSLoader = {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          "postcss-flexbugs-fixes",
          [
            "autoprefixer",
            {
              remove: false,
              flexbox: "no-2009",
              overrideBrowserslist: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"],
            },
          ],
        ],
      },
      // execute: false
    },
  };
  const cssLoader = {
    loader: "css-loader",
  };
  const lessRule = {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      cssLoader,
      postCSSLoader,
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
            math: "always", // 兼容 less3 配置  https://github.com/ant-design/ant-design/issues/23125#issuecomment-757678485
          },
        },
      },
    ],
  };
  const cssRule = { test: /.css$/, use: [cssLoader] };

  return [cssRule, lessRule];
};
