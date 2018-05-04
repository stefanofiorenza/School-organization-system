/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.directory')
        .controller('directoryEdit', directoryEdit);
  
    /** @ngInject */
    function directoryEdit($scope,$state, $http,$stateParams,$filter, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/course/';

      // 当前记录的ID
      var directory_id = $stateParams.directory_id;
      // 判断1 ：添加 2：修改
      var directory_type = $stateParams.directory_type;
     
    //  初始化时，调用接口以及调用其它需要的数据 
      $scope.initPage = function(){
        if(directory_type == 1){
          $scope.directory = {};
        }else{
          // 修改时需要加id          
          $http.get(url+'/'+header + '&'+directory_id)
          .success(function(data){
            $scope.directory = data.body;
          })
          .error(function(data){
            alert(data.msg);
          });
        }
      };
      $scope.initPage();
      // 学生验证
//   点击保存 
      $scope.saveDirectory = function(){
        var data = {};
        data.directory = $scope.directory;
        data = JSON.stringify(data);
        if(directory_type == 1){
          // 添加          
          $http({
            method:'POST',
            contentType:type.contentType,
            url:url+'teachingPlan/save?'+header,
            dataType:type.dataType,
            data:data
          })
          .success(function(data){
            alert('添加成功！');
          })
          .error(function(data){
            alert(date.msg);
          })
        }else{
          // 修改
          $http({
            method:'POST',
            contentType:type.contentType,
            url:url+'teachingPlan/save?'+header,
            dataType:type.dataType,
            data:data
          })
          .success(function(data){
            alert('修改成功！');
          })
          .error(function(data){
            alert(data.msg);
          })
        }       
      };
  
// 取消修改/保存  
      $scope.cancelDirectoryEdit = function(){
        $state.go('directory.directory');
      };
//  (Object.keys($scope.student).length >= 9 && Object.keys($scope.student).indexOf("message") == -1) || (Object.keys($scope.student).length > 9 && Object.keys($scope.student).indexOf("message") != -1)
    }
  })();
  