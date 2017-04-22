var searchModule = angular.module('searchModule',[]);

searchModule.controller('searchController',['$scope', function($scope){

$scope.searchQuery = "";

$scope.Search = function(){

	var dataString ={ "SearchString" : $scope.searchQuery};
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


};

}]);