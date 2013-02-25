#!/usr/bin/env node

var fs = require('fs');
var wordsearch = require('../');

var words = fs.readFileSync('/dev/stdin', 'utf-8').split('\n');

var puzzle = wordsearch(words, 20, 20, {color: true});

puzzle.grid.forEach(function(row) {
  console.log(row.join(' '));
});
