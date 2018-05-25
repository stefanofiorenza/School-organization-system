/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('users', {
          url: '/users',
          template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,         
          title: '用户管理',
          sidebarMeta: {
            icon: 'ion-android-contact',
            order: 3,
          },
        }).state('users.students', {
          url: '/students',
          controller: 'StudentsPageCtrl',
          templateUrl: 'app/pages/users/students.html',
          title: '学生用户管理',
          sidebarMeta: {
            order:1,
          },
        }).state('users.studentEdit', {
          url: '/studentEdit',
          // 添加是1，修改是2
          params:{student_id:null,student_type:0},
          controller:'studentEdit',
          templateUrl: 'app/pages/users/studentEdit.html',
          title: '添加/修改学生用户',

        }).state('users.teachers', {
          url: '/teachers',
          controller: 'TeachersPageCtrl',
          templateUrl: 'app/pages/users/teachers.html',
          title: '老师用户管理',
          sidebarMeta: {
            order: 2,
          },
        }).state('users.teacherEdit', {
          url: '/teacherEdit',
          // 添加是1，修改是2
          params:{teacher_id:null,teacher_type:1},
          controller:'teacherEdit',
          templateUrl: 'app/pages/users/teacherEdit.html',
          title: '添加/修改老师用户',
        });
        
  }

})();
  