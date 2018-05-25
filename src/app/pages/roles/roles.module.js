/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.roles', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('roles', {
            url: '/roles',
            template : '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
            abstract: true,
            controller: 'RolesPageCtrl',
            title: '角色管理',
            sidebarMeta: {
              icon: 'ion-person-stalker',
              order: 7,
            },
          });
    }
  
  })();
  