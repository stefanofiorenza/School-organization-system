!
function () {
    "use strict";
    angular.module('BlurAdmin.theme.modals')
        .controller('infoControl', infoControl);

    function infoControl($scope) {
        $scope.save = function () {
            sessionStorage.setItem('treeName', $scope.name);           
        }

    }
}();