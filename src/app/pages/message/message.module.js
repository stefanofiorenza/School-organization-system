/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.message', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('message', {
            url: '/message',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'MessagePageCtrl',
            title: '信息管理',
            sidebarMeta: {
              icon: 'ion-chatbox-working',
              order: 8,
            },
          });
    }
  
  })();
  