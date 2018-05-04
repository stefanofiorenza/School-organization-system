/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.classTables')
        .controller('ClassTablesPageCtrl', ClassTablesPageCtrl);
  
    /** @ngInject */
    function ClassTablesPageCtrl($scope,$state,$http, $location,$filter, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
    //   if(!obj){
    //     alert('请登录之后进行访问！');
    //     sessionStorage.setItem('thisLocation',$location.path());
    //     window.location.href="/login.html";

    //   }
    // +obj.JSESSIONID
      var header = '?__cookie=true&__sid=';
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/course/';

      $scope.classTables = {};


      $scope.smartTablePageSize = 10;
      
      $scope.initPage = function(){
        
        // 初始化页面
        $http.get(url+'teachingPlan/list'+header)
        .success(function(data){
            // if(data.success == false){
            //     alert('用户当前没有登录，请登录之后访问！');
            //     sessionStorage.setItem('thisLocation',$location.path());
            //     window.location.href="/login.html";               
            // }
          $scope.classTables = data.body.page.list; 
        })
        .error(function(data){
          alert(data.msg);
        })
      };

      $scope.initPage();
  // 添加teaching_type为1，修改为2
      $scope.classTableCreate = function(){
        $state.go('classTables.classTableEdit',{classTable_type:1});
      };

      $scope.classTableEdit = function(){
        $state.go('classTables.classTableEdit',{classTable_type:2});
      };

    }
  
  })();
  