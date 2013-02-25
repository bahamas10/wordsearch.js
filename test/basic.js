var fs = require('fs');
var wordsearch = require('../');
var words = fs.readFileSync(__dirname + '/../words.txt', 'utf-8').split('\n');

var puzzle = wordsearch(words, 20, 20);

puzzle.grid.forEach(function(row) {
  console.log(row.join(' '));
});
