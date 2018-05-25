// /**
//  * @author v.lugovsky
//  * created on 16.12.2015
//  */
// (function () {
//     'use strict';

//     angular.module('BlurAdmin.theme.components')
//         .controller('PageContentTopCtrl', PageContentTopCtrl);

//     /** @ngInject */
//     function PageContentTopCtrl($scope, $state, $http, $stateParams, search,$filter, $location, editableOptions, editableThemes) {
//         $scope.search = {};
//         // $scope.initPage = function () {
//         //     $scope.activePageTitle = $state.current.title;
//         // };
//         // $scope.initPage();
//         $scope.getSearch = function(){
//             $scope.search.date = $scope.search.date.toLocaleDateString();
//             search.setSearch($scope.search);
//         }
//     }
// })();