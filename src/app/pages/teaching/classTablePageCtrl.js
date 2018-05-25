/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.teaching')
    .controller('ClassTablesPageCtrl', ClassTablesPageCtrl);

  /** @ngInject */
  function ClassTablesPageCtrl($scope, $state, $http, $location, $filter, Http,status, editableOptions, editableThemes) {

    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      if(!obj){
        alert('请登录之后进行访问！');
        sessionStorage.setItem('thisLocation',$location.path());
        window.location.href="/login.html";

      }
    var header = '?__cookie=true&__sid='+obj.JSESSIONID;

    var url = '/a/course/courseInfo/';

    $scope.classTables = {};

    $scope.statuses = status.getStatus();

    $scope.smartTablePageSize = 10;

    $scope.initPage = function () {

      // 初始化页面
      Http.GET(url + 'getAllTeachingPlan')
      .then(function(response){
        $scope.classTables = response.body.allTeachingPlan;
      })
      .catch(function(error){
        alert("ERROR:"+error);
      });
    };

    $scope.initPage();
    // 添加teaching_type为1，修改为2
    $scope.classTableCreate = function () {
      $state.go('teaching.classTableEdit', {
        classTable_type: 1
      });
    };

    $scope.classTableEdit = function (id) {
      $state.go('teaching.classTableEdit', {
        classTable_type: 2,
        classTable_id:id
      });
    };

    $scope.showStatus = function (user) {
      var selected = [];
      if (user.state) {
        selected = $filter('filter')($scope.statuses, {
          value: user.state
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };

  }

})();