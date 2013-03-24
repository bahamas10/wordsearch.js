wordsearch.js
=============

Generate wordsearch puzzles

Usage
-----

In the browser

``` html
<script src="wordsearch.min.js"></script>
<!-- // defines wordsearch() -->
```

In Node.js

    npm install wordsearch

...and then

``` js
var wordsearch = require('wordsearch');
```

Example
-------

Create a simple wordsearch puzzle

``` js
> var wordsearch
> var search = wordsearch(['hi', 'dave'], 4, 4);
undefined
> search.grid
[ [ 't', 't', 'j', 'b' ],
  [ 'n', 'i', 's', 'w' ],
  [ 'h', 'd', 'i', 'q' ],
  [ 'd', 'a', 'v', 'e' ] ]
> search.grid.forEach(function(row) { console.log(row.join(' ')); } );
t t j b
n i s w
h d i q
d a v e
undefined
> search.solved
[ [ null, null, null, null ],
  [ null, 'i', null, null ],
  [ 'h', null, null, null ],
  [ 'd', 'a', 'v', 'e' ] ]
> search.solved.forEach(function(row) { console.log(row.join(' ')); } );
   
 i  
h   
d a v e
undefined
> search.unplaced
[]
```

### `var search = wordsearch(array, width = 20, height = 20, opts = {})`

- `array`: an array of words to put in the puzzle
- `width`: the width of the puzzle, defaults to 20
- `height`: the height of the puzzle, defaults to 20
- `opts`: an optional object for options
    - `opts.color`: color code (ANSI) the words in the puzzle, defaults to false
    - `opts.back

License
-------

MIT
