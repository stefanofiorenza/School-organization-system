/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.directory', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('directory', {
            url: '/directory',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'DirectoryPageCtrl',
            title: '课程目录管理',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            },
          }).state('directory.directory', {
            url: '/directory',
            templateUrl: 'app/pages/directory/directory.html',
            title: '课程目录管理',
            sidebarMeta: {
              order: 0,
            },
          }).state('directory.directoryEdit', {
            url: '/directoryEdit',
            // 添加是1，修改是2
            params:{directory_id:null,directory_type:1},
            controller:'directoryEdit',
            templateUrl: 'app/pages/directory/directoryEdit.html',
            title: '添加/修改课程目录',
          });
    }
  
  })();
  