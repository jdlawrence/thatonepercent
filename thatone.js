var starting = 100;
var ending = 110;
var timePeriod = 1;
var rate = 10.0;
var numBuckets = 20;

// Calculate interest with given parameters
// ending = Number(starting * Math.pow(1 + rate / 100, timePeriod)).toFixed(2);

var app = angular.module('thatone', []);

app.controller('inputCtrl', ['$scope', function($scope) {
  $scope.sampleData = [12,3,3,4,5];
  $scope.inputs = {
    starting: starting,
    timePeriod: timePeriod,
    rate: rate
  };
  $scope.endingAmounts = [];

  // 'ending' value is calculated any time there's a change on any of the input values
  $scope.$watchCollection('inputs', calcEnding);
  function calcEnding(inputs) {
    $scope.ending = Number($scope.inputs.starting * Math.pow(1 + $scope.inputs.rate / 100, $scope.inputs.timePeriod)).toFixed(2);
    var timeXValue = 0;
    var amountYValue = 0;

    // Generate an array of ending values based on time divided into buckets
    for (var i = 0; i < numBuckets; i++) {
      time = Number($scope.inputs.timePeriod / numBuckets * (i+1)).toFixed(2);
      amountYValue = Number($scope.inputs.starting * Math.pow(1 + $scope.inputs.rate / 100, time)).toFixed(2);
      $scope.endingAmounts.push(amountYValue);
    }
    // console.log('timeAmount', $scope.endingAmounts);

  }

}]);

app.directive("expGraph", function($parse, $window) {
  return{
    restrict: "E",
    template: "<svg width='850' height='200'></svg>",
    scope: false,
    link: function(scope, elem, attrs){
      // Variables end in D to different those in directive from those not in the directive
      var endingAmountsD = [];
      var timeD = 0;
      var rateD = 0;
      var startingD = 0;
      var endingAmountD = 0;


      console.log('scope', scope);  
      var exp = $parse(attrs.chartData);

      var dataToPlot = exp(scope); // Collect data from scope in controller


      // Directive Data updates when any input changes
      scope.$watchCollection('inputs', drawGraph);

      function drawGraph(){
        endingAmountsD = [];
        for (var i = 0; i < numBuckets; i++) {
          timeD = Number(dataToPlot.timePeriod / numBuckets * (i+1)).toFixed(2);
          endingAmountD = Number(dataToPlot.starting * Math.pow(1 + dataToPlot.rate / 100, timeD)).toFixed(2);
          endingAmountsD.push({i: timeD, end: endingAmountD});
        }
        console.log('timeD', timeD);
        console.log('dataToPlot', dataToPlot.starting);
        console.log('endingAmountsD', endingAmountsD);
      }


      // for (var i = 0; i < numBuckets; i++) {
      //   time = Number($scope.inputs.timePeriod / numBuckets * (i+1)).toFixed(2);
      //   amountYValue = Number($scope.inputs.starting * Math.pow(1 + $scope.inputs.rate / 100, time)).toFixed(2);
      //   $scope.endingAmounts.push(amountYValue);
      // }

      
    }
  };
});