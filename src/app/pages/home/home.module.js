/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.home', [])
      .config(routeConfig);
  
    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
      $stateProvider
          .state('home', {
            url: '/home',
            templateUrl: 'app/pages/home/home.html',
            controller: 'HomePageCtrl',
            title: '系统首页',
            sidebarMeta: {
              icon: 'ion-android-home',
              order: 1,
            },
          });
    }
  
  })();
  