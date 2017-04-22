var regModule = angular.module('commonModule');

regModule.directive('myNavbardirective', function() {
  return {
    templateUrl: 'NavigationTemplate.html'
  };
});