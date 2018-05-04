/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.class', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('class', {
            url: '/class',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'ClassPageCtrl',
            title: '班级管理',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            },
          }).state('class.class', {
            url: '/class',
            templateUrl: 'app/pages/class/class.html',
            title: '班级管理',
            sidebarMeta: {
              order: 0,
            },
          }).state('class.classEdit', {
            url: '/classEdit',
            // 添加是1，修改是2
            params:{class_id:null,class_type:1},
            controller:'classEdit',
            templateUrl: 'app/pages/class/classEdit.html',
            title: '添加/修改班级',
          });
    }
  
  })();
  