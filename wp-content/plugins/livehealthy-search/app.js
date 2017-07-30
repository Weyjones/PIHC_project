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
  }).
  when('/livehealthy2020/mapview', {
    template: '<search-mapview></search-mapview>'
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
        console.log($ctrl.programs);
      }, function errorCallback(response) {
        console.log(response);
      });
    } else {
      $ctrl.programs = dataCache.getProgramCache();
    }


    /***************filter function age***********/
    $scope.ageIncludes = [];

    $scope.includeAge = function(age) {
        var i = $.inArray(age, $scope.ageIncludes);
        if (i > -1) {
            $scope.ageIncludes.splice(i, 1);
        } else {
            $scope.ageIncludes.push(age);
        }
    }

    $scope.ageFilter = function(program) {
        var containAll = true;
        if ($scope.ageIncludes.length > 0) {
            //if ($.inArray(program.What_ages_do_you_reach__c, $scope.ageIncludes) < 0)
            $scope.ageIncludes.forEach(function(age){
              if(program.What_ages_do_you_reach__c){
                if (program.What_ages_do_you_reach__c.indexOf(age) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
    }

    /***************filter function gender***********/
    $scope.genderIncludes = [];

    $scope.includeGender = function(gender) {
        var i = $.inArray(gender, $scope.genderIncludes);
        if (i > -1) {
            $scope.genderIncludes.splice(i, 1);
        } else {
            $scope.genderIncludes.push(gender);
            console.log($scope.genderIncludes);
        }
    }

    $scope.genderFilter = function(program) {
        var containAll = true;
        if ($scope.genderIncludes.length > 0) {
            //if ($.inArray(program.What_genders_do_you_reach__c, $scope.genderIncludes) < 0)
            $scope.genderIncludes.forEach(function(gender){
              if(program.Do_you_serve__c){
                console.log(program.Do_you_serve__c.indexOf(gender));
                if (program.Do_you_serve__c.indexOf(gender) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
    }

    /***************filter function household***********/
    $scope.householdIncludes = [];

    $scope.includeHousehold = function(household) {
        var i = $.inArray(household, $scope.householdIncludes);
        if (i > -1) {
            $scope.householdIncludes.splice(i, 1);
        } else {
            $scope.householdIncludes.push(household);
        }
    }

    $scope.householdFilter = function(program) {
        var containAll = true;
        if ($scope.householdIncludes.length > 0) {
            //if ($.inArray(program.LH2020_Does_your_program_serve__c, $scope.householdIncludes) < 0)
            $scope.householdIncludes.forEach(function(household){
              if(program.LH2020_Does_your_program_serve__c){
                if (program.LH2020_Does_your_program_serve__c.indexOf(household) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
    }

    /***************filter function focus***********/
    $scope.focusIncludes = [];

    $scope.includeFocus = function(focus) {
        var i = $.inArray(focus, $scope.focusIncludes);
        if (i > -1) {
            $scope.focusIncludes.splice(i, 1);
        } else {
            $scope.focusIncludes.push(focus);
        }
    }

    $scope.focusFilter = function(program) {
        var containAll = true;
        if ($scope.focusIncludes.length > 0) {
            $scope.focusIncludes.forEach(function(focus){
              if(program.Program_Focus__c){
                if (program.Program_Focus__c.indexOf(focus) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
    }

    /***************filter function objective***********/
    $scope.objectiveIncludes = [];

    $scope.includeObjective = function(objective) {
        var i = $.inArray(objective, $scope.objectiveIncludes);
        if (i > -1) {
            $scope.objectiveIncludes.splice(i, 1);
        } else {
            $scope.objectiveIncludes.push(objective);
        }
    }

    $scope.objectiveFilter = function(program) {
        var containAll = true;
        if ($scope.objectiveIncludes.length > 0) {
            //if ($.inArray(program.Program_Objective__c, $scope.objectiveIncludes) < 0)
            $scope.objectiveIncludes.forEach(function(objective){
              if(program.Program_Objective__c){
                if (program.Program_Objective__c.indexOf(objective) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
    }

    /***************filter function type***********/
    $scope.typeIncludes = [];

    $scope.includeType = function(type) {
        var i = $.inArray(type, $scope.typeIncludes);
        if (i > -1) {
            $scope.typeIncludes.splice(i, 1);
        } else {
            $scope.typeIncludes.push(type);
        }
    }

    $scope.typeFilter = function(program) {
        var containAll = true;
        if ($scope.typeIncludes.length > 0) {
            //if ($.inArray(program.Program_Type__c, $scope.typeIncludes) < 0)
            $scope.typeIncludes.forEach(function(type){
              if(program.Program_Type__c){
                if (program.Program_Type__c.indexOf(type) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
    }

    /***************filter function ethnic***********/
    $scope.ethnicIncludes = [];

    $scope.includeEthnic = function(ethnic) {
        var i = $.inArray(ethnic, $scope.ethnicIncludes);
        if (i > -1) {
            $scope.ethnicIncludes.splice(i, 1);
        } else {
            $scope.ethnicIncludes.push(ethnic);
        }
    }

    $scope.ethnicFilter = function(program) {
        var containAll = true;
        if ($scope.ethnicIncludes.length > 0) {
            //if ($.inArray(program.Program_ethnic__c, $scope.ethnicIncludes) < 0)
            $scope.ethnicIncludes.forEach(function(ethnic){
              if(program.Sub_community_or_ethnic_group_reach__c){
                if (program.Sub_community_or_ethnic_group_reach__c.indexOf(ethnic) === -1){
                  containAll = false;
                }
              }
            });
        }
        if(containAll){
          return program;
        }else{
          return;
        }
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
  templateUrl: '../../wp-content/plugins/livehealthy-search/searchdetail.template.html',
  //template: 'foo bar',
  controller: function PrpgramDetailController($scope, $http, $routeParams, dataCache) {
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
        codeAddress($ctrl.currentProgram);
      }, function errorCallback(response) {
        console.log(response);
      });
    } else {
      $ctrl.currentProgram = dataCache.findProgramByName(programName,programAccount,programAddress);
      codeAddress($ctrl.currentProgram);
    }

    function codeAddress(program) {
      var address = program.Address__c + program.City__c;
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
          var location = results[0].geometry.location;
          var latlng = "[" + location.lat() + ", " + location.lng() + "]";

          $scope.$apply(function () {
            $ctrl.currentProgram.latlng = latlng;
          });
        }
      });
    }


  }
});

app.component('searchMapview', {
  templateUrl: '../../wp-content/plugins/livehealthy-search/searchmapview.template.html',
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
  }
});

app.component('searchFilter', {
  templateUrl: '../../wp-content/plugins/livehealthy-search/searchFilter.template.html',
  controller: function PrpgramFilterController($scope) {
    /***************filter function***********/
    $scope.ageIncludes = [];

    $scope.includeAge = function(age) {
        var i = $.inArray(age, $scope.ageIncludes);
        if (i > -1) {
            $scope.ageIncludes.splice(i, 1);
        } else {
            $scope.ageIncludes.push(age);
        }
    }

    $scope.ageFilter = function(program) {
        var containAll = true;
        if ($scope.ageIncludes.length > 0) {
            //if ($.inArray(program.What_ages_do_you_reach__c, $scope.ageIncludes) < 0)
            $scope.ageIncludes.forEach(function(age){
              if(program.What_ages_do_you_reach__c){
                if (program.What_ages_do_you_reach__c.indexOf(age) === -1){
                  containAll = false;
                }
              }
            });
        }
        return containAll ? program: undefined;
    }
  }
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
