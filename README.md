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
