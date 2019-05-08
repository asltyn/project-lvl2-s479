install: 
	sudo npm install

start:
	sudo npx babel-node src/bin/gendiff.js

publish:
	npm publish

lint:
	npx eslint .

test:
	npm run test
