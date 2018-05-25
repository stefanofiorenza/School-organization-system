/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
    .controller('TeachersPageCtrl', TeachersPageCtrl);

  /** @ngInject */
  function TeachersPageCtrl($scope, $state, $http, $location, $filter, status, editableOptions, editableThemes) {
    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    if (!obj) {
      alert('请登录之后进行访问！');
      sessionStorage.setItem('thisLocation', $location.path());
      window.location.href = "/login.html";

    }
    var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
    var type = {
      contentType: 'application/json',
      dataType: 'JSON'
    };
    var url = '/a/sys/user/';



    $scope.teachers = {};

    // 通过服务注册的status
    $scope.statuses = status.getStatus();

    $scope.smartTablePageSize = 10;

    $scope.teacherCreate = function () {
      $state.go('users.teacherEdit', {
        teacher_type: 1
      });
    };

    // 跳到老师详情页面，需要带id
    $scope.teacherEdit = function (id) {
      $state.go('users.teacherEdit', {
        teacher_id: id,
        teacher_type: 2
      });
    }

    $scope.initPage = function () {
      $http.get(url + 'getRoleNameTeacher' + header)
        .success(function (data) {
          if (data.success == false) {
            alert('用户当前没有登录，请登录之后访问！');
            sessionStorage.setItem('thisLocation', $location.path());
            window.location.href = "/login.html";
          }
          $scope.teachers = data.body.loginUser;
        })
        .error(function (data) {
          alert(data.msg);
        })
    };

    $scope.initPage();

    $scope.showStatus = function (user) {
      var selected = [];
      if (user.loginFlag) {
        selected = $filter('filter')($scope.statuses, {
          value: user.loginFlag
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };


  };

})();