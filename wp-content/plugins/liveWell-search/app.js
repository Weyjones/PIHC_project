'use strict';

var app = angular.module('LHsearch', ['ngRoute'])
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');
      $routeProvider.caseInsensitiveMatch = true;

      $routeProvider.
        when('/livewell/livewell-search/', {
          template: '<search-widget></search-widget>'
        });

      $locationProvider.html5Mode(true);
    }
  ]);

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/liveWell-search/searchwidget.template.html',
    //template: 'foo bar',
    controller: function PhoneListController($http, $routeParams) {
      console.log($routeParams.query);
      var self = this;
      self.orderProp = 'Name';

      $http.get('/providence/lh_search_widgit/programs.json').then(function(response) {
         self.programs = response.data;
      });
    }
  });
