/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.users')
    .controller('studentEdit', studentEdit);

  /** @ngInject */
  function studentEdit($scope, $state, $http, $stateParams, Http, $filter, editableOptions, editableThemes) {
    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
    var url = '/a/sys/user/';

    // 当前记录的ID
    var student_id = $stateParams.student_id;
    // 判断1 ：添加 2：修改
    var student_type = $stateParams.student_type;

    $scope.student = {};

    $scope.isShow = false;
    $scope.offices = [];
    $scope.student.class = '一年级';
    $scope.scales = ['一级', '二级', '三级'];
    $scope.scale = '';
    $scope.isStudentPassword = false;

    $scope.$watch('$viewContentLoaded', function () {
      $scope.initPage();
    });


    // 学生验证
    $scope.validata = function () {
      if ($scope.student.password == $scope.student.againPassword) {
        $scope.isStudentPassword = false;
      } else {
        $scope.isStudentPassword = true;
      }
    };

    // 获取学生班级
    $scope.getOfficeNames = function () {
      Http.GET('/a/sys/office/showOfficeList' + header)
        .then(function (text) {
          $scope.offices = text.body.office;
          if (student_id != null) {
            $scope.getStudent();
          }
        }).catch(function (status) {
          alert('ERROR:' + status)
        })
    };

    // 选择学生班级
    $scope.setOfficaName = function (id) {
      var keepGoing = true;
      angular.forEach($scope.offices, function (data) {
        if (keepGoing === true) {
          if (data.id == id) {
            $scope.office = data;
            keepGoing = false;
          }
        }
      })
    };

    // 获取当前的信息
    $scope.getStudent = function () {
      var isSuccess = Http.GET(url + '/getUserId' + header + '&id=' + student_id);
      isSuccess.then(function (text) {
        $scope.student = text.body.loginUser;
        $scope.setOfficaName($scope.student.officeId);
      }).catch(function (status) {
        alert('ERROR:' + status);
      })
    }

    $scope.initPage = function () {
      $scope.getOfficeNames();
      if (student_type == 1) {
        $scope.student = {};
        $scope.update = '添加';
      } else {
        $scope.isShow = true;
        // 修改时需要加id
        $scope.update = '修改';
      }
    };

    //   保存
    $scope.saveStudent = function () {
      var data = {};
      data.student = angular.extend({}, $scope.student, {
        officeId: $scope.office.id
      });
      if (student_type == 1) {
        // 添加保存时
        var isSuccess = Http.POST('POST', url + 'save' + header, data.student);

        isSuccess.then(function (text) {
          alert("添加学生成功！");
          $scope.student = {};
        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      } else {
        // 修改保存时
        data.student.id = student_id;
        var isSuccess = Http.POST('POST', url + 'updateUser' + header, data.student);

        isSuccess.then(function (text) {
          if (text.success == true) {
            alert("修改学生成功！");
          } else {
            alert("ERROR:" + text.body.module);
          }

        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      }

    };
    //   取消  
    $scope.cancelStudentEdit = function () {
      $state.go('users.students');
    };
    // 锁定
    $scope.lock = function () {
      var data = {};
      data.id = student_id;
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
      data.id = student_id;
      var isSuccess = Http.POST('POST', url + 'activation' + header, data);

      isSuccess.then(function (text) {
        alert("激活成功！");
      }).catch(function (status) {
        alert('ERROR:' + status);
      });

    };




    // // 获取学生等级
    // $scope.getStudentScale = function () {
    //   $http.get(url + '/' + header)
    //     .success(function (data) {
    //       $scope.scales = data.body;
    //     })
    //     .error(function (data) {
    //       alert(data.msg);
    //     })
    // };
    // // 选择学生等级
    // $scope.setStudentScale = function (id) {
    //   var keepGoing = true;
    //   angular.forEach($scope.scales, function (data) {
    //     if (keepGoing === true) {
    //       if (data.id == id) {
    //         $scope.scale = data;
    //         keepGoing = false;
    //       }
    //     }
    //   })
    // };

  };

})();