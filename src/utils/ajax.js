"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * entry
 */
var axios_1 = require("axios");
var qs_1 = require("qs");
axios_1.default.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded charset=UTF-8';
axios_1.default.defaults.withCredentials = true;
//axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('Authorization')
var prefix = __DEV__ ? '__api__' : '';
// const prefix = '__api__'
var fetch = function (url, options) {
    var _a = options.method, method = _a === void 0 ? 'get' : _a, data = options.data;
    switch (method.toLowerCase()) {
        case 'get':
            return axios_1.default.get(url, { params: data });
        case 'delete':
            return axios_1.default.delete(url, { data: data });
        case 'head':
            return axios_1.default.head(url, data);
        case 'post':
            return axios_1.default.post(url, qs_1.stringify(data));
        case 'put':
            return axios_1.default.put(url, qs_1.stringify(data));
        case 'patch':
            return axios_1.default.patch(url, data);
        default:
            return axios_1.default(options);
    }
};
function checkStatus(res) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }
}
function handleData(res) {
    var data = res.data;
    if (data && data.message && !data.status) {
        // message.error(data.message)
    }
    // else if(data && data.message && data.status) {
    //   message.success(data.msg)
    // }
    return data;
}
function handleError(error) {
    var data = error.response.data;
    if (data.errors) {
        // message.error(`${data.message}：${data.errors}`, 5)
    }
    else if (data.error) {
        // message.error(`${data.error}：${data.error_description}`, 5)
    }
    else {
        // message.error('未知错误！', 5)
    }
    return { success: false };
}
exports.default = {
    trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    //url过滤 
    urlFilter: function (url) {
        url = this.trim(url);
        if (prefix) {
            if (url.indexOf('/') === 0) {
                //如果是绝对路径
                url = "/" + prefix + url;
            }
            else {
                url = prefix + "/" + url;
            }
        }
        return url;
    },
    request: function (url, options) {
        url = this.urlFilter(url);
        return fetch(url, options)
            .then(checkStatus)
            .then(handleData)
            .catch(handleError);
    },
    get: function (url, options) {
        return this.request(url, tslib_1.__assign({}, options, { method: 'get' }));
    },
    post: function (url, options) {
        return this.request(url, tslib_1.__assign({}, options, { method: 'post' }));
    },
    put: function (url, options) {
        return this.request(url, tslib_1.__assign({}, options, { method: 'put' }));
    },
    deleted: function (url, options) {
        return this.request(url, tslib_1.__assign({}, options, { method: 'deleted' }));
    }
};
//# sourceMappingURL=ajax.js.map