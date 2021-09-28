import { __DEV__ } from "./constants";
export default [
  {
    test: /\.tsx?$/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          [
            "@babel/preset-typescript",
            {
              isTSX: true,
              allExtensions: true,
            },
          ],
          [
            "@babel/preset-env",
            {
              useBuiltIns: "usage",
              targets: {
                chrome: 61,
                android: 8,
                safari: 11,
              },
              corejs: 3,
              loose: true,
            },
          ],
          "@babel/preset-react",
        ],
        plugins: [
          [
            "react-hot-loader/babel",
            {
              safetyNet: false,
            },
          ],
          [
            "@babel/plugin-transform-typescript",
            { allowNamespaces: true, allowDeclareFields: true, onlyRemoveTypeImports: true },
          ],
          // 按需引入 antd 和对应的样式
          ["import", { libraryName: "antd", style: true }, "antd"],
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-proposal-object-rest-spread",
          ["@babel/plugin-syntax-decorators", { legacy: true }],
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties", { loose: true }],
          ["@babel/plugin-proposal-private-methods", { loose: true }],
        ],
        cacheDirectory: __DEV__,
        //   cacheCompression: false
      },
    },
  },
];
