/**
 * 定义全局声明
 */

// declare namespace myLib {
//     export function encodechar(data: any, opts?: any)
// }
//webpack开发时标志
declare var __DEV__: any;
declare module "*.less" {
  const content: any;
  export default content;
}

// 静态文件
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "*.json";
