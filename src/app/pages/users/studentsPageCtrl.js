/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
    .controller('StudentsPageCtrl', StudentsPageCtrl);

  /** @ngInject */
  function StudentsPageCtrl($scope, $state, $http, $location, $filter, status, editableOptions, editableThemes) {
    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    if (!obj) {
      alert('请登录之后进行访问！');
      sessionStorage.setItem('thisLocation', $location.path());
      window.location.href = "/login.html";

    }
    var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
    var type = {
      // contentType: 'application/json',
      dataType: 'JSON'
    };
    var url = '/a/sys/user/';


    $scope.students = {};
    // 通过服务注册的status
    $scope.statuses = status.getStatus();

    $scope.isTeachersPassword = false;

    // $scope.smartTablePageSize = 10;

    $scope.initPage = function () {
      $http.get(url + 'getRoleName' + header)
        .success(function (data) {
          if (data.success == false) {
            alert('用户当前没有登录，请登录之后访问！');
            sessionStorage.setItem('thisLocation', $location.path());
            window.location.href = "/login.html";
          }
          $scope.students = data.body.loginUser;
        })
        .error(function (data) {
          alert(data.msg);
        })
    };

    $scope.initPage();
    // 学生列表与创建页面的跳转
    $scope.studentCreate = function () {
      $state.go('users.studentEdit', {
        student_type: 1
      });
    };

    // 跳到学生详情页面，需要带id
    $scope.studendEdit = function (id) {
      $state.go('users.studentEdit', {
        student_type: 2,
        student_id: id
      });
    }



    $scope.showStatus = function (user) {
      var selected = [];
      if (user.loginFlag) {
        selected = $filter('filter')($scope.statuses, {
          value: user.loginFlag
        });
      }
      return selected.length ? selected[0].text : 'Not set';
    };

  }

})();