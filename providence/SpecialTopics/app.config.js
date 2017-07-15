'use strict';
angular
  .module('pihcApp')
  .config(['$locationProvider', '$routeProvider',
      function config($locationProvider, $routeProvider) {
        //$locationProvider.hashPrefix('!');
        $routeProvider.caseInsensitiveMatch = true;

        $routeProvider.
          when('/LiveHealthy2020', {
            template: '<lh2020-body></lh2020-body>'
          }).
          when('/LiveHealthy2020/search', {
            template: '<lh2020-search></lh2020-search>'
          }).
          when('/Providers', {
            template: '<app-detail></app-detail>'
          }).
          when('/LiveWell', {
            template: '<lwl-body></lwl-body>'
          }).
          otherwise('/LiveHealthy2020/search');

        //  $locationProvider.html5Mode(true);

      }
    ]);
