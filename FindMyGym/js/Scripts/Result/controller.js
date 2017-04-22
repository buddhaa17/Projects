var resultModule = angular.module('gymResult');

resultModule.controller('resultController',['$scope','$http', function($scope, $http){

$scope.items = [];

var dataString ={ "SearchQuery" : "Pune"};
	var req = {
 				method: 'POST',
 				url: 'Php/result.php',
 				data: dataString
			}

			$http(req).then(function(data){

				if(data.data != null)
				{
					$scope.items = data.data;
					console.log($scope.items);
				}

			}, 
			function(data){

				console.log("Failure");

			});

}]);

resultModule.controller('GymDetailsController',['$scope','$routeParams','$http', function($scope,$routeParams,$http){

var gymId = $routeParams.GymId;

$scope.GymDetails ={};
$scope.defaultImage ="";

$scope.ShowImage = function(url){

$scope.defaultImage = url;

};


var req = {
 				method: 'POST',
 				url: 'Php/GymDetails.php',
 				data: {"gymId":gymId}
			}

			$http(req).then(function(data){

				if(data.data != null)
				{
					$scope.GymDetails  = data.data;
					$scope.defaultImage = $scope.GymDetails.GymImages[0].Url;
					console.log($scope.GymDetails);
				}

			}, 
			function(data){

				console.log("Failure");

			});


}]);

resultModule.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/Gym/:GymId', {
    templateUrl: 'GymDetails.html',
    controller: 'GymDetailsController'
  })
   .when('/', {
    templateUrl: 'result.html',
    controller: 'resultController'
  })
   .when('#', {
    templateUrl: 'result.html',
    controller: 'resultController'
  })

});