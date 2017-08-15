/**
 * <Route path='dataTable' tableName='test' getComponent={lazyload(System.import('./component/users'))}></Route>
 */
export default (importor, name = 'default') => {
    return (location, cb) => {
        importor.then((module) => {
                //如果是默认模块，则是 module.default
                cb(null, module[name])
            })
            .catch((err) => {
                console.error(`动态路由加载失败：${err}`)
            })
    }
}