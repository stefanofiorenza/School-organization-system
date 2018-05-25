/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.teaching')
        .controller('TeachingPlanPageCtrl', TeachingPlanPageCtrl);
  
    /** @ngInject */
    function TeachingPlanPageCtrl($scope,$state,$http, $filter,status, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      if(!obj){
        alert('请登录之后进行访问！');
        sessionStorage.setItem('thisLocation',$location.path());
        window.location.href="/login.html";
      }
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/course/';
      
      $scope.teachings = {};

      $scope.statuses = status.getStatus();

      $scope.smartTablePageSize = 10;
      
      $scope.initPage = function(){
        $http.get(url+'teaching/list'+header)
        .success(function(data){
          if(data.success == false){
            alert('用户当前没有登录，请登录之后访问！');
            sessionStorage.setItem('thisLocation',$location.path());
            window.location.href="/login.html";               
        }
          $scope.teachings = data.body.list; 
        })
        .error(function(data){
          alert(data.msg);
        })
      };

      $scope.initPage();
  // 添加teaching_type为1，修改为2
      $scope.teachingCreate = function(){
        $state.go('teaching.teachingPlanEdit',{teaching_type:1});
      };

      $scope.teachingEdit = function(id){
        $state.go('teaching.teachingPlanEdit',{teaching_type:2,teaching_id:id});
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
  