'use strict';

var app = angular.module('LWLsearch', ['ui.router', 'ngMap']);
app.config(function($stateProvider) {
    var states = [
        {
            name: 'search',
            url: '/?query&orderBy&formatted_address&topic&dimension&lat&lng',
            component: 'searchWidget'
        },
        {
            name: 'detail',
            url: '/detail/:programId?query&orderBy&formatted_address&topic&dimension&lat&lng',
            component: 'searchDetail'
        },
        {
            name: 'mapview',
            url: '/mapview/?query&orderBy&formatted_address&topic&dimension&lat&lng',
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
        var $ctrl = this;
        $ctrl.allowSave = currentAuthor && currentAuthor.id > 0;
        $ctrl.orderProp = $stateParams.orderBy || '';
        $ctrl.keyword = $stateParams.query || '';

        $ctrl.openDetailPage = function(program) {
            //var url = '/detail/' + program.Id;
            //$location.url(url);
            var params = angular.copy($stateParams);
            if (program.Id){
                params.programId = program.Id;
            }
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('detail', params);
        };

        function successCallback(response) {
            $ctrl.programs = dataCache.transFormAndSaveData(response.data);
            dataCache.updateDistance($stateParams.lat, $stateParams.lng);
            setupTopicFilter();
        }

        if (dataCache.isProgramEmpty()) {

            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLWLProgram').then(successCallback, dataCache.errorCallback);
        } else {
            dataCache.updateDistance($stateParams.lat, $stateParams.lng);
            $ctrl.programs = dataCache.getProgramCache();

            setupTopicFilter();

        }

        $scope.openMapview = function(){
            //$location.url(/mapview/);
            //TODO: pass in query and location
            var params = angular.copy($stateParams);
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('mapview', params);
        };

        $scope.sendResult = function () {
            sentFilledResult();
        }

        $scope.outputPDF = function (programs) {
            // playground requires you to assign document definition to a variable called dd
            generatePDF(programs);
            pdfMake.createPdf(dd).open('LiveWellLocart_Program_Report.pdf');
        }
        $scope.downloadPDF = function (programs) {
            // playground requires you to assign document definition to a variable called dd
            generatePDF(programs);
            pdfMake.createPdf(dd).download('LiveWellLocart_Program_Report.pdf');
        }
        $scope.printPDF = function (programs) {
            // playground requires you to assign document definition to a variable called dd
            generatePDF(programs);
            pdfMake.createPdf(dd).print('LiveWellLocart_Program_Report.pdf');
        }

        /************ Filter ********/
        function setupTopicFilter() {
            for(var i in topicFilterValues) {
                var topic = topicFilterValues[i];
                var topicDimension = dataCache.getDimensionByTopic(topic);
                if (dimensionFilterValues.indexOf(topicDimension) < 0) {
                    dimensionFilterValues.push(topicDimension);
                }
            }
        }
        var topicFilterValues = $stateParams.topic ? $stateParams.topic.split(',') : [];
        var dimensionFilterValues = $stateParams.dimension ? $stateParams.dimension.split(',') : [];

        var myAddress = $stateParams.formatted_address;
        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };
        var filterValuesIncluded = {
            'dimension': dimensionFilterValues
        };

        var keyToPropMap = {
            'dimension': 'LWL_Dimension__c'
        };
        $scope.includeFilter = function (key, value) {
            var currentValues = filterValuesIncluded[key];

            var i = currentValues.indexOf(value);
            if (i > -1) {
                currentValues.splice(i, 1);
            } else {
                currentValues.push(value);
            }

            var params = angular.copy($stateParams);
            if (topicFilterValues.length > 0) {
                params.topic = topicFilterValues.join(',');
            }
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('search', params);
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
        $scope.updateOrderBy = function(value){
            $ctrl.orderProp = value;
            var params = angular.copy($stateParams);
            params.orderBy = $ctrl.orderProp;
            $state.go('search', params);
        };
        /*********** Favorite **********/
        $scope.addFavorite = dataCache.addFavorite;
        $scope.saveSearchURL = function() {
            var title = document.getElementById("searchName").value;
            var URL = document.URL;
            dataCache.saveSearchURL(title, URL);
        };
    }
});

app.component('searchDetail', {
    templateUrl: '../../wp-content/plugins/livewell-search/searchdetail.template.html',
    controller: function PrpgramDetailController($scope, $http, dataCache, $stateParams, $location, $state) {
        var $ctrl = this;
        $ctrl.allowSave = currentAuthor && currentAuthor.id > 0;
        var programId = $stateParams.programId;
        function successCallback(response) {
            $ctrl.programs = dataCache.transFormAndSaveData(response.data);
            dataCache.updateDistance($stateParams.lat, $stateParams.lng);
            if (programId) {
                $ctrl.currentProgram = dataCache.findProgramById(programId);
                getAdditionInfo();
            }
            setupTopicFilter();
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
            var params = angular.copy($stateParams);
            if (program.Id){
                params.programId = program.Id;
            }
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('detail', params);

            $ctrl.currentProgram = program;//dataCache.findProgramById(program.Id);;
            getAdditionInfo();
        };

        if (dataCache.isProgramEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLWLProgram').then(successCallback, dataCache.errorCallback);
        } else if (programId){
            dataCache.updateDistance($stateParams.lat, $stateParams.lng);

            $ctrl.currentProgram = dataCache.findProgramById(programId);
            getAdditionInfo();
            setupTopicFilter()
        }

        $scope.backToSearch = function () {
            //$location.url('/');
            var params = angular.copy($stateParams);
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('search', params);
        };

        /********Filter********/
        function setupTopicFilter() {
            for(var i in topicFilterValues) {
                var topic = topicFilterValues[i];
                var topicDimension = dataCache.getDimensionByTopic(topic);
                if (dimensionFilterValues.indexOf(topicDimension) < 0) {
                    dimensionFilterValues.push(topicDimension);
                }
            }
        }
        var topicFilterValues = $stateParams.topic ? $stateParams.topic.split(',') : [];
        var dimensionFilterValues = $stateParams.dimension ? $stateParams.dimension.split(',') : [];

        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };
        var filterValuesIncluded = {
            'dimension': dimensionFilterValues
        };
        $scope.updateOrderBy = function(value){
            $ctrl.orderProp = value;
            var params = angular.copy($stateParams);
            params.orderBy = $ctrl.orderProp;
            $state.go('detail', params);
        };

        /*********** Favorite **********/
        $scope.addFavorite = dataCache.addFavorite;
        $scope.saveSearchURL = function() {
            var title = document.getElementById("searchName").value;
            var URL = document.URL;
            dataCache.saveSearchURL(title, URL);
        };
    }
});

app.component('searchMapview', {
    templateUrl: '../../wp-content/plugins/livewell-search/searchmapview.template.html',
    controller: function ($rootScope, $scope, $http, dataCache, $timeout, $location, $stateParams, NgMap, $state) {
        function successCallback(response) {
            $ctrl.programs = dataCache.transFormAndSaveData(response.data);
            dataCache.updateDistance($stateParams.lat, $stateParams.lng);
            setupMap();
            setupTopicFilter();
        }

        var $ctrl = this;
        $ctrl.allowSave = currentAuthor && currentAuthor.id > 0;
        $ctrl.orderProp = $stateParams.orderBy || '';
        $ctrl.keyword = $stateParams.query || '';

        $ctrl.openDetailPage = function(program) {
            //var url = '/detail/' + program.Id;
            //$location.url(url);
            var params = angular.copy($stateParams);
            if (program.Id){
                params.programId = program.Id;
            }
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('detail', params);
        };

        if (dataCache.isProgramEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLWLProgram').then(successCallback, dataCache.errorCallback);

        } else {
            dataCache.updateDistance($stateParams.lat, $stateParams.lng);
            $ctrl.programs = dataCache.getProgramCache();

            setupMap();
            setupTopicFilter();
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


        $scope.sendResult = function () {
            sentFilledResult();
        }

        $scope.outputPDF = function (programs) {
            // playground requires you to assign document definition to a variable called dd
            generatePDF(programs);
            pdfMake.createPdf(dd).open('LiveWellLocart_Program_Report.pdf');
        }
        $scope.downloadPDF = function (programs) {
            // playground requires you to assign document definition to a variable called dd
            generatePDF(programs);
            pdfMake.createPdf(dd).download('LiveWellLocart_Program_Report.pdf');
        }
        $scope.printPDF = function (programs) {
            // playground requires you to assign document definition to a variable called dd
            generatePDF(programs);
            pdfMake.createPdf(dd).print('LiveWellLocart_Program_Report.pdf');
        }
        $scope.openListView = function(){
            var params = angular.copy($stateParams);
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('search', params);
        };
        /************ Filter ********/
        function setupTopicFilter() {
            for(var i in topicFilterValues) {
                var topic = topicFilterValues[i];
                var topicDimension = dataCache.getDimensionByTopic(topic);
                if (dimensionFilterValues.indexOf(topicDimension) < 0) {
                    dimensionFilterValues.push(topicDimension);
                }
            }
        }
        var topicFilterValues = $stateParams.topic ? $stateParams.topic.split(',') : [];
        var dimensionFilterValues = $stateParams.dimension ? $stateParams.dimension.split(',') : [];

        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };

        var filterValuesIncluded = {
            'dimension': dimensionFilterValues
        };

        var keyToPropMap = {
            'dimension': 'LWL_Dimension__c'
        };

        $scope.includeFilter = function (key, value) {
            var currentValues = filterValuesIncluded[key];

            var i = currentValues.indexOf(value);
            if (i > -1) {
                currentValues.splice(i, 1);
            } else {
                currentValues.push(value);
            }

            var params = angular.copy($stateParams);
            if (topicFilterValues.length > 0) {
                params.topic = topicFilterValues.join(',');
            }
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('mapview', params);

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

        $scope.updateOrderBy = function(value){
            $ctrl.orderProp = value;
            var params = angular.copy($stateParams);
            params.orderBy = $ctrl.orderProp;
            $state.go('mapview', params);
        };
        /*********** Favorite **********/
        $scope.addFavorite = dataCache.addFavorite;
        $scope.saveSearchURL = function() {
            var title = document.getElementById("searchName").value;
            var URL = document.URL;
            dataCache.saveSearchURL(title, URL);
        };
    }
});

app.factory('dataCache', function($http) {
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

    function errorCallback(response) {
        console.log(response);
    }

    function transFormAndSaveData(programLocations) {
        programCache = programLocations.map(dataMapper);
        setupTopicMap();
        // populated programs with data from fav_programs
        var favPromsURL = '/wp-json/wp/v2/favorite_program?author=' + currentAuthor.id;
        $http.get(favPromsURL).then(saveFavPrograms);

        return programCache;
    }

    function dataMapper(program) {
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

        return result;
    }
    function addFavorite(program) {
        if (!program.saved) {
            var data = {
                title: program.AccountName,
                excerpt: window.location.pathname + '#/detail/' + program.Id,
                status: "publish"
            };
            program.saved = true;
            var createPost = new XMLHttpRequest();
            createPost.open('POST', 'http://localhost:8888/wp-json/wp/v2/favorite_program');
            createPost.setRequestHeader('X-WP-Nonce', magicalData.nonce);
            createPost.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            createPost.send(JSON.stringify(data));
        }
    }

    function saveSearchURL(title, url){
        var data = {
            title: title,
            excerpt: url,
            status: "publish"
        };
        var createPost = new XMLHttpRequest();
        createPost.open('POST', 'http://localhost:8888/wp-json/wp/v2/saved_search');
        createPost.setRequestHeader('X-WP-Nonce', magicalData.nonce);
        createPost.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        createPost.send(JSON.stringify(data));
    }

    function saveFavPrograms(response) {
        var favPrograms = response.data;
        var favProgramIds = favPrograms.map(function (p) {
            var excerpt = p.excerpt.rendered;
            var excerptSplits = excerpt.substring(3, excerpt.length-5).split('/');
            return excerptSplits[excerptSplits.length-1];
        });

        programCache.forEach(function(p) {
            if(favProgramIds.indexOf(p.Id) > -1) {
                p.saved = true;
            }
        });
    }
    return {
        errorCallback: errorCallback,
        transFormAndSaveData: transFormAndSaveData,
        addFavorite: addFavorite,
        saveSearchURL: saveSearchURL,
        isProgramEmpty: function() {
            return programCache === undefined;
        },
        getProgramNumber: function() {
            return programCache === undefined? 0:programCache.length;
        },
        getProgramCache: function() {
            return programCache;
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
        findProgramByName: function(name, account, address ){
            for(var i in programCache){
                if(programCache[i].Name == name && programCache[i].Account__c == account && programCache[i].Address__c == address){
                    return programCache[i];
                }
            }
        },
        updateDistance: function(mylat, mylng) {
          for(var i in programCache){
              if(!programCache[i].distance && programCache[i].GeoInfo__Latitude__s && programCache[i].GeoInfo__Latitude__s && mylat && mylng){
                programCache[i].distance = distance(Number(mylat), Number(mylng), Number(programCache[i].GeoInfo__Latitude__s), Number(programCache[i].GeoInfo__Longitude__s));
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

function sentFilledResult(){
  var senderName = document.getElementById("senderName").value;

  var reciver = document.getElementById("reciver").value;

  var subject = document.getElementById("subject").value;

  var textbody = document.getElementById("textbody").value;

  var currentURL = window.location.href;
  textbody = textbody + '<br/>' + currentURL
  // var data = new FormData();
  // data.append('senderName', senderName);
  // data.append('reciver', reciver);
  // data.append('subject', subject);
  // data.append('textbody', textbody);

  $.post( "https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/sendResults", { senderName: senderName, reciver: reciver, subject: subject, textbody: textbody } ).done(function( data ) {
    alert( 'The email was sent successfully.' );
  });

}

var dd;
function generatePDF(programs){
  var printableRisks = [];

  programs.forEach(function(program){
      if(program.ProgramName){
          printableRisks.push({text: 'Program: '+program.ProgramName,fontSize:14,bold: true});
      }
      if(program.AccountName){
          printableRisks.push({text: 'Oranization: '+program.AccountName});
      }
      if(program.fullAddress){
          printableRisks.push({text: 'Address: '+program.fullAddress});
      }
      if(program.LWL_program_website__c){
          printableRisks.push({text: 'Website: '+program.LWL_program_website__c});
      }
      if(program.LWL_Hours_of_Operation__c){
          printableRisks.push({text: 'Offered at: '+program.LWL_Hours_of_Operation__c});
      }
      printableRisks.push({text: '  '});

  });
  var title = document.getElementById("dirTitle").value;

  var referredTo = document.getElementById("referredTo").value;
  if (referredTo){
    referredTo = 'Referred To: '+referredTo;
  }

  var date = document.getElementById("dirDatePrinted").value;

  var preparedBy = document.getElementById("preparedBy").value;
  if (preparedBy){
    preparedBy = 'Prepared By: '+preparedBy;
  }

  var description = document.getElementById("PDFdescription").value;

  dd = {
      footer: function(currentPage, pageCount) {

          return  { text: '© 2017 Providence Institute for a Healthier Community. All rights reserved.                          ' + currentPage + '/' + pageCount, alignment: 'center', margin: [0,10,0,0] };
      },

      content: [
          {
              columns: [
                  {
                      // auto-sized columns have their widths based on their content
                      width: '30%',
                      bold: true,
                      text: referredTo

                  },
                  {
                      // star-sized columns fill the remaining space
                      // if there's more than one star-column, available width is divided equally
                      width: '30%',
                      bold: true,
                      text: date
                  },

              ]
          },
          {   alignment: 'right',
              image: 'data:image/png;base64,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',
              width: 200,
              margin: [0,-20,0,0]
          },
          {
              columns: [
                  {
                      fontSize: 20,
                      bold: true,
                      width: '60%',
                      text: title,
                      margin: [0,-20,0,0]

                  }
              ]
          },

          {
              bold: true,
              text: preparedBy,
              width: 200,
              margin: [0,20,0,0]
          },
          {   fontSize:20,
              alignment: 'center',
              text: '________________________________________________________',
          },
          {
              bold: true,
              text: 'Description',
              width: 200,
              margin: [0,10,0,0]
          },

          {
              text: description,
          },

          {   fontSize:20,
              alignment: 'center',
              text: '________________________________________________________',
          },
          {   fontSize:12,
              alignment: 'center',
              text: ' ',
          },
          printableRisks,
          {   fontSize:12,
              alignment: 'center',
              text: ' ',
          },
      ],

      defaultStyle: {
          columnGap: 10,
      }
  }
}

var myAddress;
var mylat;
var mylng;

function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;
	var theta = lon1-lon2;
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") { dist = dist * 1.609344 };
	if (unit=="N") { dist = dist * 0.8684 };
	return dist.toFixed(0);
}


function getUrlParams(url) {
  var queryString = url.split("?")[1];
  var keyValuePairs = queryString.split("&");
  var keyValue, params = {};
  keyValuePairs.forEach(function(pair) {
    keyValue = pair.split("=");
    params[keyValue[0]] = decodeURIComponent(keyValue[1]).replace("+", " ");
});
  return params
}
var currentURL =  window.location.href;


var qd = getUrlParams(currentURL) ;

if(qd["query"]){
  document.getElementById("LWLautocomplete").value = qd["query"];
}
