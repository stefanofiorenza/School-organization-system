/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.system', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('system', {
            url: '/system',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'SystemPageCtrl',
            title: '系统管理',
            sidebarMeta: {
              icon: 'ion-android-desktop',
              order: 9,
            },
          });
    }
  
  })();
  