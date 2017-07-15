'use strict';

angular.module('search').
component('searchControl', {
  templateUrl: '/providence/component/search/searchControls/searchControls.template.html',
  controller: function searchControlController($scope, $location, $rootScope ,$routeParams, jsLoader) {
    var $ctrl = this;
    //jsLoader.loadJS('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js','bootstrap');
    $ctrl.setOrderProp = function(orderProp){
      var keyword = $routeParams.q;
      var pageSize = $routeParams.num;
      $location.path('/LiveHealthy2020/search').search({q: keyword, num: pageSize, orderBy: orderProp});
    };
    $ctrl.setPageSize = function(pageSize){
      var keyword = $routeParams.q;
      var orderProp = $routeParams.orderBy;
      $location.path('/LiveHealthy2020/search').search({q: keyword, num: pageSize, orderBy: orderProp});
    };
  }
});
