install: 
	sudo npm install

start:
	sudo npx babel-node src/bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .
