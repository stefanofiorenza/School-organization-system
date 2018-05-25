/**
 * @author a.demeshko
 * created on 3/1/16
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
    .service('status', status);

  /** @ngInject */
  function status() {
    return {
      getStatus: function () {
        var statuses = [{
            value: 0,
            text: '激活'
          },
          {
            value: 1,
            text: '锁定'
          },
        ];
        return statuses;
      }
    }
  }

})();