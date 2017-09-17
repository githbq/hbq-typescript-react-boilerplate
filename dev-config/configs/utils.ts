/**
 * 其他配置或工具
 */
import * as  autoprefixer from 'autoprefixer'
import * as flexibility from 'postcss-flexibility'

//使用postcss作为默认的CSS编译器
export const postCSSConfig = [
  autoprefixer({
    browsers: [
      'ie >= 9',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  }),
  flexibility
]
