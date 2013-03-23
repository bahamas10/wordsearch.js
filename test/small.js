var fs = require('fs');
var wordsearch = require('../');
var words = ['hi', 'ok'];

var puzzle = wordsearch(words, 3, 3, {color: true});

console.log('unplaced: %s', puzzle.unplaced);
puzzle.grid.forEach(function(row) {
  console.log(row.join(' '));
});
