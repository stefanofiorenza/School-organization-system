/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.students')
        .controller('studentEdit', studentEdit);
  
    /** @ngInject */
    function studentEdit($scope,$state, $http,$stateParams,$filter, editableOptions, editableThemes) {
      // 取当前管理员信息
        var obj = JSON.parse(sessionStorage.getItem('userMessage'));
        var header = '?__cookie=true&__sid='+obj.JSESSIONID;
        var type = {contentType:'application/json',dataType:'JSON'};
        var url = '/a/course/';
  
        // 当前记录的ID
        var student_id = $stateParams.student_id;
        // 判断1 ：添加 2：修改
        var student_type = $stateParams.student_type;
  
        $scope.student = {};

        $scope.student.class = '一年级';
        $scope.scales = ['一级','二级','三级'];
        $scope.scale = '';
        $scope.isStudentPassword = false;
  
     
    // 学生验证
        $scope.validata = function(){
            if($scope.student.onePassword == $scope.student.againPassword) {
            $scope.isStudentPassword = false;
            }else{
            $scope.isStudentPassword = true;
            }
        };
  
      $scope.initPage = function(){
        $scope.getStudentScale();
        if(student_type == 1){
            $scope.student = {};
          }else{
            // 修改时需要加id          
            $http.get(url+'/'+header + '&'+student_id)
            .success(function(data){
              $scope.student = data.body;
              $scope.setStudentScale($scope.student.scaleId);
            })
            .error(function(data){
              alert(data.msg);
            });
          }  
      };
    // 获取学生等级
      $scope.getStudentScale = function(){
          $http.get(url+'/'+header)
          .success(function(data){
            $scope.scales = data.body;
          })
          .error(function(data){
              alert(data.msg);
          })
      };
    // 选择学生等级
    $scope.setStudentScale = function(id){
      var keepGoing = true;
      angular.forEach($scope.scales,function(data){
        if(keepGoing === true){
          if(data.id == id){
              $scope.scale = data;
              keepGoing = false;
          }
        }
      })       
    };
      $scope.initPage();
//   保存
      $scope.saveStudent = function(){
        var data = {};
        if((Object.keys($scope.student).length >= 11 && Object.keys($scope.student).indexOf("message") == -1) || (Object.keys($scope.student).length > 11 && Object.keys($scope.student).indexOf("message") != -1)){
          // 必填，但可以为空
          data.student = $scope.student;
          data = JSON.stringify(data);
          if($scope.method('','POST',data)){
            // 
          }
        }else{
          alert('请填写必填的信息！');
        }     
      };
//   取消  
        $scope.cancelStudentEdit = function(){
            $state.go('students.students');
        };

    };
  
  })();
  