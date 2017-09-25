import { TEMPLATE_PATH, PUBLIC_PATH, ROOT_PATH, APP_PATH, BUILD_PATH, NODE_ENV, __DEV__ } from './constants'
import { proxy } from './proxy'
/**
 * 开发服务配置
 */
// object { hot?, hotOnly?, lazy?, bonjour?, host?, allowedHosts?, filename?, publicPath?,
//   port?, socket?, watchOptions?, headers?, clientLogLevel?, overlay?, key?, cert?, ca?, pfx
//  ?, pfxPassphrase?, inline?, disableHostCheck?, public?, https?, contentBase?, watchContent
//  Base?, open?, useLocalIp?, openPage?, features?, compress?, proxy?, historyApiFallback?, s
//  taticOptions?, setup?, stats?, reporter?, noInfo?, quiet?, serverSideRender?, index?, log?
//  , warn? }
export const devServer = {
  useLocalIp: true,
  host: '0.0.0.0',
  openPage: 'index.html',
  overlay: true,
  hot: true,
  open: true,
  port: Math.floor(Math.random() * 1001) + 7000,
  contentBase: BUILD_PATH,
  publicPath: PUBLIC_PATH,
  inline: true,
  // clientLogLevel: 'warning', // none, error, warning or info (default).
  // HTML5 History API
  historyApiFallback: true,
  // watchOptions: {
  //     aggregateTimeout: 300, // rebuild 延时, wait so long for more changes
  //     ignored: /node_modules/,
  //     poll: 1000, // Check for changes every second
  // },
  quiet: true, // 让dev server处于静默的状态启动(控制台中不输出打包的信息)
  noInfo: false, // set to false to see a list of every file being bundled.
  headers: { 'X-Custom-Header': 'yes' },
  proxy
}
