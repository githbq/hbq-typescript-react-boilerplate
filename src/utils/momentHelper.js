"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 日期格式化库帮助
 */
var moment = require("moment");
var momentHelper = {
    moment: moment,
    formatType: {
        normal: 'YYYY-MM-DD HH:mm:ss',
        ymd: 'YYYY-MM-DD',
        ymdhm: 'YYYY-MM-DD HH:mm'
    },
    init: function () {
        moment.locale('zh-cn', {
            meridiem: function (hour, minute, isLowercase) {
                if (hour < 9) {
                    return '早上';
                }
                else if (hour < 11 && minute < 30) {
                    return '上午';
                }
                else if (hour < 13 && minute < 30) {
                    return '中午';
                }
                else if (hour < 18) {
                    return '下午';
                }
                else {
                    return '晚上';
                }
            }
        });
        return this;
    },
    getFormatType: function (type) {
        return (type && this.formatType[type]) || this.formatType.normal;
    },
    get: function (time, type) {
        return moment(time || new Date()).format(this.getFormatType(type));
    },
    format: function (time, formatString) {
        return moment(time || new Date()).format(formatString);
    }
};
exports.default = momentHelper.init();
//# sourceMappingURL=momentHelper.js.map