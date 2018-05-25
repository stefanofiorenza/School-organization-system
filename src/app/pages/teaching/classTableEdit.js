/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.teaching')
        .controller('classTableEdit', classTableEdit);

    /** @ngInject */
    function classTableEdit($scope, $state, $http, $stateParams, $filter,Http, editableOptions, editableThemes) {

        // 日期插件
        $scope.opened = false;
        $scope.opened_two = false;
        // 教师所选的开始日期以及结束日期
        // $scope.startDate = new Date();
        // $scope.endDate = new Date();
        // 教师所选的教学时间区间
        $scope.teachingDates = [];
        $scope.teachingTimes = {};


        var obj = JSON.parse(sessionStorage.getItem('userMessage'));
        var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
        var url = '/a/course/courseInfo/';

        // 当前记录的ID
        var classTable_id = $stateParams.classTable_id;
        // 判断1 ：添加 2：修改
        var classTable_type = $stateParams.classTable_type;

        $scope.times = [];
        $scope.endtimes = [];

        $scope.rows = [];
        $scope.counter = 0;

        $scope.timeShow = false;

        $scope.getTeacherDate = function () {
            $scope.teachingDates = [];
            if ($scope.startDate > $scope.endDate) {
                $scope.endDate = $scope.startDate;
            }
            // 取开始日期与结束日期之间 日差
            var start = $scope.startDate.getDate();
            var end = $scope.endDate.getDate();

            var dateString = $scope.startDate.toLocaleDateString();
            var startIndex = dateString.lastIndexOf('/');
            var timeHeader = dateString.substr(0, startIndex + 1);
            // start = parseInt(start.substr(startIndex+1));

            for (start; start <= end; start++) {
                $scope.teachingDates.push(timeHeader + start);
            }

        };

        $scope.getTimes = function () {
            for (var i = 1; i < 25; i++) {
                $scope.times.push(i + ':00');
            }
        };

        $scope.getTime = function () {
            $scope.endtimes = [];
            var index = $scope.startTime.indexOf(':');
            var i = parseInt($scope.startTime.substr('0', index)) + 1;
            for (i; i < 25; i++) {
                $scope.endtimes.push(i + ':00');
            }
        };

        $scope.getTeachingTimes = function () {


            $scope.rows.push('Row ' + $scope.counter);
            $scope.counter++;

            $scope.teachingTimes['teachingTime' + $scope.counter] = $scope.startTime + '-' + $scope.endTime;
            console.log($scope.teachingTimes);
        };

        $scope.$watch('$viewContentLoaded', function () {
            $scope.initPage();
        });

        // 获取所有教学计划
        $scope.getTeachings = function () {
            Http.GET('/a/course/teaching/list' + header)
                .then(function (response) {
                    $scope.teachings = response.body.list;
                    $scope.getTeachers();
                }).catch(function (error) {
                    alert("error:" + error);
                })
        };
        // 获取所有教师
        $scope.getTeachers = function () {
            Http.GET('/a/sys/user/getRoleNameTeacher' + header)
                .then(function (response) {
                    $scope.teachers = response.body.loginUser;
                    $scope.getSubjectes();
                }).catch(function (error) {
                    alert("error:" + error);
                })
        };
        // 获取所有的课程
        $scope.getSubjectes = function () {
            Http.GET('/a/course/courseInfo/list' + header)
                .then(function (response) {
                    $scope.subjectes = response.body.list;
                }).catch(function (error) {
                    alert("error:" + error);
                })
        };
        // 选择授课计划
        $scope.setTeaching = function (id) {
            var keepGoing = true;
            angular.forEach($scope.teachings, function (data) {
                if (keepGoing === true) {
                    if (data.id == id) {
                        $scope.teaching = data;
                    }
                }
            })
        };
        // 选择老师
        $scope.setTeacher = function (id) {
            var keepGoing = true;
            angular.forEach($scope.teachers, function (data) {
                if (keepGoing === true) {
                    if (data.titleId == id) {
                        $scope.teacher = data;
                    }
                }
            })
        };
        // 选择课程
        $scope.setSubject = function (id) {
            var keepGoing = true;
            angular.forEach($scope.subjectes, function (data) {
                if (keepGoing === true) {
                    if (data.titleId == id) {
                        $scope.subject = data;
                    }
                }
            })
        };


        // 教师相关信息
        $scope.getClassTable = function () {
            var isSuccess = Http.GET(url + 'getDetailByCourseId' + header + '&id=' + classTable_id);
            isSuccess.then(function (text) {
                $scope.classTable = text.body.loginUser;
                $scope.setTeaching($scope.classTable.teachingId);
                $scope.setTeacher($scope.classTable.teacherId);
                $scope.setSubject($scope.classTable.subjectId);
            }).catch(function (status) {
                alert('ERROR:' + status);
            })
        };

        $scope.initPage = function () {
            $scope.getTimes();
            $scope.getTeachings();
            if (teacher_type == 1) {
                $scope.teacher = {};
                $scope.update = '添加';
            } else {
                // 修改时需要加id    
                $scope.isShow = true;
                $scope.update = '修改';
            }
        };

        $scope.save = function(){

        };


        $scope.cancelClassTablesEdit = function () {
            $state.go('teaching.classTables');
        };
    }
})();