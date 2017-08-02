'use strict';

var app = angular.module('LWLsearch', ['ui.router', 'ngMap']);
app.config(function($stateProvider, $locationProvider) {
    var states = [
        {
            name: 'search',
            url: '/?query&location',
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
    controller: function PrpgramListController($scope, $http, dataCache, $timeout, $location, $stateParams) {
        function successCallback(response) {
            dataCache.setProgramCache(response.data);
            $ctrl.programs = response.data;
            console.log($ctrl.programs);
            //populateLatLong(0);
        }

        function populateLatLong(i) {
            var program = $ctrl.programs[i];
            codeAddress(program, i);
        };

        function codeAddress(program, i) {

            var address = '';
            if (program.Address__c) {
              address += program.Address__c + ',';
            }
            if (program.City__c) {
              address += program.City__c + ', ';
            }
            if (program.State__c) {
              address += program.State__c + ' ';
            }
            if (program.Postal_Code__c) {
              address += program.Postal_Code__c;
            }

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode( { 'address': address}, function(results, status) {
                if (status == 'OK') {
                    var location = results[0].geometry.location;
                    var latlng = "[" + location.lat() + ", " + location.lng() + "]";
                    program.lat = location.lat();
                    program.long = location.lng();
                    console.log(address);
                    console.log(program.lat + ' ' + program.long);
                    updateLatLng(program);
                  }
                  if (i < $ctrl.programs.length - 1) {
                    setTimeout(function() {
                      populateLatLong(i+1);
                    }, 1000);
                  }
            });
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
            var url = 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/setLatLongbyId';
            var requestUrl = url + '?id=' + parameter.id + '&lat='+ parameter.lat +'&long=' + parameter.long;
            //console.log(requestUrl);
            $http.post(requestUrl).then(updateSuccess, updateError);
        };
        //console.log($location);
        $ctrl.orderProp = '';
        $ctrl.keyword = $stateParams.query || '';
        console.log($stateParams);

        $ctrl.openDetailPage = function(program) {
            var url = '/detail/' + program.Id;
            $location.url(url);
        };

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/LWLsearchall').then(successCallback, errorCallback);
        } else {
            $ctrl.programs = dataCache.getProgramCache();
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
    templateUrl: '../../wp-content/plugins/livewell-search/searchdetail.template.html',
    controller: function PrpgramDetailController($scope, $http, dataCache, $stateParams, $location) {
        console.log($stateParams);
        var $ctrl = this;
        var programId = $stateParams.programId;
        function successCallback(response) {
            dataCache.setProgramCache(response.data);
            if (programId) {
                $ctrl.currentProgram = dataCache.findProgramById(programId);
                codeAddress($ctrl.currentProgram);
            }
        }
        function errorCallback(response) {
            console.log(response);
        }

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/LWLsearchall').then(successCallback, errorCallback);
        } else if (programId){
            $ctrl.currentProgram = dataCache.findProgramById(programId);
            codeAddress($ctrl.currentProgram);
        }

        $scope.backToSearch = function () {
            $location.url('/');
        };

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
  templateUrl: '../../wp-content/plugins/livewell-search/searchmapview.template.html',
  controller: function ($rootScope, $scope, $http, dataCache, $timeout, $location, $stateParams, NgMap) {
      function successCallback(response) {
          dataCache.setProgramCache(response.data);
          $ctrl.programs = response.data;
          setupMap();
          console.log($ctrl.programs);
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
          $http.get('https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/LWLsearchall').then(successCallback, errorCallback);
      } else {
          $ctrl.programs = dataCache.getProgramCache();
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
              $ctrl.map.showInfoWindow('map-lwl', program.Id);
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
