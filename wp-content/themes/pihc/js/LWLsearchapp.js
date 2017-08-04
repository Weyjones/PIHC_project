'use strict';

var app = angular.module('LWLsearch', ['ui.router', 'ngMap']);
app.config(function($stateProvider, $locationProvider) {
    var states = [
        {
            name: 'search',
            url: '/?query&location&topic&dimension',
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
})
.run(function($rootScope, NgMap) {
  NgMap.getMap().then(function(map) {
    $rootScope.map = map;
  });
});

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/livewell-search/searchwidget.template.html',
    controller: function PrpgramListController($scope, $http, dataCache, $timeout, $location, $stateParams, $state) {
        console.log($stateParams);
        function successCallback(response) {
            //dataCache.setProgramCache(response.data);

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
                LWL_Dimension__c: program.Program__r.LWL_Dimension__c,
                LWL_program_website__c: program.Program__r.LWL_program_website__c,
                LWL_Sub_category__c: program.Program__r.LWL_Sub_category__c,
                LWL_Topic__c: program.Program__r.LWL_Topic__c,
                LWL_Hours_of_Operation__c: program.Program__r.LWL_Hours_of_Operation__c
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
            setupTopicFilter();
            //populateLatLong(0);
        }

        function errorCallback(response) {
            console.log(response);
        }

        function updateSuccess(response) {
          console.log('success update:');
          console.log(response);
        }

        function updateError(response) {
          console.log('failed update:');
          console.log(response);
        }

        var $ctrl = this;
        var updateLatLng = function(program) {
            //var parameter = {id: 'a016100000CZFzKAAX', lat: 15, long: -144};
            var parameter = {id: program.Id, lat: program.lat, long: program.long};
            var url = 'https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getAllLocations';
            var requestUrl = url + '?id=' + parameter.id + '&lat='+ parameter.lat +'&long=' + parameter.long;
            $http.post(requestUrl).then(updateSuccess, updateError);
        };

        $ctrl.orderProp = '';
        $ctrl.keyword = $stateParams.query || '';
        console.log($stateParams);

        $ctrl.openDetailPage = function(program) {
            var url = '/detail/' + program.Id;
            $location.url(url);
        };

        if (dataCache.isProgramEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLWLProgram').then(successCallback, errorCallback);
        } else {
            $ctrl.programs = dataCache.getProgramCache();
            setupTopicFilter();
        }

        /************ Filter ********/
        var topicFilterValues = $stateParams.topic ? $stateParams.topic.split(',') : [];
        function setupTopicFilter() {
            for(var i in topicFilterValues) {
                var topic = topicFilterValues[i];
                var topicDimension = dataCache.getDimensionByTopic(topic);
                if (dimensions.indexOf(topicDimension) < 0) {
                    dimensions.push(topicDimension);
                }
            }
        }

        var dimensionFilterValues = $stateParams.dimension ? $stateParams.dimension.split(',') : [];
        var dimensions = dimensionFilterValues;

        //console.log(dimensions);
        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };
        var filterValuesIncluded = {
            'dimension': dimensions
        };

        var keyToPropMap = {
            'dimension': 'LWL_Dimension__c'
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

            var params = {};
            if (topicFilterValues.length > 0) {
                params.topic = topicFilterValues.join(',');
            }
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('search', params);
        };
        //var prop = keyToPropMap[key];
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
    templateUrl: '../../wp-content/plugins/livewell-search/searchdetail.template.html',
    controller: function PrpgramDetailController($scope, $http, dataCache, $stateParams, $location) {
        console.log($stateParams);
        var $ctrl = this;
        var programId = $stateParams.programId;
        function successCallback(response) {
              //dataCache.setProgramCache(response.data);

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
                LWL_Dimension__c: program.Program__r.LWL_Dimension__c,
                LWL_program_website__c: program.Program__r.LWL_program_website__c,
                LWL_Sub_category__c: program.Program__r.LWL_Sub_category__c,
                LWL_Topic__c: program.Program__r.LWL_Topic__c
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


            //populateLatLong(0);

            if (programId) {
                $ctrl.currentProgram = dataCache.findProgramById(programId);
                getAdditionInfo();                //codeAddress($ctrl.currentProgram);
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
            if(program.LWL_Topic__c && program.LWL_Topic__c == $ctrl.currentProgram.LWL_Topic__c && program.ProgramId!=$ctrl.currentProgram.ProgramId){
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

        if (dataCache.isProgramEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLWLProgram').then(successCallback, errorCallback);


        } else if (programId){
            $ctrl.currentProgram = dataCache.findProgramById(programId);
            getAdditionInfo();
            //codeAddress($ctrl.currentProgram);
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
        //           }
        //       });
        //   }
      }
  });

app.component('searchMapview', {
  templateUrl: '../../wp-content/plugins/livewell-search/searchmapview.template.html',
  controller: function ($rootScope, $scope, $http, dataCache, $timeout, $location, $stateParams, NgMap) {
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
            LWL_Dimension__c: program.Program__r.LWL_Dimension__c,
            LWL_program_website__c: program.Program__r.LWL_program_website__c,
            LWL_Sub_category__c: program.Program__r.LWL_Sub_category__c,
            LWL_Topic__c: program.Program__r.LWL_Topic__c
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
        setupMap();
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

      if (dataCache.isProgramEmpty()) {
          $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLWLProgram').then(successCallback, errorCallback);

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
              console.log($ctrl.selectedProgram);
              $ctrl.map.showInfoWindow('map-lwl', $ctrl.selectedProgram.Id);
          };

          $ctrl.hideDetail = function() {
              $ctrl.map.hideInfoWindow('map-lwl');
          };
      }

      /************ Filter ********/
      var filterValuesIncluded = {
          'Dimension': [],
      };

      var keyToPropMap = {
          'Dimension': 'LWL_Dimension__c',
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
          console.log($stateParams);
          
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
    var topicToDimensionMap = {};
    function setupTopicMap() {
        for(var i in programCache) {
            var program = programCache[i];
            if (program.LWL_Topic__c && program.LWL_Dimension__c && !topicToDimensionMap[program.LWL_Topic__c]) {
                topicToDimensionMap[program.LWL_Topic__c] = program.LWL_Dimension__c;
            }
        }
    }
    return {
        isProgramEmpty: function() {
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
            setupTopicMap();
        },
        findProgramById: function (id) {
            for(var i in programCache){
                if(programCache[i].Id == id){
                    return programCache[i];
                }
            }
        },
        getDimensionByTopic: function (topic) {
            if (topicToDimensionMap[topic]) {
                return topicToDimensionMap[topic];
            }
        },
        getAllTopics: function () {
            return Object.keys(topicToDimensionMap);
        },
        getAllDimensions: function () {
            return Object.values(topicToDimensionMap);
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
