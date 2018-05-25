/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.resource', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('resource', {
            url: '/resource',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: '资源管理',
            sidebarMeta: {
              icon: 'ion-filing',
              order: 5,
            },
          }).state('resource.directory', {
            url: '/directory',
            templateUrl: 'app/pages/resource/directory.html',
            controller: 'DirectoryPageCtrl',
            title: '课程目录管理',
            sidebarMeta: {
              order: 0,
            },
          }).state('resource.resourceEdit', {
            url: '/resourceEdit',
            // 添加是1，修改是2
            params:{course_id:null,course_type:1,directory_id:null},
            controller:'resourceEdit',
            templateUrl: 'app/pages/resource/resourceEdit.html',
            title: '添加/修改课程',
          });
    }
  
  })();
  