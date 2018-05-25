/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.resource')
        .controller('resourceEdit', resourceEdit);
  
    /** @ngInject */
    function resourceEdit($scope,$state, $http,$stateParams,$filter,Http, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/course/courseType/';

      // 当前记录的ID
      var course_id = $stateParams.course_id;
      // 判断1 ：添加 2：修改
      var course_type = $stateParams.course_type;
      // 父级目录ID
      var directory_id = $stateParams.directory_id;

      $scope.course = {};

      $scope.$watch('$viewContentLoaded', function () {
        $scope.initPage();
      });


      $scope.initPage = function(){
        if(course_type == 1){
          $scope.update = '添加';
          $scope.course = {};
        }else{
          $scope.update = '修改';
          Http.GET(url+'get?id='+course_id)
          .then(function(response){
            $scope.course = response.body.list;
          })
          .catch(function(error){
            alert('ERROR:'+error);
          })
        }
      };
     
      // 保存按钮
      $scope.save = function(){
        var data = {};
        if(course_type == 1){
          data.course = angular.extend({},$scope.course,{contentsId:directory_id});
        }else{
          data.course = $scope.course;
        }       
        Http.POST('POST',url+'save',data.course)
        .then(function(response){
          if(response.success == true){
            alert('保存课程成功');
          }
        })
        .catch(function(error){
          alert('ERROR:'+error);
        })
      };

      // 取消按钮
      $scope.cancelEdit = function(){
        $state.go('resource.directory');
      }
      
    }
  })();
  