'use strict';

angular.module('LH2020_search').
component('lh2020Search', {
  templateUrl: '/providence/component/LH2020_search/LH2020_search.template.html',
  controller: function BodyController($scope, dataCache) {
    $scope.programCount = dataCache.getProgramNumber();
  }
});
