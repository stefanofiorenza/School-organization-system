/**
 * @author a.demeshko
 * created on 3/1/16
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('toDate', toDate);

    /** @ngInject */
    function toDate() {
        return {
            //   时间的格式转换
            format: function (date,fmt) {
                var o = {
                    "M+": date.getMonth() + 1, //月份   
                    "d+": date.getDate(), //日   
                    "h+": date.getHours(), //小时   
                    "m+": date.getMinutes(), //分   
                    "s+": date.getSeconds(), //秒   
                    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
                    "S": date.getMilliseconds() //毫秒   
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            },
            // 时间戳转日期格式 //2014-06-18 10:33:24
            timestampToTime:function(timestamp){
                var Y,M,D,h,m,s;
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                Y = date.getFullYear() + '-';
                M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                D = date.getDate() + ' ';
                h = date.getHours() + ':';
                m = date.getMinutes() + ':';
                s = date.getSeconds();
                return new Date(Y+M+D+h+m+s);
            }

        }
    }

})();