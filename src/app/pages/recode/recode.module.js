/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.recode', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('recode', {
            url: '/recode',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            title: '档案管理',
            sidebarMeta: {
              icon: 'ion-clipboard',
              order: 6,
            },
          }).state('recode.class', {
            url: '/class',
            templateUrl: 'app/pages/recode/class.html',
            controller: 'ClassPageCtrl',
            title: '班级档案',
            sidebarMeta: {
              order: 1,
            },
          }).state('recode.classEdit', {
            url: '/classEdit',
            // 添加是1，修改是2
            params:{class_id:null,class_type:1},
            controller:'classEdit',
            templateUrl: 'app/pages/recode/classEdit.html',
            title: '添加/修改班级档案',
          });
    }
  
  })();

  