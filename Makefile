NAME = wordsearch

default: min
min:
	uglifyjs -cm --comments < $(NAME).js > $(NAME).min.js
clean:
	rm $(NAME).min.js
