'use strict';

angular.module('search').
component('appSearchbar', {
  bindings:{
    type:'='
  },
  templateUrl: '/providence/component/search/searchbar/searchbar.template.html',
  controller: function SearchController($scope,$location,$routeParams) {
    var $ctrl = this;
    $ctrl.keyword = $routeParams.q;
    console.log($routeParams);
    $ctrl.doSearch = function(){
      // var url = '/LiveHealthy2020/search';
      // if ($ctrl.keyword != undefined) {
      //   url += "?q=";
      //   url += $ctrl.keyword;
      // }
      var number = $routeParams.num;
      var orderProp = $routeParams.orderBy;
      $location.path('/LiveHealthy2020/search').search({q: keyword, num: pageSize, orderBy: orderProp});
      //$location.url(url);
      //$window.location.href('/search');
      //$window.location.reload();
    };
  }
});
