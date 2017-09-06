# webpack-react

## 启动命令

### 开发模式 启动程序

> npm start

### 生产模式 资源生成

> npm run build:prod

### 目录结构

```
├── dev-config
|  ├── configs
|  ├── index.template.html
|  ├── lite-server-config.ts
|  ├── readme.md
|  └── webpack.config.ts
├── docs
|  └── README.md
├── package.tson
├── README.md
├── src
|  ├── assets
|  ├── common
|  ├── components
|  ├── index.tsx
|  ├── routes
|  └── utils
└── yarn.lock
```

#### `react`开发帮助
1. 在less中使用import如果想使用别名路径可以使用~开头：
```
//style.less
@import '~@/common/main.less'
```
#### 更新纪录
1. 添加 `tslint` 任务
2. 添加 `tslint-loader`
  - 会自动格式化错误的代码风格
3. 添加 `stylelint-loader`
  - 会自动格式化错误的代码风格
4. 添加了自定义模板
  - 只需要在 `./src/entries/` 添加与 `xxx.tsx` 同文件名的 .html文件则自动采用此模板
  - 比如: `./src/entries/xx.tsx` 对应  `./src/entries/xx.html`
  - 如果文件名以 `_`开头则忽略掉对应的文件
