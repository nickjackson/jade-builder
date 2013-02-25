node_modules:
	@npm install

test: node_modules
	@./node_modules/mocha/bin/mocha

.PHONY: test