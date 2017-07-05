'use strict';

angular.module('search').
component('appSearch', {
  bindings:{
    type:'='
  },
  templateUrl: '/providence/component/search/search.template.html',
  controller: function SearchController($scope, $http) {
    var $ctrl = this;
    $http({
        method: 'GET',
        url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/LiveHealthy2020Search',
        //url: 'https://weizong-developer-edition.na40.force.com/services/apexrest/nutrition?category=' + category,
    }).then(function successCallback(response) {
            console.log(response.data);
            $scope.program = response.data;
        }, function errorCallback(response) {
            console.log(response);
    });
  }
});
