/**
 * @author a.demeshko
 * created on 3/1/16
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .service('search', search);

    /** @ngInject */
    function search() {
        return {
            setSearch: function (search) {
                window.sessionStorage.setItem('searchDate', search.date);
                window.sessionStorage.setItem('searchName', search.name);
            },
            getSearch: function () {
                var search = {};
                search.date = window.sessionStorage.getItem('searchDate');
                search.name = window.sessionStorage.getItem('searchName');
                return search;
            }
        }
    }

})();