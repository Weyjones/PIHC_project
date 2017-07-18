'use strict';

var app = angular.module('LHsearch', []);

app.component('searchWidget', {
    templateUrl: '/providence/lh_search_widgit/searchwidget.template.html',
    controller: function PhoneListController($http) {
      var self = this;
      self.orderProp = 'Name';

      $http.get('/providence/lh_search_widgit/programs.json').then(function(response) {
         self.programs = response.data;
      });
    }
  });
