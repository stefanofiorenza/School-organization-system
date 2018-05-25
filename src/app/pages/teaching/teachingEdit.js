/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.teaching')
    .controller('teachingPlanEdit', teachingPlanEdit);

  /** @ngInject */
  function teachingPlanEdit($scope, $state, $http, $stateParams, toDate, Http, $httpParamSerializerJQLike, $filter, editableOptions, editableThemes) {

    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
    // var type = {contentType:'application/json',dataType:'JSON'};
    var url = '/a/course/';
    // /a/course/teachingPlan/getList

    // 当前记录的ID
    var teaching_id = $stateParams.teaching_id;
    // 判断1 ：添加 2：修改
    var teaching_type = $stateParams.teaching_type;

    $scope.isShow = false;

    //  初始化时，调用接口以及调用其它需要的数据 
    $scope.initPage = function () {

      if (teaching_type == 1) {
        $scope.teaching = {};
        $scope.update = '添加';
      } else {
        // 修改时需要加id  
        $scope.isShow = true;
        $scope.update = '修改';
        $http.get(url + 'teaching/get' + header + '&' + 'id=' + teaching_id)
          .success(function (data) {
            $scope.teaching = data.body.list;
            $scope.teaching.plandateStart = toDate.timestampToTime($scope.teaching.plandateStart);
            $scope.teaching.plandateEnd = toDate.timestampToTime($scope.teaching.plandateEnd);
          })
          .error(function (data) {
            alert(data.msg);
          });
      }
    };


    $scope.initPage();

    //   点击保存 
    $scope.saveTeaching = function () {
      var data = {};

      // $scope.teaching.plandateStart = $scope.teaching.plandateStart.to
      data.teaching = $scope.teaching;
      data.teaching.plandateStart = toDate.format(data.teaching.plandateStart, 'yyyy-MM-dd hh:mm:ss');
      data.teaching.plandateEnd = toDate.format(data.teaching.plandateEnd, 'yyyy-MM-dd hh:mm:ss');



      if (teaching_type == 1) {
        // 添加  
        var isSuccess = Http.POST('POST', url + 'teaching/insert' + header, data.teaching);

        isSuccess.then(function (text) {
          if (text.success == true) {
            alert("添加授课计划成功！");
            $scope.teaching = {};
          } else {
            alert('ERROR:' + text.redirectAttributes);
          }
        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      } else {
        // 修改
        data.teaching.id = teaching_id;
        var isSuccess = Http.POST('POST', url + 'teaching/update' + header, data.teaching);

        isSuccess.then(function (text) {
          alert("修改授课计划成功！");
        }).catch(function (status) {
          alert('ERROR:' + status);
        });
      }
    };

    // 锁定
    $scope.lock = function () {
      // state 为0 是激活
      var data = {};
      data.id = teaching_id;
      var isSuccess = Http.POST('POST', url + 'teachingPlan/locking' + header, data);

      isSuccess.then(function (text) {
        alert("锁定成功！");
      }).catch(function (status) {
        alert('ERROR:' + status);
      });



    };
    // 激活
    $scope.active = function () {
      // state 为1 是锁定
      var data = {};
      data.id = teaching_id;
      var isSuccess = Http.POST('POST', url + 'teachingPlan/activation' + header, data);

      isSuccess.then(function (text) {
        alert("激活成功！");
      }).catch(function (status) {
        alert('ERROR:' + status);
      });

    };

    // 取消修改/保存  
    $scope.cancelTeachingEdit = function () {
      $state.go('teaching.teachingPlan');
    };

  }
})();