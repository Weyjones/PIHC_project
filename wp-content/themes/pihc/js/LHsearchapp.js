'use strict';

var app = angular.module('LHsearch', ['ui.router', 'ngMap']);
app.config(function($stateProvider) {
    var states = [
        {
            name: 'search',
            url: '/?query&location&age&gender&household&focus&objective&type&ethnic',
            component: 'searchWidget'
        },
        {
            name: 'detail',
            url: '/detail/:programId?query&location&age&gender&household&focus&objective&type&ethnic',
            component: 'searchDetail'
        },
        {
            name: 'mapview',
            url: '/mapview/?query&location&age&gender&household&focus&objective&type&ethnic',
            component: 'searchMapview'
        }];

    states.forEach(function(state) {
        $stateProvider.state(state);
    });
});

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchwidget.template.html',
    controller: function PrpgramListController($scope, $http, dataCache, $timeout, $location, $stateParams, $state) {

        function successCallback(response) {
            $ctrl.programs = dataCache.transFormAndSaveData(response.data);
        }

        var $ctrl = this;

        $ctrl.allowSave = currentAuthor && currentAuthor.id > 0;

        $ctrl.orderProp = '';
        $ctrl.keyword = $stateParams.query || '';

        $ctrl.openDetailPage = function(program) {
            //var url = '/detail/' + program.Id;
            //$location.url(url);
            //TODO: pass in query and location
            var params = {programId: program.Id};
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('detail', params);
        };

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLHProgram').then(successCallback, dataCache.errorCallback);
        } else {
            $ctrl.programs = dataCache.getProgramCache();
        }

        /************ Filter ********/
        var ageFilterValues = $stateParams.age ? $stateParams.age.split(',') : [];
        var genderFilterValues = $stateParams.gender ? $stateParams.gender.split(',') : [];
        var householdFilterValues = $stateParams.household ? $stateParams.household.split(',') : [];
        var focusFilterValues = $stateParams.focus ? $stateParams.focus.split(',') : [];
        var objectiveFilterValues = $stateParams.objective ? $stateParams.objective.split(',') : [];
        var typeFilterValues = $stateParams.type ? $stateParams.type.split(',') : [];
        var ethnicFilterValues = $stateParams.ethnic ? $stateParams.ethnic.split(',') : [];
        var filterValuesIncluded = {
            'age': ageFilterValues,
            'gender': genderFilterValues,
            'household': householdFilterValues,
            'focus': focusFilterValues,
            'objective': objectiveFilterValues,
            'type': typeFilterValues,
            'ethnic': ethnicFilterValues
        };
        var keyToPropMap = dataCache.getKeyToPropMap();
        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };
        $scope.expandFilterSection = function (key) {
            return filterValuesIncluded[key].length === 0;
        };
        $scope.includeFilter = function (key, value) {
            var currentValues = filterValuesIncluded[key];
            var i = currentValues.indexOf(value);
            if (i > -1) {
                currentValues.splice(i, 1);
            } else {
                currentValues.push(value);
            }

            var params = {};
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('search', params);
        };

        $scope.openMapview = function(){
            //$location.url(/mapview/);
            //TODO: pass in query and location
            var params = {};
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
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchdetail.template.html',
    controller: function PrpgramDetailController($scope, $http, dataCache, $stateParams, $location, $state) {
        var $ctrl = this;
        $ctrl.allowSave = currentAuthor && currentAuthor.id > 0;
        var programId = $stateParams.programId;
        function successCallback(response) {
            $ctrl.programs = dataCache.transFormAndSaveData(response.data);
            console.log($ctrl.programs);
            if (programId) {
                $ctrl.currentProgram = dataCache.findProgramById(programId);
                getAdditionInfo();
            }
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
            //var url = '/detail/' + program.Id;
            //$location.url(url);
            //TODO: pass in query and location
            var params = {programId: program.Id};
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('detail', params);
            $ctrl.currentProgram = program;
            getAdditionInfo();
        };

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLHProgram').then(successCallback, dataCache.errorCallback);
        } else if (programId){
            $ctrl.currentProgram = dataCache.findProgramById(programId);
            //codeAddress($ctrl.currentProgram);
            getAdditionInfo();
        }

        $scope.backToSearch = function () {
            var params = {};
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('search', params);
        };

        /*********Filter************/
        var ageFilterValues = $stateParams.age ? $stateParams.age.split(',') : [];
        var genderFilterValues = $stateParams.gender ? $stateParams.gender.split(',') : [];
        var householdFilterValues = $stateParams.household ? $stateParams.household.split(',') : [];
        var focusFilterValues = $stateParams.focus ? $stateParams.focus.split(',') : [];
        var objectiveFilterValues = $stateParams.objective ? $stateParams.objective.split(',') : [];
        var typeFilterValues = $stateParams.type ? $stateParams.type.split(',') : [];
        var ethnicFilterValues = $stateParams.ethnic ? $stateParams.ethnic.split(',') : [];
        var filterValuesIncluded = {
            'age': ageFilterValues,
            'gender': genderFilterValues,
            'household': householdFilterValues,
            'focus': focusFilterValues,
            'objective': objectiveFilterValues,
            'type': typeFilterValues,
            'ethnic': ethnicFilterValues
        };
        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };
        $scope.expandFilterSection = function (key) {
            return filterValuesIncluded[key].length === 0;
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
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchmapview.template.html',
    controller: function ($scope, $http, dataCache, $timeout, $location, $stateParams, NgMap, $state) {
        function successCallback(response) {
            $ctrl.programs = dataCache.transFormAndSaveData(response.data);
            setupMap();
        }

        var $ctrl = this;
        $ctrl.allowSave = currentAuthor && currentAuthor.id > 0;

        $ctrl.orderProp = '';
        $ctrl.keyword = $stateParams.query || '';
        console.log($stateParams);

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

        $ctrl.openDetailPage = function(program) {
            //var url = '/detail/' + program.Id;
            //$location.url(url);
            //TODO: pass in query and location
            var params = {programId: program.Id};
            for(var k in filterValuesIncluded) {
                params[k] = filterValuesIncluded[k].join(',');
            }
            $state.go('detail', params);
        };

        if (dataCache.isEmpty()) {
            $http.get('https://pihc-pihccommunity.cs21.force.com/members/services/apexrest/getLHProgram').then(successCallback, dataCache.errorCallback);
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
        var ageFilterValues = $stateParams.age ? $stateParams.age.split(',') : [];
        var genderFilterValues = $stateParams.gender ? $stateParams.gender.split(',') : [];
        var householdFilterValues = $stateParams.household ? $stateParams.household.split(',') : [];
        var focusFilterValues = $stateParams.focus ? $stateParams.focus.split(',') : [];
        var objectiveFilterValues = $stateParams.objective ? $stateParams.objective.split(',') : [];
        var typeFilterValues = $stateParams.type ? $stateParams.type.split(',') : [];
        var ethnicFilterValues = $stateParams.ethnic ? $stateParams.ethnic.split(',') : [];
        var filterValuesIncluded = {
            'age': ageFilterValues,
            'gender': genderFilterValues,
            'household': householdFilterValues,
            'focus': focusFilterValues,
            'objective': objectiveFilterValues,
            'type': typeFilterValues,
            'ethnic': ethnicFilterValues
        };
        var keyToPropMap = dataCache.getKeyToPropMap();
        $scope.checkFilter = function (key, value) {
            return filterValuesIncluded[key].indexOf(value) > -1;
        };
        $scope.expandFilterSection = function (key) {
            return filterValuesIncluded[key].length === 0;
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

    var keyToPropMap = {
        'age': 'What_ages_do_you_reach__c',
        'gender': 'Do_you_serve__c',
        'household': 'LH2020_Does_your_program_serve__c',
        'focus': 'Program_Focus__c',
        'objective': 'Program_Objective__c',
        'type': 'Program_Type__c',
        'ethnic': 'Sub_community_or_ethnic_group_reach__c'
    };

    function errorCallback(response) {
        console.log(response);
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
    }

    function getKeyToPropMap() {
        return keyToPropMap;
    }

    function transFormAndSaveData(programLocations) {
        programCache = programLocations.map(dataMapper);

        // populated programs with data from fav_programs
        var favPromsURL = '/wp-json/wp/v2/favorite_program?author=' + currentAuthor.id;
        $http.get(favPromsURL).then(saveFavPrograms);

        return programCache;
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
        getKeyToPropMap: getKeyToPropMap,
        isEmpty: function() {
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
        addFavorite: addFavorite,
        saveSearchURL: saveSearchURL,
        saveFavPrograms: saveFavPrograms,
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
