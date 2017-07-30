'use strict';

var app = angular.module('LHsearch', ['ui.router', 'ngMap']);
app.config(function($stateProvider, $locationProvider) {
    var states = [
        {
            name: 'search',
            url: '/',
            component: 'searchWidget'
        },
        {
            name: 'detail',
            url: '/detail/:programId',
            component: 'searchDetail'
        }];

    states.forEach(function(state) {
        $stateProvider.state(state);
    });
});

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchwidget.template.html',
    controller: function PrpgramListController($scope, $http, dataCache, $timeout, $location) {
        var $ctrl = this;
        //console.log($location);
        $ctrl.orderProp = 'Name';
        //$ctrl.keyword = $routeParams.q;

        $ctrl.openDetailPage = function(program) {
            var url = '/detail/' + program.Id;
            $location.url(url);
        };

        function successCallback(response) {
            dataCache.setProgramCache(response.data);
            $ctrl.programs = response.data;
            //console.log($ctrl.programs);
        }

        function errorCallback(response) {
            console.log(response);
        }

        if (dataCache.isEmpty()) {
            $http.get('../../wp-content/plugins/livehealthy-search/programs.json').then(successCallback, errorCallback);
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
            $http.get('../../wp-content/plugins/livehealthy-search/programs.json').then(successCallback, errorCallback);
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
