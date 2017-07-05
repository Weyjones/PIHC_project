'use strict';

angular.module('helpfullink').
component('appHelpfullink', {
  bindings:{
    type:'='
  },
  templateUrl: '/providence/component/helpfullink/helpfullink.template.html',
  controller: function HelpfullinkController($http, $scope) {
    var $ctrl = this;
    $ctrl.orderProp = 'date';

    if($ctrl.type == 'LH2020'){
      $http({
              method: 'GET',
              url: 'http://localhost:8888/wp-json/wp/v2/LH2020helplink',
          }).then(function successCallback(response) {
                  $ctrl.links = response.data;
                  console.log($ctrl.links);

              }, function errorCallback(response) {
                  console.log(response);
          });
    } else if ($ctrl.type == 'LWL'){
      $http({
              method: 'GET',
              url: 'http://localhost:8888/wp-json/wp/v2/LWLhelplink',
          }).then(function successCallback(response) {
                  $ctrl.links = response.data;
                  console.log($ctrl.links);
              }, function errorCallback(response) {
                  console.log(response);
          });
    }

  }
});
