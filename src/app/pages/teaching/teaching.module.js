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
            title: '教学管理',
            sidebarMeta: {
              icon: 'ion-ios-briefcase',
              order: 2,
            },
          }).state('teaching.teachingPlan', {
            url: '/teachingPlan',
            templateUrl: 'app/pages/teaching/teaching.html',
            controller: 'TeachingPlanPageCtrl',
            title: '教学计划管理',
            sidebarMeta: {
              order: 0,
            },
          }).state('teaching.teachingPlanEdit', {
            url: '/teachingPlanEdit',
            // 添加是1，修改是2
            params:{teaching_id:null,teaching_type:1},
            controller:'teachingPlanEdit',
            templateUrl: 'app/pages/teaching/teachingEdit.html',
            title: '添加/修改教学计划',


          }).state('teaching.classTables', {
            url: '/classTables',
            templateUrl: 'app/pages/teaching/classTables.html',
            controller: 'ClassTablesPageCtrl',
            title: '课程计划管理',
            sidebarMeta: {
              order: 1,
            },
          }).state('teaching.classTableEdit', {
            url: '/classTableEdit',
            // 添加是1，修改是2
            params:{classTable_id:null,classTable_type:1},
            controller:'classTableEdit',
            templateUrl: 'app/pages/teaching/classTableEdit.html',
            title: '添加/修改计划课程',
          });
          // }).state('teaching.teachingPlan', {
          //   url: '/teachingPlan',
          //   template:  '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          //   title: '授课计划管理',
          //   sidebarMeta: {
          //     order: 0,
          //   },
          // }).state('teaching.teachingPlan.teachingPlanList', {
          //     url: '/teachingPlanList',
          //     templateUrl:  'app/pages/teaching/teaching.html',
          //     controller: 'TeachingPageCtrl',
          //     title: '授课计划列表',
          //     sidebarMeta: {
          //       order: 1,
          //     },
          // }).state('teaching.teachingPlan.teachingPlanEdit', {
          //   url: '/teachingEdit',
          //   // 添加是1，修改是2
          //   params:{teaching_id:null,teaching_type:1},
          //   controller:'teachingPlanEdit',
          //   templateUrl: 'app/pages/teaching/teachingEdit.html',
          //   title: '添加/修改授课计划',
          //   sidebarMeta: {
          //     order: 2,
          //   },
          
    //   $urlRouterProvider.when('/users','/users/students');
    }
  
  })();
  