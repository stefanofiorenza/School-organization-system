/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.device', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('device', {
            url: '/device',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'DevicePageCtrl',
            title: '设备管理',
            sidebarMeta: {
              icon: 'ion-ios-gear',
              order: 4,
            },
          });
    }
  
  })();
  