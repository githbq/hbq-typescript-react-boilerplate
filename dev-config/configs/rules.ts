/**
 * 文件处理
 */

import { __DEV__ } from "./constants";
import { getCssRules } from "./rules.css";
import fileRules from "./rules.file";
import babelRules from "./rules.babel";

export const rules = [
  ...getCssRules({
    cssModules: true,
  }),
  ...fileRules,
  ...babelRules,
];
