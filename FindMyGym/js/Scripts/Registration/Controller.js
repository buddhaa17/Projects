var regModule   = angular.module('GymApp');

regModule.controller('registrationController', ['$scope','$http','Upload','$window', function($scope,$http,Upload,$window){



$scope.Aminities = [{'Id': '1','Name':'Main workout area','IsSelected' : 'false'},
					{'Id': '2','Name':'Personal Training','IsSelected' : 'false'},
					{'Id': '3','Name':'Cardio','IsSelected' : 'false'},
					{'Id': '4','Name':'Group Exercise / Aerobics','IsSelected' : 'false'},
					{'Id': '5','Name':'Steam Room','IsSelected' : 'false'},
					{'Id': '6','Name':'Parking','IsSelected' : 'false'},
					{'Id': '7','Name':'Swimming Pool','IsSelected' : 'false'},
					{'Id': '8','Name':'Massage','IsSelected' : 'false'},
					{'Id': '9','Name':'strength training','IsSelected' : 'false'},
					{'Id': '10','Name':'Free Weights','IsSelected' : 'false'}]


$scope.Aminitiess = ['Main workout area','Personal Training','Cardio','Group Exercise / Aerobics',
 'Steam Room',
 'Parking',
 'Swimming Pool',
 'Massage',
 'strength training',
 'Free Weights']

$scope.firstName ="";
$scope.lastName = "";
$scope.phoneNumber = "";
$scope.ownerAddress1= "";
$scope.ownerAddress2= "";
$scope.email = "";
$scope.gymName = "";
$scope.gymAddress1 = "";
$scope.gymAddress2 ="";
$scope.gymImageUrl1 = "images/Default_300_400.png";
$scope.gymImageUrl2 = "images/Default_300_400.png";
$scope.gymImageUrl3 = "images/Default_300_400.png";
$scope.gymImageUrl4 = "images/Default_300_400.png";
$scope.gymDescription="";

$scope.gymDetailsTab ="";

$scope.ValidateAndMoveNext = function () {

var isInvalid = false;
if($scope.firstName == "")
{
	angular.element('#error-firstName').addClass("show");
	isInvalid = true;
}
else
{
	angular.element('#error-firstName').removeClass("show");
}
if($scope.lastName == "")
{
	angular.element('#error-lastName').addClass("show");
	isInvalid = true;
}
else
{
	angular.element('#error-lastName').removeClass("show");
}
if($scope.email == "")
{
	angular.element('#error-email').addClass("show");
	isInvalid = true;
}
else
{
	angular.element('#error-email').removeClass("show");
}
0
if(isInvalid)
return;
	
angular.element('#service-two').addClass("active in");

angular.element('#service-one').removeClass("active in");

angular.element('#service-one-link').removeClass("active");

angular.element('#service-two-link').addClass("active");

}


$scope.ValidateAndNextToImages = function(){

	var isInvalid = false;
	if($scope.gymName =="")
	{
			angular.element('#error-gymName').addClass("show");
			isInvalid = true;
	}
	else
	{
			angular.element('#error-gymName').removeClass("show");
	}

	if($scope.gymAddress1 =="")
	{

			angular.element('#error-address1').addClass("show");
			isInvalid = true;
	}
	else
	{
			angular.element('#error-address1').removeClass("show");
	}

	if($scope.gymAddress2 =="")
	{

			angular.element('#error-address2').addClass("show");
			isInvalid = true;
	}
	else
	{
			angular.element('#error-address2').removeClass("show");
	}

	if(isInvalid)
		return;


angular.element('#service-three').addClass("active in");

angular.element('#service-two').removeClass("active in");

angular.element('#service-two-link').removeClass("active");

angular.element('#service-three-link').addClass("active");

}

$scope.ValidateAndMovetoTerms = function(){

angular.element('#service-four').addClass("active in");

angular.element('#service-three').removeClass("active in");

angular.element('#service-three-link').removeClass("active");

angular.element('#service-four-link').addClass("active");
};


$scope.DoRegister = function(){
	
var gymimages = [{'type': 'Primary','url':$scope.gymImageUrl1},
				 {'type': 'Secondary','url':$scope.gymImageUrl2},
				 {'type': 'Secondary','url':$scope.gymImageUrl3},
				 {'type': 'Secondary','url':$scope.gymImageUrl4}
				 ];


	var dataString ={"fname" : $scope.firstName, "lname" : $scope.lastName, "email" : $scope.email,
					 "phoneNumber" : $scope.phoneNumber, "ownerAddress1" : $scope.ownerAddress1, "ownerAddress2" : $scope.ownerAddress2,
					 "gymName" : $scope.gymName, "gymAddress1" : $scope.gymAddress1, "gymAddress2" : $scope.gymAddress2,
					  "gymDescription" : $scope.gymDescription, "Aminities" : $scope.Aminities, "gymImages" : gymimages
					}

	var req = {
 				method: 'POST',
 				url: 'Php/register.php',
 				data: dataString
			}

			$http(req).then(function(data){

				if(data.data != null)
				{
					if(data.data.status)
						$window.location.href ="RegistrationComplete.html";

				}

			}, 
			function(data){

				console.log("Failure");

			});
};

$scope.onFileSelect = function($files, imageString) {
    //$files: an array of files selected, each file has name, size, and type.
console.log(imageString);

      var $file = $files[0];
      Upload.upload({
        url: 'Php/Upload.php',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        if(data.data == "Success")
        {
        	if(imageString == "gymImage1")
        		$scope.gymImageUrl1= "images/"+$file.name;
        	else if(imageString == "gymImage2")
        		$scope.gymImageUrl2= "images/"+$file.name;
        	else if(imageString == "gymImage3")
        		$scope.gymImageUrl3= "images/"+$file.name;
        	else if(imageString == "gymImage4")
        		$scope.gymImageUrl4= "images/"+$file.name;
        	
        	console.log($file);
        }

      }); 
    
}

$scope.Validate = function(controlName, inputValue)
{
	if(inputValue == undefined || inputValue == null || inputValue == "")
	{
		angular.element('#'+controlName).removeClass("has-success");
		angular.element('#'+controlName).addClass("has-error");
		angular.element('#error-'+controlName).addClass("show");

	}
	else
	{
		angular.element('#'+controlName).removeClass("has-error");
		angular.element('#'+controlName).addClass("has-success");
		angular.element('#error-'+controlName).removeClass("show");
	}

}


}])
