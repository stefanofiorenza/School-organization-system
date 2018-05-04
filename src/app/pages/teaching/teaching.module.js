/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.teaching', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('teaching', {
            url: '/teaching',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'TeachingPageCtrl',
            title: '教学计划管理',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            },
          }).state('teaching.teaching', {
            url: '/teaching',
            templateUrl: 'app/pages/teaching/teaching.html',
            title: '授课计划管理',
            sidebarMeta: {
              order: 0,
            },
          }).state('teaching.teachingEdit', {
            url: '/teachingEdit',
            // 添加是1，修改是2
            params:{teaching_id:null,teaching_type:1},
            controller:'teachingEdit',
            templateUrl: 'app/pages/teaching/teachingEdit.html',
            title: '添加/修改授课计划',
          // }).state('teaching.teachingEdit', {
          //   url: '/teachingEdit',
          //   params:{teaching_id:null},
          //   controller:'studentEdit',
          //   templateUrl: 'app/pages/teaching/teachingEdit.html',
          //   title: '修改授课计划',
          });
    //   $urlRouterProvider.when('/users','/users/students');
    }
  
  })();
  