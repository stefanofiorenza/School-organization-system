/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.subjects', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('subjects', {
            url: '/subjects',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'SubjectsPageCtrl',
            title: '课程管理',
            sidebarMeta: {
              icon: 'ion-grid',
              order: 300,
            },
          }).state('subjects.subjectsList', {
            url: '/subjectsList',
            templateUrl: 'app/pages/subjects/subjectsList.html',
            title: '查看课程',
            sidebarMeta: {
              order: 0,
            },            
          }).state('subjects.subjectsCreate', {
            url: '/subjectsCreate',
            templateUrl: 'app/pages/subjects/subjectsCreate.html',
            title: '创建课程',
          }).state('subjects.subjectEdit', {
            url: '/subjectEdit',
            templateUrl: 'app/pages/subjects/subjectEdit.html',
            title: '修改课程',
          });
      // $urlRouterProvider.when('/subjects','/users/students');
    }
  
  })();
  