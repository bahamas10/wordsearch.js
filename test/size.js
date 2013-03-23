var fs = require('fs');
var wordsearch = require('../');
var words = fs.readFileSync(__dirname + '/../example-words.txt', 'utf-8').split('\n');

var size = (process.argv[2] || '15x15').split('x');
var puzzle = wordsearch(words, +size[0], +size[1]);

console.log(size)
console.log('unplaced: %s', puzzle.unplaced);
puzzle.grid.forEach(function(row) {
  console.log(row.join(' '));
});
