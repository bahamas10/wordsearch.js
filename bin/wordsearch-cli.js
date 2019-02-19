#!/usr/bin/env node
/**
 * generate wordsearch puzzles on the command line
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 3/26/2013
 * License: MIT
 */

var fs = require('fs');

var getopt = require('posix-getopt');
var wordsearch = require('../');

var package = require('../package.json');

// usage
function usage() {
  return [
    'Usage: wordsearch [-f wordfile] [-d WidthxHeight] [options]',
    '',
    'Generate wordsearch puzzles',
    '',
    'options',
    '  -c, --color        colorize the words in the puzzle, defaults to false',
    '  -d, --dimensions   the dimensions of the puzzle, ex `-d 20`, `-d 10x8`, defaults to `20x20`',
    '  -f, --file              a newline separated list of words to use, defaults to stdin',
    '  -h, --help              print this message and exit',
    '  -l, --lettes <abc..>    letters to use, defaults to the alphabet',
    '  -s, --solved            print the solved puzzle as well as the actual puzzle',
    '  -u, --updates           check for available updates',
    '  -v, --version           print the version number and exit'
  ].join('\n');
}

// command line arguments
var options = [
  'c(color)',
  'd:(dimensions)',
  'f:(file)',
  'h(help)',
  'l:(letters)',
  's(solved)',
  'u(updates)',
  'v(version)'
].join('');
var parser = new getopt.BasicParser(options, process.argv);

var color = false;
var dimensions = 20;
var file;
var letters;
var solved = false;
while ((option = parser.getopt()) !== undefined) {
  switch (option.option) {
    case 'c': color = true; break;
    case 'd': dimensions = option.optarg; break;
    case 'f': file = option.optarg; break;
    case 'h': console.log(usage()); process.exit(0);
    case 'l': letters = option.optarg; break;
    case 's': solved = true; break;
    case 'u': // check for updates
      require('latest').checkupdate(package, function(ret, msg) {
        console.log(msg);
        process.exit(ret);
      });
      return;
    case 'v': console.log(package.version); process.exit(0);
    default: console.error(usage()); process.exit(1); break;
  }
}

// get words from the file
file = file || '/dev/stdin';
var words = fs.readFileSync(file, 'utf-8').split('\n');

// extract the dimensions
var _dimensions = dimensions.toString().split('x');
if (_dimensions.length < 2) _dimensions.push(_dimensions[0]);
var width = _dimensions[0];
var height = _dimensions[1];

// create the puzzle
var puzzle = wordsearch(words, width, height, {
    letters: letters,
    color: color
});

if (puzzle.unplaced.length)
  console.error('failed to place %d words: %s',
      puzzle.unplaced.length,
      puzzle.unplaced);

if (solved) {
  console.log('solved');
  puzzle.solved.forEach(function(row) {
    console.log(row.join(' '));
  });
  console.log();
}

var wordsused = words.filter(function(a) { return puzzle.unplaced.indexOf(a) === -1; });
// print the puzzle
console.log('puzzle for %s (%d words to find)', file, wordsused.length);
puzzle.grid.forEach(function(row) {
  console.log(row.join(' '));
});
console.log(wordsused.join('\n'));
