var fs = require('fs');
var wordsearch = require('../');
var words = fs.readFileSync(__dirname + '/../example-words.txt', 'utf-8').split('\n');

var puzzle = wordsearch(words, 20, 20);

puzzle.solved.forEach(function(row) {
  row.forEach(function(letter) {
    process.stdout.write(' ' + (letter || ' ') + ' ');
  });
  console.log();
});
