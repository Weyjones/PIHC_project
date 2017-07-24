'use strict';

var app = angular.module('LHsearch', ['ngRoute'])
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');
      $routeProvider.caseInsensitiveMatch = true;

      $routeProvider.
        when('/', {
          template: '<search-widget></search-widget>'
        });

      //$locationProvider.html5Mode(true);
    }
  ]);

app.component('searchWidget', {
    templateUrl: '/providence/lh_search_widgit/searchwidget.template.html',
    controller: function PhoneListController($http, $routeParams) {
      var $self = this;
      $self.orderProp = 'Name';

      $self.keyword = $routeParams.q;

      $http({
          method: 'GET',
          url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/searchall',
      }).then(function successCallback(response) {

              $self.programs = response.data;
              console.log($self.programs);
              console.log($self.keyword);
              //
          }, function errorCallback(response) {
              console.log(response);
      });

    }
  });
