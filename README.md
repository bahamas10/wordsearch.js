wordsearch.js
=============

Generate wordsearch puzzles

![wordsearch.js](http://www.daveeddy.com/static/media/github/wordsearch.png)

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
[ [ ' ', ' ', ' ', ' ' ],
  [ ' ', 'i', ' ', ' ' ],
  [ 'h', ' ', ' ', ' ' ],
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
    - `opts.backwards`: the probability between 0 and 1 (inclusive) of placing words backwards, defaults to 0.5
    - `opts.letters`: a string of possible letters to use as filler, defaults to the alphabet

Use `opts.letters` to increase the probability of certain letters being included, for example:

``` js
opts.letters = 'aaaaaaaaaabcdefghijklmnopqrstuvxwz';
```

Will use all of the letters of the alphabet with a high probability of using the letter `a`.

Command Line
------------

Installation and usage

    $ npm install -g wordsearch
    $ wordsearch --help
    Usage: wordsearch [-f wordfile] [-d WidthxHeight] [options]

    Generate wordsearch puzzles

    options
      -c, --color        colorize the words in the puzzle, defaults to false
      -d, --dimensions   the dimensions of the puzzle, ex `-d 20`, `-d 10x8`, defaults to `20x20`
      -f, --file              a newline separated list of words to use, defaults to stdin
      -h, --help              print this message and exit
      -l, --lettes <abc..>    letters to use, defaults to the alphabet
      -s, --solved            print the solved puzzle as well as the actual puzzle
      -u, --updates           check for available updates
      -v, --version           print the version number and exit

Example

    $ wordsearch -f example-words.txt -d 10x10 -s
    failed to place 3 words: teenzone,whatever,skateboards
    solved
                       
    r e t w e e t s    
    c     y t r a p    
      h     m u s i c  
        i              
          l l s w a g  
          o l          
        o     i        
      c         n      
            l o l      

    puzzle for example-words.txt (8 words to find)
    k v w g x s a z e x
    r e t w e e t s j r
    c d p y t r a p y c
    n h g m m u s i c x
    s l i o s j q o e b
    n g v l l s w a g o
    w a d o l r e r z f
    y v o h y i e k m g
    z c s c z w n z f p
    d u w m l o l l i a
    swag
    party
    music
    cool
    retweets
    chillin
    lol


License
-------

MIT
