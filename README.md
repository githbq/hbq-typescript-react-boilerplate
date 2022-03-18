# A nice `typescript+react` development framework by hbq
  - support  mutilple entry mode
  - webpack.config write by typescript with `.ts` files
  - React16 + ReactRouterV4 + webpack3.6.0
## 赶紧来体验 `webpack^5.43.0` + `react^17.0.2` + `react-routerV4` + `typescript2.5` 极速开发吧

## Install
```
git clone https://github.com/githbq/hbq-typescript-react-boilerplate.git
// or use iclone-cli
// first install `iclone-cli` in global
npm i -g iclone-cli
// then
iclone init -t ts-react -n [projectName]
```

## startup

### run in dev mode

> npm start

### build in production

> npm run build:prod

### catalog

```
├── LICENSE
├── README.md
├── build
|  ├── dev-config
|  └── src
├── dev-config
|  ├── configs
|  ├── index.template.html
|  ├── index.template.pug
|  ├── lite-server-config.json
|  ├── readme.md
|  └── webpack.config.ts
├── docs
|  └── README.md
├── package.json
├── src
|  ├── apps
|  ├── assets
|  ├── common
|  ├── components
|  ├── globals.d.ts
|  ├── index.tsx
|  ├── routes
|  ├── utils
|  └── vendors.ts
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

### `react` develop help
1. 在less中使用import如果想使用别名路径可以使用~开头：
```
//style.less
@import '~@/common/main.less'
```
### Updates
1. add `tslint` task
2. add `tslint-loader`
  - 会自动格式化错误的代码风格
3. add `stylelint-loader`
  - 会自动格式化错误的代码风格
4. add了自定义模板
  - 只需要在 `./src/apps/` add与 `xxx.tsx` 同文件名的 .html文件则自动采用此模板
  - 比如: `./src/apps/xx.tsx` 对应  `./src/apps/xx.html`
  - 如果文件名以 `_`开头则忽略掉对应的文件
5. add css modules
  ```
  //不加入css modules
  :global {
  }
  //css modules 用法
  import * as styles from './style.less'
  `<div className={styles['demo-route']}>`
  ```

6. 添加 `.pug` 模板 (比html模板更简洁高效)
7. 添加 `.styl` stylus 样式预处理器支持
8. `webpack-dev-server` 添加 `host: '0.0.0.0'` 配置局域网内可访问
9. 全新升级到 `react16` +  `react-router V4`
