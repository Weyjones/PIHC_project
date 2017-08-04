'use strict';

var app = angular.module('LHsearch', ['ui.router', 'ngMap']);
app.config(function($stateProvider, $locationProvider) {
    var states = [
        {
            name: 'search',
            url: '/?query&location&age',
            component: 'searchWidget'
        },
        {
            name: 'detail',
            url: '/detail/:programId',
            component: 'searchDetail'
        },
        {
            name: 'mapview',
            url: '/mapview/?query&location',
            component: 'searchMapview'
        }];

    states.forEach(function(state) {
        $stateProvider.state(state);
    });
});

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchwidget.template.html',
    controller: function PrpgramListController($scope, $http, dataCache, $timeout, $location, $stateParams) {

      function successCallback(response) {
        var programLocations = response.data;
        $ctrl.programs = programLocations.map(function(program) {
          var result = {
            Id: program.Id,
            Address__c: program.Address__c,
            City__c: program.City__c,
            State__c: program.Program__r.State__c,
            Zip_Postal_Code__c: program.Zip_Postal_Code__c,
            GeoInfo__Latitude__s: program.GeoInfo__Latitude__s,
            GeoInfo__Longitude__s: program.GeoInfo__Longitude__s,
            AccountId: program.Program__r.Account__r.Id,
            AccountName: program.Program__r.Account__r.Name,
            ProgramId: program.Program__r.Id,
            ProgramName: program.Program__r.Name,
            Description__c: program.Program__r.Description__c,
            Program_Focus__c: program.Program__r.Program_Focus__c,
            Sub_community_or_ethnic_group_reach__c: program.Program__r.Sub_community_or_ethnic_group_reach__c,
            What_ages_do_you_reach__c: program.Program__r.What_ages_do_you_reach__c,
            Do_you_serve__c: program.Program__r.Do_you_serve__c,
            LH2020_Does_your_program_serve__c: program.Program__r.LH2020_Does_your_program_serve__c,
            Program_Type__c: program.Program__r.Program_Type__c,
            Program_Objective__c: program.Program__r.Program_Objective__c,
            Geographic_Scope__c: program.Program__r.Geographic_Scope__c
          };
          if(result.Address__c != 'Website Only'){
            var fullAddress = result.Address__c;
            if(result.City__c){
              fullAddress = fullAddress + ' ' + result.City__c;
            }
            if(result.State__c){
              fullAddress = fullAddress + ', ' + result.State__c;
            }
            if(result.Zip_Postal_Code__c){
              fullAddress = fullAddress + ', ' + result.Zip_Postal_Code__c;
            }
            result.fullAddress = fullAddress;
          }
          if(result.GeoInfo__Latitude__s && result.GeoInfo__Longitude__s){
            result.latlng = '['+result.GeoInfo__Latitude__s+','+result.GeoInfo__Longitude__s+']';
          }
          return result;
        });
        console.log($ctrl.programs);
        dataCache.setProgramCache($ctrl.programs);
      }

        function errorCallback(response) {
            console.log(response);
        }

        var $ctrl = this;

        //console.log($location);
        $ctrl.orderProp = '';
        $ctrl.keyword = $stateParams.query || '';
        console.log($stateParams);

        $ctrl.openDetailPage = function(program) {
            var url = '/detail/' + program.Id;
            $location.url(url);
        };

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLHProgram').then(successCallback, errorCallback);
        } else {
            $ctrl.programs = dataCache.getProgramCache();
        }

        /************ Filter ********/
        var filterValuesIncluded = {
            'age': [],
            'gender': [],
            'household': [],
            'focus': [],
            'objective': [],
            'type': [],
            'ethnic': []
        };

        var keyToPropMap = {
            'age': 'What_ages_do_you_reach__c',
            'gender': 'Do_you_serve__c',
            'household': 'LH2020_Does_your_program_serve__c',
            'focus': 'Program_Focus__c',
            'objective': 'Program_Objective__c',
            'type': 'Program_Type__c',
            'ethnic': 'Sub_community_or_ethnic_group_reach__c'
        };

        $scope.includeFilter = function (key, value) {
            var currentValues = filterValuesIncluded[key];

            //var i = $.inArray(value, currentValues);
            var i = currentValues.indexOf(value);
            if (i > -1) {
                currentValues.splice(i, 1);
            } else {
                currentValues.push(value);
            }

            for(var key in filterValuesIncluded) {
                console.log(key + ":" + filterValuesIncluded[key]);
            }
        };
        $scope.programFilter = function(program) {
            var containAll = true;

            for(var key in filterValuesIncluded) {
                if (containAll) {
                    var selectedValues = filterValuesIncluded[key];
                    var prop = keyToPropMap[key];
                    if (selectedValues.length > 0 && program[prop]) {
                        var programValue = program[prop];
                        for (var i in selectedValues) {
                            if (containAll) {
                                var v = selectedValues[i];
                                if (programValue.indexOf(v) === -1) {
                                    containAll = false;
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if(containAll){
                return program;
            }else{
                return;
            }
        };
    }

});

app.component('searchDetail', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchdetail.template.html',
    controller: function PrpgramDetailController($scope, $http, dataCache, $stateParams, $location) {
        console.log($stateParams);
        var $ctrl = this;
        var programId = $stateParams.programId;
        function successCallback(response) {
          var programLocations = response.data;
          $ctrl.programs = programLocations.map(function(program) {
            var result = {
              Id: program.Id,
              Address__c: program.Address__c,
              City__c: program.City__c,
              State__c: program.Program__r.State__c,
              Zip_Postal_Code__c: program.Zip_Postal_Code__c,
              GeoInfo__Latitude__s: program.GeoInfo__Latitude__s,
              GeoInfo__Longitude__s: program.GeoInfo__Longitude__s,
              AccountId: program.Program__r.Account__r.Id,
              AccountName: program.Program__r.Account__r.Name,
              ProgramId: program.Program__r.Id,
              ProgramName: program.Program__r.Name,
              Description__c: program.Program__r.Description__c,
              Program_Focus__c: program.Program__r.Program_Focus__c,
              Sub_community_or_ethnic_group_reach__c: program.Program__r.Sub_community_or_ethnic_group_reach__c,
              What_ages_do_you_reach__c: program.Program__r.What_ages_do_you_reach__c,
              Do_you_serve__c: program.Program__r.Do_you_serve__c,
              LH2020_Does_your_program_serve__c: program.Program__r.LH2020_Does_your_program_serve__c,
              Program_Type__c: program.Program__r.Program_Type__c,
              Program_Objective__c: program.Program__r.Program_Objective__c,
              Geographic_Scope__c: program.Program__r.Geographic_Scope__c
            };
            if(result.Address__c != 'Website Only'){
              var fullAddress = result.Address__c;
              if(result.City__c){
                fullAddress = fullAddress + ' ' + result.City__c;
              }
              if(result.State__c){
                fullAddress = fullAddress + ', ' + result.State__c;
              }
              if(result.Zip_Postal_Code__c){
                fullAddress = fullAddress + ', ' + result.Zip_Postal_Code__c;
              }
              result.fullAddress = fullAddress;
            }
            if(result.GeoInfo__Latitude__s && result.GeoInfo__Longitude__s){
              result.latlng = '['+result.GeoInfo__Latitude__s+','+result.GeoInfo__Longitude__s+']';
            }
            return result;
          });
          console.log($ctrl.programs);
          dataCache.setProgramCache($ctrl.programs);
            if (programId) {
                $ctrl.currentProgram = dataCache.findProgramById(programId);
                //codeAddress($ctrl.currentProgram);
                getAdditionInfo();
            }
        }
        function errorCallback(response) {
            console.log(response);
        }

        function getAdditionInfo(){
          $ctrl.currentProgram.otherLocations = [];

          $ctrl.currentProgram.otherServices = [];
          $ctrl.currentProgram.relatedServices = [];
          if(!$ctrl.programs){
            $ctrl.programs = dataCache.getProgramCache();
          }
          for(var i in $ctrl.programs){
            var program = $ctrl.programs[i];
            if(program.ProgramId == $ctrl.currentProgram.ProgramId && program.Id!=$ctrl.currentProgram.Id){
              $ctrl.currentProgram.otherLocations.push(program);
            }
            if(program.AccountName == $ctrl.currentProgram.AccountName && program.ProgramId!=$ctrl.currentProgram.ProgramId){
              $ctrl.currentProgram.otherServices.push(program);
            }
            if(program.Program_Focus__c && program.Program_Focus__c == $ctrl.currentProgram.Program_Focus__c && program.ProgramId!=$ctrl.currentProgram.ProgramId){
              $ctrl.currentProgram.relatedServices.push(program);
            }
          }
        }

        $ctrl.openDetailPage = function(program) {
            var url = '/detail/' + program.Id;
            $location.url(url);
            $ctrl.currentProgram = program;//dataCache.findProgramById(program.Id);;
            getAdditionInfo();
        };

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLHProgram').then(successCallback, errorCallback);
        } else if (programId){
            $ctrl.currentProgram = dataCache.findProgramById(programId);
            //codeAddress($ctrl.currentProgram);
            getAdditionInfo();
        }

        $scope.backToSearch = function () {
            $location.url('/');
        };

        // function codeAddress(program) {
        //     var address = program.Address__c + program.City__c;
        //     var geocoder = new google.maps.Geocoder();
        //     geocoder.geocode( { 'address': address}, function(results, status) {
        //         if (status == 'OK') {
        //             var location = results[0].geometry.location;
        //             var latlng = "[" + location.lat() + ", " + location.lng() + "]";
        //
        //             $scope.$apply(function () {
        //                 $ctrl.currentProgram.latlng = latlng;
        //             });
        //         }
        //     });
        // }
    }
});

app.component('searchMapview', {
  templateUrl: '../../wp-content/plugins/livehealthy-search/searchmapview.template.html',
  controller: function ($scope, $http, dataCache, $timeout, $location, $stateParams, NgMap) {
      function successCallback(response) {
        var programLocations = response.data;
        $ctrl.programs = programLocations.map(function(program) {
          var result = {
            Id: program.Id,
            Address__c: program.Address__c,
            City__c: program.City__c,
            State__c: program.Program__r.State__c,
            Zip_Postal_Code__c: program.Zip_Postal_Code__c,
            GeoInfo__Latitude__s: program.GeoInfo__Latitude__s,
            GeoInfo__Longitude__s: program.GeoInfo__Longitude__s,
            AccountId: program.Program__r.Account__r.Id,
            AccountName: program.Program__r.Account__r.Name,
            ProgramId: program.Program__r.Id,
            ProgramName: program.Program__r.Name,
            Description__c: program.Program__r.Description__c,
            Program_Focus__c: program.Program__r.Program_Focus__c,
            Sub_community_or_ethnic_group_reach__c: program.Program__r.Sub_community_or_ethnic_group_reach__c,
            What_ages_do_you_reach__c: program.Program__r.What_ages_do_you_reach__c,
            Do_you_serve__c: program.Program__r.Do_you_serve__c,
            LH2020_Does_your_program_serve__c: program.Program__r.LH2020_Does_your_program_serve__c,
            Program_Type__c: program.Program__r.Program_Type__c,
            Program_Objective__c: program.Program__r.Program_Objective__c,
            Geographic_Scope__c: program.Program__r.Geographic_Scope__c
          };
          if(result.Address__c != 'Website Only'){
            var fullAddress = result.Address__c;
            if(result.City__c){
              fullAddress = fullAddress + ' ' + result.City__c;
            }
            if(result.State__c){
              fullAddress = fullAddress + ', ' + result.State__c;
            }
            if(result.Zip_Postal_Code__c){
              fullAddress = fullAddress + ', ' + result.Zip_Postal_Code__c;
            }
            result.fullAddress = fullAddress;
          }
          if(result.GeoInfo__Latitude__s && result.GeoInfo__Longitude__s){
            result.latlng = '['+result.GeoInfo__Latitude__s+','+result.GeoInfo__Longitude__s+']';
          }
          return result;
        });
        dataCache.setProgramCache($ctrl.programs);
          setupMap()
          console.log($ctrl.programs);
      }

      function errorCallback(response) {
          console.log(response);
      }

      var $ctrl = this;

      $ctrl.orderProp = '';
      $ctrl.keyword = $stateParams.query || '';
      console.log($stateParams);

      $ctrl.openDetailPage = function(program) {
          var url = '/detail/' + program.Id;
          $location.url(url);
      };

      if (dataCache.isEmpty()) {
          $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLHProgram').then(successCallback, errorCallback);
      } else {
          $ctrl.programs = dataCache.getProgramCache();
          setupMap();
      }
      /****** Info Window *********/
      function setupMap() {
          NgMap.getMap().then(function(map) {
              console.log('map', map);
              $ctrl.map = map;
          });

          $ctrl.clicked = function() {
              alert('Clicked a link inside infoWindow');
          };


          $ctrl.selectedProgram = $ctrl.programs[0];

          $ctrl.showDetail = function(e, program) {
              $ctrl.selectedProgram = program;
              $ctrl.map.showInfoWindow('map-lh', program.Id);
          };

          $ctrl.hideDetail = function() {
              $ctrl.map.hideInfoWindow('map-lh');
          };
      }
      /************ Filter ********/
      var filterValuesIncluded = {
          'age': [],
          'gender': [],
          'household': [],
          'focus': [],
          'objective': [],
          'type': [],
          'ethnic': []
      };

      var keyToPropMap = {
          'age': 'What_ages_do_you_reach__c',
          'gender': 'Do_you_serve__c',
          'household': 'LH2020_Does_your_program_serve__c',
          'focus': 'Program_Focus__c',
          'objective': 'Program_Objective__c',
          'type': 'Program_Type__c',
          'ethnic': 'Sub_community_or_ethnic_group_reach__c'
      };

      $scope.includeFilter = function (key, value) {
          var currentValues = filterValuesIncluded[key];

          //var i = $.inArray(value, currentValues);
          var i = currentValues.indexOf(value);
          if (i > -1) {
              currentValues.splice(i, 1);
          } else {
              currentValues.push(value);
          }

          for(var key in filterValuesIncluded) {
              console.log(key + ":" + filterValuesIncluded[key]);
          }
      };
      $scope.programFilter = function(program) {
          var containAll = true;

          for(var key in filterValuesIncluded) {
              if (containAll) {
                  var selectedValues = filterValuesIncluded[key];
                  var prop = keyToPropMap[key];
                  if (selectedValues.length > 0 && program[prop]) {
                      var programValue = program[prop];
                      for (var i in selectedValues) {
                          if (containAll) {
                              var v = selectedValues[i];
                              if (programValue.indexOf(v) === -1) {
                                  containAll = false;
                                  break;
                              }
                          }
                      }
                  }
              }
          }
          if(containAll){
              return program;
          }else{
              return;
          }
      };
  }
});

app.factory('dataCache', function() {
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
        findProgramById: function (id) {
            for(var i in programCache){
                if(programCache[i].Id == id){
                    return programCache[i];
                }
            }
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

app.filter('cut', function () {
    return function (value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace-1) === '.' || value.charAt(lastspace-1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || ' …');
    };
});
