/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.subjects')
        .controller('SubjectsPageCtrl', SubjectsPageCtrl);
  
    /** @ngInject */
    function SubjectsPageCtrl($scope,$state,$http, status,$filter, editableOptions, editableThemes) {
      // 取当前管理员信息
    var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    if (!obj) {
      alert('请登录之后进行访问！');
      sessionStorage.setItem('thisLocation', $location.path());
      window.location.href = "/login.html";

    }
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {dataType:'JSON'};
      var url = '/a/course/';

      $scope.students = {};
      // 通过服务注册的status
      $scope.statuses = status.getStatus();

      $scope.subjectsList = {};
      $scope.subject = {};

      $scope.smartTablePageSize = 10;
  
      // $scope.method = function (methodurl,type,data){
      //   var tmpdata = {};
      //   $http({
      //     method:type,
      //     url:methodurl,
      //     data:data
      //   })
      //   .success(function(data){
      //      tmpdata = data;
      //      return tmpdata;
      //   })
      //   .error(function(data){
      //     alert(data.message);
      //   })
      // };

      $scope.initPage = function(){
        $http.get('/a/course/courseInfo/list')
        .success(function(data){
          if (data.success == false) {
            alert('用户当前没有登录，请登录之后访问！');
            sessionStorage.setItem('thisLocation', $location.path());
            window.location.href = "/login.html";
          }
            $scope.subjectsLists = data.body.page.list;
        })
        .error(function(data){
            alert(data.msg);
        })     
      };

      $scope.initPage();
  
      $scope.subjectsCreate = function(){
        $state.go('subjects.subjectsCreate');
      }
  
      $scope.cancelSubjectsCreate = function(){
        $state.go('subjects.subjectsList');
      }

      $scope.subjectEdit = function(){
        $state.go('subjects.subjectEdit');
      }

     //  新建课程信息
      $scope.saveSubject = function(){
        var data = {};
        // if((Object.keys($scope.student).length >= 9 && Object.keys($scope.student).indexOf("message") == -1) || (Object.keys($scope.student).length > 9 && Object.keys($scope.student).indexOf("message") != -1)){
        // 必填，但可以为空
          data.subject = $scope.subject;
          data = JSON.stringify(data);
          if($scope.method('/a/course/courseInfo/save','POST',data)){
            $state.go('subjects.subjectsList');
          }
      // }else{
      //   alert('请填写必填的信息！');
      // }     
      };
      

     
  
    }
  
  })();
  