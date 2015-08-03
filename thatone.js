var STARTING = 100;
var ENDING = 0;
var TIME = 10;
var RATE = 8;

// Calculate interest with given parameters
ENDING = Math.roundSTARTING * Math.pow(1 + RATE / 100, TIME);

console.log('STARTING', STARTING, 'ENDING', ENDING);