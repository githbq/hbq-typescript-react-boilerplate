/**
 * 其他配置或工具
 */
import * as  autoprefixer from 'autoprefixer'
import * as px2rem from 'postcss-px2rem'

//使用postcss作为默认的CSS编译器
export const postCSSConfig = [
  // px2rem({ remUnit: 75 }),
  autoprefixer({
    browsers: [
      '> 5%'
    ]
  })
]
