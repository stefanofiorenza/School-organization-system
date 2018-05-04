/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.teaching')
        .controller('teachingEdit', teachingEdit);
  
    /** @ngInject */
    function teachingEdit($scope,$state, $http,$stateParams,$filter, editableOptions, editableThemes) {
      
      // 取当前管理员信息
      var obj = JSON.parse(sessionStorage.getItem('userMessage'));
      var header = '?__cookie=true&__sid='+obj.JSESSIONID;
      var type = {contentType:'application/json',dataType:'JSON'};
      var url = '/a/course/';

      // 当前记录的ID
      var teaching_id = $stateParams.teaching_id;
      // 判断1 ：添加 2：修改
      var teaching_type = $stateParams.teaching_type;
      // 教师调研组
      $scope.groups = {};
      $scope.group = '';
      // 教师角色
      $scope.roles = {};
      $scope.role = '';
      // 教师职称
      $scope.titles = {};
      $scope.title = '';
     
    //  初始化时，调用接口以及调用其它需要的数据 
      $scope.initPage = function(){

        $scope.groups = $scope.method('','GET');
        $scope.roles = $scope.method('','GET');
        $scope.titles = $scope.method('','GET');

        if(teaching_type == 1){
          $scope.teaching = {};
        }else{
          // 修改时需要加id          
          $http.get(url+'/'+header + '&'+teaching_id)
          .success(function(data){
            $scope.teaching = data.body;
            $scope.group = $scope.setSelect($scope.groups,$scope.teaching.group.id);
            $scope.role = $scope.setSelect($scope.roles,$scope.teaching.roles.id);
            $scope.title = $scope.setSelect($scope.titles,$scope.teaching.titles.id);
          })
          .error(function(data){
            alert(data.msg);
          });
        }
      };
// 下拉框中的默认内容
      $scope.setSelect = function(selectType,id){
        var newData;
        var keepGoing = true;
        angular.forEach(selectType,function(data){
          if(keepGoing === true){
            if(data.id == id){
              newData = data;
              keepGoing = false;
            }
          }else{
            return newData;
          }
        })        
      };

      $scope.initPage();
      //下拉框中内容的接口调用
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
//   点击保存 
      $scope.saveTeaching = function(){
        var data = {};
        data.teaching = $scope.teaching;
        data = JSON.stringify(data);
        if(teaching_type == 1){
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
      $scope.cancelTeachingEdit = function(){
        $state.go('teaching.teaching');
      }
//  (Object.keys($scope.student).length >= 9 && Object.keys($scope.student).indexOf("message") == -1) || (Object.keys($scope.student).length > 9 && Object.keys($scope.student).indexOf("message") != -1)
    }
  })();
  