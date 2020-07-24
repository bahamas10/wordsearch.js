/**
 * wordsearch.js
 *
 * Generate a wordsearch puzzle
 *
 * Author: Dave Eddy <dave@daveeddy.com>
 * Date: 2/24/13
 * @preserve
 */

;(function () {
  const LETTERS = 'abcdefghijklmnopqrstuvwxyz'; // letters used for filler
  const WORD_RE = /^[a-z]+$/;                   // what a valid word looks like
  const MAX_ATTEMPTS = 20;                       // maximum amount of times to place a word

  /**
   * wordsearch
   *
   * generate a wordsearch puzzle
   */
  function wordsearch(words, width, height, opts) {
    if (!words || !words.length) return false;
    width = +width || 20;
    height = +height || 20;
    opts = opts || {};
    opts.backwards = opts.hasOwnProperty('backwards') ? opts.backwards : 0.5;
    opts.letters = opts.letters || LETTERS;

    // filter out any non-words
    words = words.filter(function (a) {
      return WORD_RE.test(a);
    });

    // sort the words by length (biggest first)
    words.sort(function (a, b) {
      return a.length < b.length ? -1 : 1;
    });

    // populate the grid with empty arrays
    const grid = new Array(height);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(width);
    }

    let placed = {};
    const unplaced = [];

    // loop the words
    let colorno = 0;
    for (let i = 0; i < words.length; i++) {
      let originalword = words[i];
      let word = originalword;

      // reverse the word if needed
      if (Math.random() < opts.backwards) {
        word = word.split('').reverse().join('');
      }

      // pick a random spot
      // try to place the word in the grid
      let attempts = 0;
      while (attempts < MAX_ATTEMPTS) {
        // determine the direction (up-right, right, down-right, down)
        const direction = Math.floor(Math.random() * 4);
        const info = directioninfo(word, direction, width, height);

        // word is too long, bail out
        if (info.maxx < 0 || info.maxy < 0 || info.maxy < info.miny || info.maxx < info.minx) {
          unplaced.push(originalword);
          break;
        }

        // random starting point
        let ox = Math.round(Math.random() * (info.maxx - info.minx) + info.minx);
        let x = ox;
        let oy = Math.round(Math.random() * (info.maxy - info.miny) + info.miny);
        let y = oy;

        // check to make sure there are no collisions
        let placeable = true;
        let count = 0;
        for (let l = 0; l < word.length; l++) {
          const charingrid = grid[y][x];

          if (charingrid) { // check if there is a character in the grid
            if (charingrid !== word.charAt(l)) {
              // not the same latter, try again
              placeable = false; // :(
              break;
            } else {
              // same letter! count it
              count++;
            }
          }
          // keep trying!
          y += info.dy;
          x += info.dx;
        }
        if (!placeable || count >= word.length) {
          attempts++;
          continue;
        }

        // the word was placeable if we make it here!
        // reset x and y and place it
        x = ox;
        y = oy;
        placed[originalword] = [];
        for (let l = 0; l < word.length; l++) {
          placed[originalword] = [...placed[originalword], [x, y]];
          grid[y][x] = word.charAt(l);
          // if (opts.color) grid[y][x] = '\033[' + (colorno + 41) + 'm' + grid[y][x] + '\033[0m';

          y += info.dy;
          x += info.dx;
        }
        break;
      } // end placement while loop

      if (attempts >= 20) unplaced.push(originalword);
      colorno = (colorno + 1) % 6;
    } // end word loop

    // the solved grid... XXX I hate this
    const solved = JSON.parse(JSON.stringify(grid));

    // put in filler characters
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (!grid[i][j]) {
          solved[i][j] = ' ';
          grid[i][j] = opts.letters.charAt(
            Math.floor(Math.random() * opts.letters.length)
          );
        }
      }
    }

    // give the user some stuff
    return {
      grid: grid,
      solved: solved,
      placed: placed,
      unplaced: unplaced
    };
  }

  /**
   * given an integer that represents a direction,
   * return an object with boundary information
   * and velocity
   */
  function directioninfo(word, direction, width, height) {
    // determine the bounds
    let minx = 0, miny = 0;
    let maxx = width - 1;
    let maxy = height - 1;
    let dx = 0, dy = 0;
    switch (direction) {
      case 0: // up-right
        maxy = height - 1;
        miny = word.length - 1;
        dy = -1;
        maxx = width - word.length;
        minx = 0;
        dx = 1;
        break;
      case 1: // right
        maxx = width - word.length;
        minx = 0;
        dx = 1;
        break;
      case 2: // down-right
        miny = 0;
        maxy = height - word.length;
        dy = 1;
        maxx = width - word.length;
        minx = 0;
        dx = 1;
        break;
      case 3: // down
        miny = 0;
        maxy = height - word.length;
        dy = 1;
        break;
      default: /* NOTREACHED */
        break;
    }
    return {
      maxx: maxx,
      maxy: maxy,
      minx: minx,
      miny: miny,
      dx: dx,
      dy: dy
    };
  }

  // export the function
  if (typeof exports === 'undefined') {
    window.wordsearch = wordsearch;
  } else {
    module.exports = wordsearch;
  }
})();
