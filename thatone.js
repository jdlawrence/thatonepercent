var starting = 100;
var ending = 110;
var timePeriod = 1;
var rate = 10.0;
var numBuckets = 20;
var buckets = [];

// Calculate interest with given parameters
// ending = Number(starting * Math.pow(1 + rate / 100, timePeriod)).toFixed(2);

var app = angular.module('thatone', []);

app.controller('inputCtrl', ['$scope', function($scope) {
  $scope.inputs = {
    starting: starting,
    timePeriod: timePeriod,
    rate: rate
  };
  $scope.buckets = [];

  // 'ending' value is calculated any time there's a change on any of the input values
  $scope.$watchCollection('inputs', calcEnding);
  function calcEnding(inputs) {
    $scope.ending = Number($scope.inputs.starting * Math.pow(1 + $scope.inputs.rate / 100, $scope.inputs.timePeriod)).toFixed(2);
    $scope.dataToGraph = [];
    var timeXValue = 0;
    var amountYValue = 0;

    // Generate an array of ending values based on time divided into buckets
    for (var i = 0; i < numBuckets; i++) {
      time = Number($scope.inputs.timePeriod / numBuckets * i).toFixed(2);
      amountYValue = Number($scope.inputs.starting * Math.pow(1 + $scope.inputs.rate / 100, time)).toFixed(2);
      $scope.dataToGraph.push({
        time : time,
        amount: amountYValue
      });
    }
    console.log('bu************ckets', $scope.dataToGraph);

  }

}]);

app.directive("expGraph", function($window) {
  return{
    restrict: "EA",
    template: "<svg width='850' height='200'></svg>",
    link: function(scope, elem, attrs){

      // var endingAmounts=scope[attrs.chartData];
      // var padding = 20;
      // var pathClass = "path";
      // var xScale, yScale, xAxisGen, yAxisGen, lineFun;

      // var d3 = $window.d3;
      // var rawSvg = elem.find("svg")[0];
      // var svg = d3.select(rawSvg);
    }
  };
});