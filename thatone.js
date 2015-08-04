var starting = 100;
var ending = 110;
var timePeriod = 10;
var rate = 10.0;
var numBuckets = 20;
var padding = 20;

// Calculate interest with given parameters
// ending = Number(starting * Math.pow(1 + rate / 100, timePeriod)).toFixed(2);

var app = angular.module('thatone', []);

app.controller('inputCtrl', ['$scope', '$interval', function($scope, $interval) {
  $scope.sampleData = [12,3,3,4,5];
  $scope.inputs = {
    starting: starting,
    timePeriod: timePeriod,
    rate: rate
  };
  $scope.endingAmounts = [];

  // $interval(function(){
  //   $scope.inputs.starting *= 1.00000;
  // }, 100);

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
    template: "<svg class='graph' width='800' height='500'></svg>",
    scope: false,
    link: function(scope, elem, attrs){
      // Variables end in D to different those in directive from those not in the directive
      var endingAmountsD = [];
      var timeD = 0;
      var rateD = 0;
      var startingD = 0;
      var endingAmountD = 0;

      var d3 = $window.d3;
      var rawSvg=elem.find('svg');
      var svg = d3.select(rawSvg[0]);


      console.log('scope', scope);  
      var exp = $parse(attrs.chartData);

      var dataToPlot = exp(scope); // Collect data from scope in controller


      // Directive Data updates when any input changes
      scope.$watchCollection('inputs', updateGraph);

      // Puts data in endingAmountsD object. Ready for graphing with D3 and SVG.
      function updateGraph(){
        endingAmountsD = [];
        for (var i = 0; i < numBuckets; i++) {
          timeD = Number(dataToPlot.timePeriod / numBuckets * (i+1)).toFixed(2);
          endingAmountD = Number(dataToPlot.starting * Math.pow(1 + dataToPlot.rate / 100, timeD)).toFixed(2);
          endingAmountsD.push({xVal: timeD, yVal: endingAmountD});
        }
        console.log('endingAmountsD', endingAmountsD);
        drawGraph();
      }

      function drawGraph() {
        // Selects all circles and appends
        svg.selectAll('*').remove();

        xScale = d3.scale.linear()
        .domain([endingAmountsD[0].xVal, endingAmountsD[endingAmountsD.length-1].xVal])
        .range([padding + 5, rawSvg.attr("width") - padding]);

        console.log(d3.max(endingAmountsD, function (d) {
          return d.yVal;
        }));
        yScale = d3.scale.linear().domain([0, d3.max(endingAmountsD, function (d) {
          return d.yVal;
        })])
        .range([rawSvg.attr("height") - padding, 0]);

        xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(endingAmountsD.length - 1);

        yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);           

        svg.selectAll("circle")
        .data(endingAmountsD)
        .enter()
        .append("circle")

        .attr("cx", function(d) {
          return xScale(d.xVal);
        })
        .attr("cy", function(d) {
          return yScale(d.yVal);
        })
        .attr("r", 3);

        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,470)")
        .call(xAxisGen);

        svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(40,0)")
        .attr("font-size", "10px")
        .call(yAxisGen);
        
      }


      
    }
  };
});