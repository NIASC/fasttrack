# The benefits of this makefile are not very big, but at least it gives a
# pointer in the right direction

build:
	npm run build

watch:
	npm run watch

test:
	npm test

install:
	npm install

run:
	nodemon

lint:
	npm run lint

.PHONY: build watch test install run lint
