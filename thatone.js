var STARTING = 100;
var ENDING = 0;
var TIME = 10;
var RATE = 8;

// Calculate interest with given parameters
ENDING = Math.round(STARTING * Math.pow(1 + RATE / 100, TIME), 2);

console.log('STARTING', STARTING, 'ENDING', ENDING);