'use strict';

var app = angular.module('LHsearch', ['ngRoute'])
.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      //$locationProvider.hashPrefix('!');
      $routeProvider.caseInsensitiveMatch = true;

      $routeProvider.
        when('/livehealthy2020/search/', {
          template: '<search-widget></search-widget>'
        });

      $locationProvider.html5Mode(true);
    }
  ]);

app.component('searchWidget', {
    templateUrl: '../../wp-content/plugins/livehealthy-search/searchwidget.template.html',
    //template: 'foo bar',
    controller: function PrpgramListController($http, $routeParams) {
      var $ctrl = this;
      $ctrl.orderProp = 'Name';
      $ctrl.keyword = $routeParams.q;

      $http({
          method: 'GET',
          url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/searchall',
      }).then(function successCallback(response) {

              $ctrl.programs = response.data;
              console.log($ctrl.programs);
              console.log($ctrl.keyword);
              //
          }, function errorCallback(response) {
              console.log(response);
      });

      var geocoder;
      var map;
      function initMap() {
        var uluru = {lat: -25.363, lng: 131.044};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        geocoder = new google.maps.Geocoder();
      }

      function codeAddress() {
        var address = document.getElementById('address').value;
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
          } else {
            console.log(status);
          }
        });
      }



      // (function(d, s, id) {
      //   var js, fjs = d.getElementsByTagName(s)[0];
      //   if (d.getElementById(id)) return;
      //   js = d.createElement(s); js.id = id;
      //   js.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxcqlp2yAzg0UeyqkZHCLebZx8Qq96XYk&callback=initMap";
      //   fjs.parentNode.insertBefore(js, fjs);
      // }(document, 'script', 'googlemap'));

    }
  });
