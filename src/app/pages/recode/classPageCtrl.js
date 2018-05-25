/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.recode')
        .controller('ClassPageCtrl', ClassPageCtrl);
  
    /** @ngInject */
    function ClassPageCtrl($scope,$state,$http, $location,$filter, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      if(!obj){
        alert('请登录之后进行访问！');
        sessionStorage.setItem('thisLocation',$location.path());
        window.location.href="/login.html";

      }
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/sys/office/';

      $scope.directories = {};


      $scope.smartTablePageSize = 10;
      
      $scope.initPage = function(){
        
        // 初始化页面
        $http.get(url+'showOfficeList'+header)
        .success(function(data){
            if(data.success == false){
                alert('用户当前没有登录，请登录之后访问！');
                sessionStorage.setItem('thisLocation',$location.path());
                window.location.href="/login.html";               
            }
          $scope.class = data.body.office; 
        })
        .error(function(data){
          alert(data.msg);
        })
      };

      $scope.initPage();
  // 添加teaching_type为1，修改为2
      $scope.classCreate = function(){
        $state.go('recode.classEdit',{class_type:1});
      };

      $scope.classEdit = function(id){
        $state.go('recode.classEdit',{class_type:2,class_id:id});
      };

    }
  
  })();
  