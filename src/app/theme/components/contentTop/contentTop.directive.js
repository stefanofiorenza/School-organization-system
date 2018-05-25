/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .directive('contentTop', contentTop);

  /** @ngInject */
  function contentTop($location, $state) {
    return {
      restrict: 'E',
      templateUrl: 'app/theme/components/contentTop/contentTop.html',
      // controller: 'PageContentTopCtrl',
      link: function ($scope) {
        $scope.$watch(function () {
          $scope.activePageTitle = $state.current.title;
          // if ($state.current.controller.indexOf('PageCtrl') == -1) {
          //   $scope.isShow = false;
          // } else if ($state.current.controller.indexOf('Home') != -1) {
          //   $scope.isShow = false;
          // } else {
          //   $scope.isShow = true;
          // }
        });
      }
    };
  }

})();