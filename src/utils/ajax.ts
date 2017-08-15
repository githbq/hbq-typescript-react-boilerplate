import fetch from 'isomorphic-fetch'
const prefix = __DEV__ ? '__api__' : ''
//fetch api简单封装 自动加前缀 去掉第一个/
//methods:GET, POST, PUT, DELETE, HEAD
export default {
    fetch,
    //总请求方法
    request(url, options) {
        let newUrl = this.urlFilter(url)
        let defaultOptions = { credentials: 'include' }
        options = {...defaultOptions, ...options }
        return fetch(newUrl, options)
            .then((response) => {
                options.success && options.success(response)
                if (response.ok) {
                    return response.json()
                } else {
                    let errorData = { status: response.status, message: response.statusText }
                    console.log('requestError:', errorData)
                    return errorData
                }
            })
            .then((json) => {
                console.log(url, json)
                return json
            })
    },
    //get请求
    get(url, query, options) {
        let newUrl = this.getQueryString(url, query)
        return this.request(newUrl, { method: 'GET', ...options })
    },
    //form请求
    form(url, formDom, options) {
        return this.request(url, {
            method: 'POST',
            body: new FormData(formDom),
            ...options
        })
    },
    //更新请求 post传参
    put(url, data, options) {
        return this.post(url, data, {
            method: 'PUT',
            ...options
        })
    },
    //删除请求  get请求传参
    delete(url, query) {
        let newUrl = this.getQueryString(url, query)
        return this.request(newUrl, { method: 'DELETE' })
    },
    //post 请求
    post(url, data, options) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            ...options
        })
    },
    trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    //url过滤 
    urlFilter(url) {
        url = this.trim(url)
        if (prefix) {
            if (url.indexOf('/') === 0) {
                //如果是绝对路径
                url = `/${prefix}` + url
            } else {
                url = `${prefix}/` + url
            }
        }

        return url
    },
    //将对象数据组装成URL get请求串
    getQueryString(url, params) {
        params = params || {}
        let queryString = Object
            .keys(params)
            .map(k => {
                if (Array.isArray(params[k])) {
                    return params[k]
                        .map(val => `${encodeURIComponent(k)}[]=${encodeURIComponent(val)}`)
                        .join('&')
                }
                return `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
            })
            .join('&')
        if (url) { //如果提供url则直接返回拼接好的URL 否则返回参数字符串
            if (url.indexOf('?') > 0) { //已经有参数了
                url += `&${queryString}`
            } else if (queryString) {
                url += `?${queryString}`
            }
            return url
        }
        return queryString
    }
}