'use strict';

angular.module('LWL_search').
component('lwlSearch', {
  templateUrl: '/providence/component/LWL_search/LWL_search.template.html',
  controller: function BodyController($scope, dataCache) {
    $scope.programCount = dataCache.getProgramNumber();
  }
});
