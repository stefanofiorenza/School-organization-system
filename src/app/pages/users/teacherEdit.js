/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
    .controller('teacherEdit', teacherEdit);

  /** @ngInject */
  function teacherEdit($scope, $state, $http, $stateParams, Http, $filter, editableOptions, editableThemes) {
    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
    var url = '/a/sys/user/';

    // 当前记录的ID
    var teacher_id = $stateParams.teacher_id;
    // 判断1 ：添加 2：修改
    var teacher_type = $stateParams.teacher_type;

    $scope.isShow = false;

    $scope.offices = {};

    $scope.isTeachersPassword = false;

    $scope.$watch('$viewContentLoaded', function () {
      $scope.initPage();
    });

    // 老师两个输入密码校验
    $scope.teacherValite = function () {
      if ($scope.teacher.password == $scope.teacher.againPassword) {
        $scope.isTeachersPassword = false;
      } else {
        $scope.isTeachersPassword = true;
      }
    };
    // 获取所有调研组
    $scope.getOffices = function () {
      Http.GET('/a/sys/office/showOfficeList' + header)
        .then(function (response) {
          $scope.offices = response.body.office;
          $scope.getTitles();
        }).catch(function (error) {
          alert("error:" + error);
        })
    };
    // 获取所有职称
    $scope.getTitles = function () {
      Http.GET(url + 'getTitleId' + header)
        .then(function (response) {
          $scope.titles = response.body.title;
          if (teacher_type == 2) {
            $scope.getTeacher();
          }
        }).catch(function (error) {
          alert("error:" + error);
        })
    };
    // 选择调研姐
    $scope.setOffice = function (id) {
      var keepGoing = true;
      angular.forEach($scope.offices, function (data) {
        if (keepGoing === true) {
          if (data.id == id) {
            $scope.office = data;
          }
        }
      })
    };
    // 选择职称
    $scope.setTitle = function (id) {
      var keepGoing = true;
      angular.forEach($scope.titles, function (data) {
        if (keepGoing === true) {
          if (data.titleId == id) {
            $scope.title = data;
          }
        }
      })
    };

    // 教师相关信息
    $scope.getTeacher = function () {
      var isSuccess = Http.GET(url + '/getUserId' + header + '&id=' + teacher_id);
      isSuccess.then(function (text) {
        $scope.teacher = text.body.loginUser;
        $scope.setOffice($scope.teacher.officeId);
        $scope.setTitle($scope.teacher.titleId);
      }).catch(function (status) {
        alert('ERROR:' + status);
      })
    };

    $scope.initPage = function () {
      $scope.getOffices();
      if (teacher_type == 1) {
        $scope.teacher = {};
        $scope.update = '添加';
      } else {
        // 修改时需要加id    
        $scope.isShow = true;
        $scope.update = '修改';
      }
    };

    // $scope.initPage();
    //   保存
    $scope.saveTeacher = function () {
      var data = {};
      data.teacher = angular.extend({}, $scope.teacher, {
        officeId: $scope.office.id,
        titleId: $scope.title.titleId
      });
      if (teacher_type == 1) {
        // 添加保存时
        var isSuccess = Http.POST('POST', url + 'saveTeacher' + header, data.teacher);

        isSuccess.then(function (text) {
          if (text.success == true) {
            alert("添加老师成功！");
            $scope.teacher = {};
          } else {
            alert(text.body.redirectAttributes);
          }
        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      } else {
        // 修改保存时
        data.teacher.id = teacher_id;
        var isSuccess = Http.POST('POST', url + 'updateUser' + header, data.teacher);

        isSuccess.then(function (text) {
          alert("修改老师成功！");
        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      }
    };
    //   取消  
    $scope.cancelTeacherEdit = function () {
      $state.go('users.teachers');
    };

    // 锁定
    $scope.lock = function () {
      var data = {};
      data.id = teacher_id;
      var isSuccess = Http.POST('POST', url + 'locking' + header, data);

      isSuccess.then(function (text) {
        alert("锁定成功！");
      }).catch(function (status) {
        alert('ERROR:' + status);
      });
    };
    // 激活
    $scope.active = function () {
      var data = {};
      data.id = teacher_id;
      var isSuccess = Http.POST('POST', url + 'activation' + header, data);

      isSuccess.then(function (text) {
        alert("激活成功！");
      }).catch(function (status) {
        alert('ERROR:' + status);
      });

    };

  }

})();