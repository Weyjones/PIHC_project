'use strict';

angular.module('LH2020_body').
component('lh2020Body', {
  templateUrl: '/providence/component/LH2020_body/LH2020_body.template.html',
  controller: function BodyController($scope) {
    $scope.showSearch = false;
    $scope.doSearch = function(){
      $scope.showSearch = true;
    };
  }
});
