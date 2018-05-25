/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.recode')
    .controller('classEdit', classEdit);

  /** @ngInject */
  function classEdit($scope, $state, $http, $stateParams, $filter, Http, editableOptions, editableThemes) {

    // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
    var url = '/a/sys/office/';

    $scope.class = {};
    // 当前记录的ID
    var class_id = $stateParams.class_id;
    // 判断1 ：添加 2：修改
    var class_type = $stateParams.class_type;

    $scope.$watch('$viewContentLoaded', function () {
      $scope.initPage();
    });

    // 获取所有的年份
    $scope.getTimes = function () {
      Http.GET(url + 'getTime' + header)
        .then(function (response) {
          $scope.times = response.body.office;
          if (class_type == 2) {
            $scope.getClass();
          }

        }).catch(function (error) {
          alert('ERROR:' + error);
        })
    };
    // 获取班级的信息
    $scope.getClass = function () {
      Http.GET(url + 'getOffinceId' + header +'&id=' + class_id)
        .then(function (response) {
          $scope.class = response.body.office;
          $scope.setTime($scope.class.timeId);
        }).catch(function (error) {
          alert('ERROR:' + error);
        })
    };

    // 选择年份
    $scope.setTime = function(id){
      var keepGoing = true;
      angular.forEach($scope.times,function(data){
        if(keepGoing === true){
          if(data.id == id){
            $scope.time = data;
          }
        }
      })
    };

    //  初始化时，调用接口以及调用其它需要的数据 
    $scope.initPage = function () {
      $scope.getTimes();
    };
    $scope.initPage();

    // 点击保存 
    $scope.saveClass = function () {
      var data = {};
      data.class = angular.extend({}, $scope.class, {
        timeId: $scope.time.id
      });

      if (class_type == 1) {
        // 添加保存时
        var isSuccess = Http.POST('POST', url + 'saveNew' + header, data.class);

        isSuccess.then(function (text) {
          alert("添加班级成功！");
          $scope.class = {};
        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      } else {
        // 修改保存时
        data.class.id = class_id;
        var isSuccess = Http.POST('POST', url + 'save' + header, data.class);

        isSuccess.then(function (text) {
          if(text.success == true){
            alert("修改班级成功！");
          }else{
            alert("ERROR:"+text.body.module);
          }          
        }).catch(function (status) {
          alert('ERROR:' + status);
        })
      }
    };

    // 取消修改  
    $scope.cancelClassEdit = function () {
      $state.go('recode.class');
    };

  }
})();