/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.teachers')
        .controller('teacherEdit', teacherEdit);
  
    /** @ngInject */
    function teacherEdit($scope,$state, $http,$stateParams,$filter, editableOptions, editableThemes) {
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/course/';
  
      // 当前记录的ID
      var teacher_id = $stateParams.teacher_id;
      // 判断1 ：添加 2：修改
      var teacher_type = $stateParams.teacher_type;
  
      $scope.teacher = {};

      $scope.groups = {};
      $scope.roles = {};
      $scope.titles = {};
      
      $scope.isTeachersPassword = false;
     
      // 老师两个输入密码校验
      $scope.teacherValite = function(){
        if($scope.teacher.password == $scope.teacher.againPassword) {
          $scope.isTeachersPassword = false;
        }else{
          $scope.isTeachersPassword = true;
        }
      };
  
      $scope.initPage = function(){
        if(teacher_type == 1){
            $scope.teacher = {};
          }else{
            // 修改时需要加id          
            $http.get(url+'/'+header + '&'+directory_id)
            .success(function(data){
              $scope.teacher = data.body;

            })
            .error(function(data){
              alert(data.msg);
            });
          }  
        // 调研组
        $scope.groups = $scope.method('','GET');
        // 教师角色
        $scope.roles = $scope.method('','GET');
        // 教师职称
        $scope.titles = $scope.method('','GET');

      };
//    调用接口
      $scope.method = function (methodurl,type,data){
        var tmpdata = [];
        $http({
          method:type,
          url:url+methodurl+header,
          data:data
        })
        .success(function(data){
           tmpdata = data;
        })
        .error(function(data){
          alert(data.message);
        })
        return tmpdata;
      };

      $scope.initPage();
//   保存
      $scope.saveTeacher = function(){
        var data = {};
        if((Object.keys($scope.student).length >= 11 && Object.keys($scope.student).indexOf("message") == -1) || (Object.keys($scope.student).length > 11 && Object.keys($scope.student).indexOf("message") != -1)){
          // 必填，但可以为空
          data.students = $scope.student;
          data = JSON.stringify(data);
          if($scope.method('','POST',data)){
          //  
          }
        }else{
          alert('请填写必填的信息！');
        }     
      }
//   取消  
      $scope.cancelTeacherEdit = function(){
        $state.go('teachers.teachers');
      };

    }
  
  })();
  