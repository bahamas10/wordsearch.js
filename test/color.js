var fs = require('fs');
var wordsearch = require('../');
var words = fs.readFileSync(__dirname + '/../example-words.txt', 'utf-8').split('\n');

var puzzle = wordsearch(words, 20, 20, {color: true});

puzzle.grid.forEach(function(row) {
  console.log(row.join(' '));
});
