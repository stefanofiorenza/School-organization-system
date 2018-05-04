/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.classTables', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('classTables', {
            url: '/classTables',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'ClassTablesPageCtrl',
            title: '课程表管理',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            },
          }).state('classTables.classTables', {
            url: '/classTables',
            templateUrl: 'app/pages/classTables/classTables.html',
            title: '课程表管理',
            sidebarMeta: {
              order: 0,
            },
          }).state('classTables.classTableEdit', {
            url: '/classTableEdit',
            // 添加是1，修改是2
            params:{classTable_id:null,classTable_type:1},
            controller:'classTableEdit',
            templateUrl: 'app/pages/classTables/classTableEdit.html',
            title: '添加/修改课程表',
          });
    }
  
  })();
  