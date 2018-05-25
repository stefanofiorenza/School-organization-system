/**
 * @author a.demeshko
 * created on 3/1/16
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('Http', Http);

    /** @ngInject */
    function Http($http, $httpParamSerializerJQLike) {
        return {
            POST: function (type, url, data) {
                return new Promise(function(resolve, reject){
                    $http({
                        method: type,
                        url: url,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: $httpParamSerializerJQLike(data)
                    })
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function (error) {
                        reject(error)
                    });
                })
            },
            GET:function(url){
                return new Promise(function(resolve,reject){
                    $http.get(url)
                    .success(function(response){
                        resolve(response);
                    })
                    .error(function(error){
                        reject(error);
                    })
                });
            }

        }
    }

})();