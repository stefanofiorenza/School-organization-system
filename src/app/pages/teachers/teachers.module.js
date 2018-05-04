/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.teachers', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('teachers', {
            url: '/teachers',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'TeachersPageCtrl',
            title: '教师用户管理',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            }, 
          }).state('teachers.teachers', {
            url: '/teachers',
            templateUrl: 'app/pages/teachers/teachers.html',
            title: '老师用户管理',
            sidebarMeta: {
              order: 100,
            },
          }).state('teachers.teacherEdit', {
            url: '/teacherEdit',
            // 添加是1，修改是2
            params:{teacher_id:null,teacher_type:1},
            controller:'teacherEdit',
            templateUrl: 'app/pages/teachers/teacherEdit.html',
            title: '添加/修改老师用户',
          });
    //   $urlRouterProvider.when('/users','/users/students');
    }
  
  })();
  