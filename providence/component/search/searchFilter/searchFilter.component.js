'use strict';

angular.module('search').
component('searchFilter', {
  templateUrl: '/providence/component/search/searchFilter/searchFilter.template.html',
  controller: function searchFilterController($scope, $routeParams, $location) {
    $scope.keyword2 = "";
    $scope.doSearchWithin = function(){
      var pageSize = $routeParams.num;
      var orderProp = $routeParams.orderBy;
      var keyword = $routeParams.q;
      $location.path('/LiveHealthy2020/search').search({q: keyword, q2: $scope.keyword2, num: pageSize, orderBy: orderProp});
    }
  }
});
