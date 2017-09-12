/**
 * 全局配置
 */
function isWebpackDevServer() {
  return process.argv[1] && !!(/webpack-dev-server/.exec(process.argv[1]))
}
module.exports = {
  title: 'react-boilerplate',
  apiUrl: `http://localhost:3604`, //如果配了这个  就会走后端的反向代理
  favicon: 'assets/favicon.ico',
  isWebpackDevServer: isWebpackDevServer()
}
