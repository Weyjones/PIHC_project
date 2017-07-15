'use strict';

angular.module('search')
.filter("searchFilter", function($filter){
  /**
   * Can search individual words in keyword. However, this doesn't work with itemsPerPage filter;
   */
    return function(inputArray, searchText){
        var wordArray = searchText ? searchText.toLowerCase().split(/\s+/) : [];
        var wordCount = wordArray.length;
        for(var i=0;i<wordCount;i++){
            inputArray = $filter('filter')(inputArray, wordArray[i]);
        }
        return inputArray;
    }
})
// .filter('highlight', function($sce) {
//     return function(text, phrase) {
//       if (phrase) {
//         var regex = new RegExp('('+phrase+')', 'gi');
//         text = text.replace(regex, '<mark>$1</mark>');
//       }
//
//       return $sce.trustAsHtml(text)
//     }
//   })
.component('searchResult', {
  templateUrl: '/providence/component/search/searchResult/searchResult.template.html',
  controller: function searchResultController($http, $scope, $routeParams, $sce, dataCache) {
    var $ctrl = this;
    $scope.orderProp = $routeParams.orderBy || '';

    $scope.keyword2 = $routeParams.q2 || '';

    $scope.pageSize = $routeParams.num || 10;

    console.log($scope.pageSize);

    var keyword = $routeParams.q;
    $scope.searchKeyword = keyword;

    $scope.highlightKeysInText = function(text) {
      var highLight = text;
      var tmparr = highLight.split(" ");

      if(keyword !== undefined){
        var keywordsArr = keyword.toLowerCase().split(" ");
        for(var i = 0; i < tmparr.length; i++){
          var word = tmparr[i];
          if(keywordsArr.includes(word.toLowerCase())){
            tmparr[i] = "<mark>"+word+"</mark>";
          }
        }
      }

      highLight = tmparr.join(" ");
      return $sce.trustAsHtml(highLight);
      // for all the words in text, if it is containted in searchKey, surround with <mark></mark>
      // e.g. searchKey = "foo bar", text = "alla foo blalbal bar", return "alla <mark>foo</mark> blalbal <mark>bar</mark>"
    };

    if(dataCache.isEmpty()){
      $http({
          method: 'GET',
          url: 'https://pihc-pihccommunity.cs91.force.com/members/services/apexrest/LiveHealthy2020Search',
          //url: 'https://weizong-developer-edition.na40.force.com/services/apexrest/nutrition?category=' + category,
      }).then(function successCallback(response) {

              $ctrl.programs = response.data;
              dataCache.setProgramCache(response.data);
              console.log($ctrl.programs);
              //
          }, function errorCallback(response) {
              console.log(response);
      });
    } else {
      $ctrl.programs = dataCache.getProgramCache();
    }


  }
});
