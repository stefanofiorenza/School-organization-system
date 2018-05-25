/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.home')
        .controller('HomePageCtrl', HomePageCtrl);
  
    /** @ngInject */
    function HomePageCtrl($scope,$state,$http, $location,$filter, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      if(!obj){
        alert('请登录之后进行访问！');
        sessionStorage.setItem('thisLocation',$location.path());
        window.location.href="/login.html";

      }
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;



      $scope.smartTablePageSize = 10;
      
      $scope.initPage = function(){
        $http.get('/a/course/courseInfo/countCourseInfo')
        .success(function(data){
          $scope.count = data.body;
        })
        .error(function(error){
          alert("error:"+error);
        })
       
      };

      $scope.initPage();

    }
  
  })();
  