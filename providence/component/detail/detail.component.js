'use strict';

angular.module('detail').
component('appDetail', {
  templateUrl: '/providence/component/detail/detail.template.html',
  controller: function detailController($scope, $http, $routeParams, $sce, dataCache) {
    var $ctrl = this;
    var programName = $routeParams.program;

    if(dataCache.isEmpty()){
      $http({
          method: 'GET',
          url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/LiveHealthy2020Search',
          //url: 'https://weizong-developer-edition.na40.force.com/services/apexrest/nutrition?category=' + category,
      }).then(function successCallback(response) {
              dataCache.setProgramCache(response.data);
              $ctrl.currentProgram = dataCache.findProgramByName(programName);
            //  safeEmail($ctrl.currentProgram.Engagement_POC_Email__c;);
              console.log($ctrl.currentProgram);
              //
          }, function errorCallback(response) {
              console.log(response);
      });
    } else {
      console.log('dataCache is updated');
      $ctrl.currentProgram = dataCache.findProgramByName(programName);
      //safeEmail($ctrl.currentProgram.Engagement_POC_Email__c;);
      console.log(dataCache.getProgramCache());
      console.log($ctrl.currentProgram);
    }

    $scope.safeEmail = function(email){
      return $sce.trustAsHtml(email);
    }

  }
});
