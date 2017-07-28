'use strict';

var app = angular.module('LHsearch', ['ngRoute','ngMap'])
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $routeProvider.caseInsensitiveMatch = true;
      $routeProvider.
        when('/livehealthy2020/search', {
          template: '<search-widget></search-widget>'
        }).
        when('/livehealthy2020/detail', {
          template: '<search-detail></search-detail>'
        });
        //$locationProvider.html5Mode(true);
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
  ]);

  app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchwidget.template.html',
    //template: 'foo bar',
    controller: function PrpgramListController($scope, $http, $routeParams, dataCache, $timeout, $location) {
      var $ctrl = this;
      $ctrl.orderProp = 'Name';
      $ctrl.keyword = $routeParams.q;

      $ctrl.openDetailPage = function(program) {
        $location.url('/livehealthy2020/detail').search({name: program.Name, account: program.Account__c, address: program.Address__c});
      }

      //(function main() {
        if (dataCache.isEmpty()) {
          $http({
            method: 'GET',
            url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/searchall',
          }).then(function successCallback(response) {
            dataCache.setProgramCache(response.data);
            $ctrl.programs = response.data;
          }, function errorCallback(response) {
            console.log(response);
          });
        } else {
          $ctrl.programs = dataCache.getProgramCache();
        }
    //  }());

      /***************************************/
/*
      var LOAD_SIZE = 1;
      var TIMEOUT = 1000;
      function lazyLoadGeocoder(startIndex) {
        var endIndex = Math.min(startIndex + LOAD_SIZE, $ctrl.programs.length - 1);
        console.log(endIndex);
        for (var i = startIndex; i< endIndex; i++) {
          var program = $ctrl.programs[i];
          $ctrl.codeAddress(program)
        }
        if (endIndex < $ctrl.programs.length) {
          $timeout(lazyLoadGeocoder, TIMEOUT, true, endIndex);
        }
      }

      $ctrl.codeAddress = function(program) {
        var address = program.Address__c + program.City__c;
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            var location = results[0].geometry.location;
            var latlng = location.lat() + ", " + location.lng();

            $scope.$apply(function () {
              program.latlng = latlng;
            });

            console.log(program.Name + latlng);
            return location;
          } else {
            console.log(status);
          }
        });
      }
      */

    }
  });


app.component('searchDetail', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchDetail.template.html',
    //template: 'foo bar',
    controller: function PrpgramListController($scope, $http, $routeParams, dataCache) {
      var $ctrl = this;
      var programName = $routeParams.name;
      var programAccount = $routeParams.account;
      var programAddress = $routeParams.address;

      if (dataCache.isEmpty()) {
        $http({
            method: 'GET',
            url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/searchall',
        }).then(function successCallback(response) {
                dataCache.setProgramCache(response.data);
                $ctrl.currentProgram = dataCache.findProgramByName(programName,programAccount,programAddress);
            }, function errorCallback(response) {
                console.log(response);
        });
      } else {
        console.log('dataCache is updated');
        $ctrl.currentProgram = dataCache.findProgramByName(programName,programAccount,programAddress);
        console.log($ctrl.currentProgram);
      }
    }
  });

  app.component('searchFilter', {
      templateUrl: '../../wp-content/plugins/livehealthy-search/searchFilter.template.html',
    });

  app.factory('dataCache', function() {
    //var shinyNewServiceInstance;
    // factory function body that constructs shinyNewServiceInstance

      var programCache;

      return {
        isEmpty: function() {
          return programCache === undefined;
        },
        getProgramNumber: function() {
          return programCache === undefined? 0:programCache.length;
        },
        getProgramCache: function() {
          return programCache;
        },
        setProgramCache: function(state) {
          programCache = state;
        },
        findProgramByName: function(name, account, address ){
          for(var i in programCache){
            if(programCache[i].Name == name && programCache[i].Account__c == account && programCache[i].Address__c == address){
              return programCache[i];
            }
          }
        }
      };
  });
