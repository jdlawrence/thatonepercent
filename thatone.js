var starting = 100;
var ending = 0;
var timePeriod = 10;
var rate = 8;

// Calculate interest with given parameters
ending = Number(starting * Math.pow(1 + rate / 100, timePeriod)).toFixed(2);

var app = angular.module('thatone', []);
  
app.controller('input', ['$scope', function($scope) {
  $scope.test = 'something';

  $scope.starting = starting;
  $scope.ending = ending;
  $scope.timePeriod = timePeriod;
  $scope.rate = rate;

}]);