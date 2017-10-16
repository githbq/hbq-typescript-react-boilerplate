/**
 * 其他配置或工具
 */
import * as  autoprefixer from 'autoprefixer'

//使用postcss作为默认的CSS编译器
export const postCSSConfig = [
  autoprefixer({
    browsers: [
      '> 5%'
    ]
  })
]
