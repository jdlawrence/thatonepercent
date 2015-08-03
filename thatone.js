var starting = 100;
var ending = 0;
var timePeriod = 10;
var rate = 8;

// Calculate interest with given parameters
ending = Number(starting * Math.pow(1 + rate / 100, timePeriod)).toFixed(2);

var app = angular.module('thatone', []);

app.controller('inputCtrl', ['$scope', function($scope) {
  $scope.inputs = {
    starting: starting,
    ending: ending,
    timePeriod: timePeriod,
    rate: rate
  };
  
  // console.log('input.value', $scope.inputs);


}]);
