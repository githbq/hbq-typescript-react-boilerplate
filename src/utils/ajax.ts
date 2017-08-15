/**
 * entry
 */
import axios from 'axios'
import { stringify } from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded charset=UTF-8'
axios.defaults.withCredentials = true
//axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Authorization')
const prefix = __DEV__ ? '__api__' : ''
// const prefix = '__api__'
const fetch = (url, options) => {
    const { method = 'get', data } = options
    switch (method.toLowerCase()) {
        case 'get':
            return axios.get(url, { params: data })
        case 'delete':
            return axios.delete(url, { data })
        case 'head':
            return axios.head(url, data)
        case 'post':
            return axios.post(url, stringify(data))
        case 'put':
            return axios.put(url, stringify(data))
        case 'patch':
            return axios.patch(url, data)
        default:
            return axios(options)
    }
}

function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res
    }
}

function handleData(res) {
    const data = res.data
    if (data && data.message && !data.status) {
        // message.error(data.message)
    }
    // else if(data && data.message && data.status) {
    //   message.success(data.msg)
    // }
    return data
}

function handleError(error) {
    const data = error.response.data
    if (data.errors) {
        // message.error(`${data.message}：${data.errors}`, 5)
    } else if (data.error) {
        // message.error(`${data.error}：${data.error_description}`, 5)
    } else {
        // message.error('未知错误！', 5)
    }
    return { success: false }
}
export default {
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
    request(url, options) {
        url = this.urlFilter(url)
        return fetch(url, options)
            .then(checkStatus)
            .then(handleData)
            .catch(handleError)
    },
    get(url, options) {
        return this.request(url, { ...options, method: 'get' })
    },
    post(url, options) {
        return this.request(url, { ...options, method: 'post' })
    },
    put(url, options) {
        return this.request(url, { ...options, method: 'put' })
    },
    deleted(url, options) {
        return this.request(url, { ...options, method: 'deleted' })
    }
}