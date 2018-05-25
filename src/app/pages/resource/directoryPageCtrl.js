/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.resource')
        .controller('DirectoryPageCtrl', DirectoryPageCtrl);

    /** @ngInject */
    function DirectoryPageCtrl($scope, $state, $http, $location, $uibModal, Http, $timeout, $filter, editableOptions, editableThemes) {

        // 取当前管理员信息
        var obj = JSON.parse(sessionStorage.getItem('userMessage'));
        if (!obj) {
            alert('请登录之后进行访问！');
            sessionStorage.setItem('thisLocation', $location.path());
            window.location.href = "/login.html";

        }
        var header = '?__cookie=true&__sid=' + obj.JSESSIONID;
        var url = '/a/course/contents/';
        var newTreeData = [];

        $scope.directories = {};
        $scope.directorieList = {};


        $scope.smartTablePageSize = 10;

        $scope.$watch('$viewContentLoaded', function () {
            $scope.initPage();
        });

        $scope.initPage = function () {
            $scope.treeData = [];
            newTreeData = [];
            Http.GET(url + 'list')
                .then(function (response) {
                    $scope.directorieList = response.list;
                    $scope.treeData = getDefaultData($scope.directorieList, newTreeData);
                    $scope.ignoreChanges = true;
                    $scope.basicConfig.version++;
                    console.log($scope.treeData);
                }).catch(function (error) {
                    alert('ERROR:' + error);
                })
        };
        var newId = 0;
        $scope.newNode = {};

        $scope.basicConfig = {
            core: {
                multiple: false,
                check_callback: true,
                worker: true
            },
            'types': {
                'folder': {
                    'icon': 'ion-ios-folder'
                },
                'default': {
                    'icon': 'ion-document-text'
                }
            },
            'plugins': ['types'],
            'version': 1
        };
        $scope.addNewNode = function () {
            $scope.ignoreChanges = true;
            var selected = this.basicTree.jstree(true).get_selected()[0];
            if (selected) {
                var data = {
                    // id: (newId++).toString(),
                    parentId: selected,
                    name: "目录 " + (newId++),
                };
                // $scope.treeData.push(data)
                // 数据添加到后台 
                Http.POST('POST', url + 'insert', data)
                    .then(function (response) {
                        $scope.initPage();

                    })
                    .catch(function (error) {
                        alert("ERROR:" + error);
                    });
            } else {
                alert('请选择父级目录！');
            }
            $scope.basicConfig.version++;

        };
        // 添加课程
        $scope.addNewNodeSub = function () {
            var selected = this.basicTree.jstree(true).get_selected()[0];
            if(selected){
                $state.go('resource.resourceEdit', {
                    //1 添加课程
                    course_type: 1,
                    directory_id : selected
                });
            }else{
                alert('请选择父级目录！');
            }
            
            // $scope.ignoreChanges = true;
            // var selected = this.basicTree.jstree(true).get_selected()[0];
            // if (selected) {
            //     var data = {
            //         id: (newId++).toString(),
            //         parent: selected,
            //         text: "课程" + newId,
            //         state: {
            //             opened: true
            //         }
            //     };
            //     $scope.treeData.push(data);

            // } else {
            //     alert('请选择父级目录！');
            // }
            // $scope.basicConfig.version++;
        };
        // 编辑
        $scope.open = function (page, size) {
            $scope.ignoreChanges = true;
            var selected = this.basicTree.jstree(true).get_selected()[0];
            $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
        };
        //     $scope.openProgressDialog = baProgressModal.open;
        // }
        // 删除目录成功
        $scope.delete = function () {
            $scope.ignoreChanges = true;
            var selected = this.basicTree.jstree(true).get_selected()[0];
            if (selected) {
                Http.GET(url+'delete?id='+selected)
                .then(function(response){
                    $scope.initPage();
                })
                .catch(function(error){
                    alert('ERROR:'+error);
                });
                // $scope.treeData = $scope.treeData.filter(function (obj) {
                //     return selected != obj.id;
                // })
            } else {
                alert('请选择父级目录！');
            }
            // $scope.basicConfig.version++;
        };

        $scope.expand = function () {
            $scope.ignoreChanges = true;
            $scope.treeData.forEach(function (n) {
                n.state.opened = true;
            });
            $scope.basicConfig.version++;
        };

        $scope.collapse = function () {
            $scope.ignoreChanges = true;
            $scope.treeData.forEach(function (n) {
                n.state.opened = false;
            });
            $scope.basicConfig.version++;
        };

        $scope.readyCB = function () {
            $timeout(function () {
                $scope.ignoreChanges = false;
            });
        };


        $scope.applyModelChanges = function () {
            return !$scope.ignoreChanges;
        };

        // $scope.treeData = getDefaultData();

        // 查询id目录下的所有课程
        $scope.getCourse = function(){
            // 查询所选目录下的课程
            var selected = this.basicTree.jstree(true).get_selected()[0];
            if(selected){
                Http.GET('/a/course/contents/byContents?id='+selected)
                .then(function(response){
                    $scope.courses = response.body.contents;
                })
                .catch(function(error){
                    alert("ERROR:"+error);
                });
            }else{
                // 查询所有的课程
                Http.GET('/a/course/courseType/list')
                .then(function(response){
                    $scope.courses = response.body.list;
                })
                .catch(function(error){
                    alert("ERROR:"+error);
                });
            }
        };

         

        // 递归重新匹配数据
        function getDefaultData(list, newTreeData) {
            
            for (var i = 0; i < list.length; i++) {
                newTreeData.push({
                    "id": list[i].id,
                    "parent": (list[i].parentId == 0 ? '#' : list[i].parentId),
                    "type": 'folder',
                    "text": list[i].name,
                    "state": {
                        "opened": true
                    }
                });

                if (list[i].children) {
                    getDefaultData(list[i].children, newTreeData);
                }
            }
            return newTreeData;
        };

        // 修改课程
        $scope.courseEdit = function(id){
            $state.go('resource.resourceEdit',{
                //2 修改课程
                course_type: 2,
                course_id:id
            })
        };  

    }

})();