var starting = 100;
var ending = 110;
var timePeriod = 1;
var rate = 10.0;

// Calculate interest with given parameters
// ending = Number(starting * Math.pow(1 + rate / 100, timePeriod)).toFixed(2);

var app = angular.module('thatone', []);

app.controller('inputCtrl', ['$scope', function($scope) {
  $scope.inputs = {
    starting: starting,
    timePeriod: timePeriod,
    rate: rate
  };


  // 'ending' value is calculated any time there's a change on any of the input values
  // 
  $scope.$watchCollection('inputs', calcEnding);
  function calcEnding(inputs) {
    $scope.ending = Number($scope.inputs.starting * Math.pow(1 + $scope.inputs.rate / 100, $scope.inputs.timePeriod)).toFixed(2);
  }

}]);

