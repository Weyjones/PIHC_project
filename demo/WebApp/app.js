function ctrl($scope, $http){
  $scope.categories = ['A', 'B', 'C'];
  $scope.getAddresses = function(category) {
    $http({
        method: 'GET',
        //url: 'https://pihc-pihccommunity.cs61.force.com/members/services/apexrest/engagement?category=' + category,
        url: 'https://weizong-developer-edition.na40.force.com/services/apexrest/nutrition?category=' + category,
    }).then(function successCallback(response) {
            $scope.addresses = response.data;
        }, function errorCallback(response) {
            console.log(response);
    });
  }
}
