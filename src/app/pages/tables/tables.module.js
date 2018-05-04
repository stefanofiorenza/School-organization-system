/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tables', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tables', {
          url: '/tables',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'TablesPageCtrl',
          title: '用户管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        }).state('tables.students', {
          url: '/students',
          templateUrl: 'app/pages/tables/students/students.html',
          title: '学生用户管理',
          sidebarMeta: {
            order: 0,
          },
        }).state('tables.studentsCreate', {
          url: '/studentCreate',
          templateUrl: 'app/pages/tables/students/studentsCreate.html',
          title: '添加学生用户',
          
        }).state('tables.teachers', {
          url: '/teachers',
          templateUrl: 'app/pages/tables/teachers/teachers.html',
          title: '老师用户管理',
          sidebarMeta: {
            order: 100,
          },
        });
    $urlRouterProvider.when('/tables','/tables/students');
  }

})();
