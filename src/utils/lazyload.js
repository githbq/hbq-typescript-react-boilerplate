"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * <Route path='dataTable' tableName='test' getComponent={lazyload(System.import('./component/users'))}></Route>
 */
exports.default = function (importor, name) {
    if (name === void 0) { name = 'default'; }
    return function (location, cb) {
        importor.then(function (module) {
            //如果是默认模块，则是 module.default
            cb(null, module[name]);
        })
            .catch(function (err) {
            console.error("\u52A8\u6001\u8DEF\u7531\u52A0\u8F7D\u5931\u8D25\uFF1A" + err);
        });
    };
};
//# sourceMappingURL=lazyload.js.map