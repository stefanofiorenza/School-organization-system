/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.theme.components')
      .controller('PageTopCtrl', PageTopCtrl);
  
    /** @ngInject */
    function PageTopCtrl($scope,$state, $http,$stateParams,$filter, $location,editableOptions, editableThemes) {
        $scope.url = '/a/sys/';
        $scope.obj = JSON.parse(sessionStorage.getItem('userMessage'));
        if (!$scope.obj) {
            alert('请登录之后进行访问！');
            sessionStorage.setItem('thisLocation', $location.path());
            window.location.href = "/login.html";
      
          }
        $scope.id = $scope.obj.JSESSIONID;

        var header = '?__cookie=true&__sid='+$scope.obj.JSESSIONID;

        $scope.user = {};
        // $location.$$host
        $scope.user.photo = 'http://192.168.1.103:8001' + $scope.obj.photo;

        if(!$scope.obj){
            alert('请登录之后进行访问！');
            sessionStorage.setItem('thisLocation',$location.path());
            window.location.href="/login.html";
    
          }
    //    取个人详细信息
        $scope.initPage = function(){
            $http.get($scope.url + 'user/infoData' + header)
            .success(function(data){
                if(data.success == false){
                    alert('用户当前没有登录，请登录之后访问！');
                    sessionStorage.setItem('thisLocation',$location.path());
                    window.location.href="/login.html";               
                }
                $scope.user = data.body.data;
                $scope.user.photo = "http://192.168.1.103:8001" + $scope.obj.photo;
            })
            .error(function(data){
                alert(data.msg);
            })
        };
        
        $scope.initPage();
        
        $scope.logout = function(){
            // 登出
            $http.get('/a/logout?__ajax='+$scope.id)
            .success(function(data){
                sessionStorage.setItem('thisLocation',$location.path());
                window.location.href="/login.html";
            })
            .error(function(data){
                alert(data.msg);
            })
        };
    }
  })();
  