/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    // 'BlurAdmin.pages.dashboard',
    // 'BlurAdmin.pages.ui',
    'BlurAdmin.pages.classTables',
    'BlurAdmin.pages.students',
    'BlurAdmin.pages.teachers',
    'BlurAdmin.pages.subjects',
    'BlurAdmin.pages.teaching',
    'BlurAdmin.pages.directory',
    'BlurAdmin.pages.class',
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/students');
  }

})();
