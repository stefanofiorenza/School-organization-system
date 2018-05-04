/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.form', ['ui.select', 'ngSanitize'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider,baSidebarServiceProvider) {
    $stateProvider
        .state('form', {
          url: '/form',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'FormPageCtrl',
          title: '用户管理',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 250,
          },
        })
        .state('form.students', {
          url: '/students',
          templateUrl: 'app/pages/form/students/students.html',
          // resolve:{
          //   deps:['$ocLazyLoad',
          //       function($ocLazyLoad){
          //         return $ocLazyLoad.load('students/students.list.js');
          //       }
          //     ]
          // },
          title: '学生用户管理',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 100,
          },
        })
        .state('form.teachers', {
          url: '/teachers',
          templateUrl: 'app/pages/form/teachers/teachers.html',
          title: '老师用户管理',
          sidebarMeta: {
            order: 100,
          },
        })
  }
})();


