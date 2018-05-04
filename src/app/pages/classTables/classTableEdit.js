/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';
  
    angular.module('BlurAdmin.pages.classTables')
        .controller('classTableEdit', classTableEdit);
  
    /** @ngInject */
    function classTableEdit($scope,$state, $http,$stateParams,$filter, editableOptions, editableThemes) {
        

        // 日期插件
            $scope.opened = false;
            $scope.opened_two = false;
            // 教师所选的开始日期以及结束日期
            $scope.startDate = new Date();
            $scope.endDate = new Date();
            // 教师所选的教学时间区间
            $scope.teachingDates = [];
            $scope.teachingTimes = [];

            $scope.times = [];
            $scope.endtimes = [];

            $scope.rows = [];
                  
            $scope.timeShow = false;

            $scope.getTeacherTime = function(){
                $scope.teachingDates = [];
                if($scope.startDate > $scope.endDate ){
                    $scope.endDate = $scope.startDate;
                }
                // 取开始日期与结束日期之间 日差
                var start = $scope.startDate.getDate(); 
                var end = $scope.endDate.getDate();

                var dateString = $scope.startDate.toLocaleDateString();
                var startIndex = dateString.lastIndexOf('/');
                var timeHeader = dateString.substr(0,startIndex+1);
                // start = parseInt(start.substr(startIndex+1));

                for(start;start<=end;start++){
                    $scope.teachingDates.push(timeHeader+start);
                }

            };          

            $scope.getTimes = function(){
                for(var i =1;i<25;i++){
                    $scope.times.push(i + ':00');
                }
            };
            $scope.getTimes();
           
            $scope.getTime = function(){
                $scope.endtimes = [];
                var index = $scope.startTime.indexOf(':');
                var i = parseInt($scope.startTime.substr('0',index))+1;
                for(i;i<25;i++){
                    $scope.endtimes.push(i + ':00');
                }
            };

            $scope.addTime = function(){
                // 
                $scope.rows.push('Row ' + $scope.counter);
                $scope.counter++;
            };

            $scope.getTeachingTimes = function(){
                // $scope.teachingTimes = [];
                $scope.teachingTimes.push($scope.startTime + '-' +$scope.endTime)
            };

            $scope.cancelClassTablesEdit = function(){
                $state.go('classTables.classTables');
            };

            



//       // 取当前管理员信息
//       var obj = JSON.parse(sessionStorage.getItem('userMessage'));
//       var header = '?__cookie=true&__sid='+obj.JSESSIONID;
//       var type = {contentType:'application/json',dataType:'JSON'};
//       var url = '/a/sys/office/';

//       // 当前记录的ID
//       var class_id = $stateParams.class_id;
//       // 判断1 ：添加 2：修改
//       var class_type = $stateParams.class_type;
     
//     //  初始化时，调用接口以及调用其它需要的数据 
//       $scope.initPage = function(){
//         if(class_type == 1){
//           $scope.class = {};
//         }else{
//           // 修改时需要加id          
//           $http.get(url+'/'+header + '&'+class_id)
//           .success(function(data){
//             $scope.class = data.body;
//           })
//           .error(function(data){
//             alert(data.msg);
//           });
//         }
//       };
//       $scope.initPage();
//       // 学生验证
// //   点击保存 
//       $scope.saveClass = function(){
//         var data = {};
//         data.class = $scope.class;
//         data = JSON.stringify(data);
//         if(class_type == 1){
//           // 添加          
//           $http({
//             method:'POST',
//             contentType:type.contentType,
//             url:url+header,
//             dataType:type.dataType,
//             data:data
//           })
//           .success(function(data){
//             alert('添加成功！');
//           })
//           .error(function(data){
//             alert(date.msg);
//           })
//         }else{
//           // 修改
//           $http({
//             method:'POST',
//             contentType:type.contentType,
//             url:url+'teachingPlan/save?'+header,
//             dataType:type.dataType,
//             data:data
//           })
//           .success(function(data){
//             alert('修改成功！');
//           })
//           .error(function(data){
//             alert(data.msg);
//           })
//         }       
//       };
  
// // 取消修改/保存  
//       $scope.cancelClassEdit = function(){
//         $state.go('class.class');
//       };
//  (Object.keys($scope.student).length >= 9 && Object.keys($scope.student).indexOf("message") == -1) || (Object.keys($scope.student).length > 9 && Object.keys($scope.student).indexOf("message") != -1)
    }
  })();
  