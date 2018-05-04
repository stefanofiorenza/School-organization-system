/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.students', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('students', {
          url: '/students',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          controller: 'StudentsPageCtrl',
          title: '学生用户管理',
          sidebarMeta: {
            icon: 'ion-grid',
            order: 300,
          },
        }).state('students.students', {
          url: '/students',
          templateUrl: 'app/pages/students/students.html',
          title: '学生用户管理',
          sidebarMeta: {
            order: 0,
          },
        }).state('students.studentEdit', {
          url: '/studentEdit',
          // 添加是1，修改是2
          params:{student_id:null,student_type:0},
          controller:'studentEdit',
          templateUrl: 'app/pages/students/studentEdit.html',
          title: '添加/修改学生用户',
        });
        $urlRouterProvider.when('/students','/students/students');
  }

})();
  