'use strict';

var app = angular.module('LHsearch', ['ngRoute'])
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');
      $routeProvider.caseInsensitiveMatch = true;

      $routeProvider.
        when('/livehealthy2020/search/', {
          template: '<search-widget></search-widget>'
        });

      $locationProvider.html5Mode(true);
    }
  ]);

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/liveWell-search/searchwidget.template.html',
    //template: 'foo bar',
    controller: function PrpgramListController($http, $routeParams) {
      var $ctrl = this;
      $ctrl.orderProp = 'Name';
      $ctrl.keyword = $routeParams.q;

      $http({
          method: 'GET',
          url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/searchall',
      }).then(function successCallback(response) {

              $ctrl.programs = response.data;
              console.log($ctrl.programs);
              console.log($ctrl.keyword);
              //
          }, function errorCallback(response) {
              console.log(response);
      });

    }
  });
