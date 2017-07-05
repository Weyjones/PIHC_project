'use strict';

angular.module('searchbar').
component('appSearchbar', {
  bindings:{
    type:'=',
    doSearch:'='
  },
  templateUrl: '/providence/component/search/searchbar.template.html',
  controller: function SearchController($scope) {
    var $ctrl = this;
  }
});
