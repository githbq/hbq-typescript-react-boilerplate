/**
 * 定义全局声明
 */

// declare namespace myLib {
//     export function encodechar(data: any, opts?: any)
// }
//webpack开发时标志
declare var __DEV__: any
declare module '*.less' {
  const content: any
  export default content
}
declare module '*.styl' {
  const content: any
  export default content
}

interface SystemJS {
  import: (path?: string) => Promise<any>
}
// typescript code spliting 使用 import()无效,使用System.import()有效
//Usage: = await System.import(/* webpackChunkName: "qrcode" */ 'qrcode')
declare var System: SystemJS

