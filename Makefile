install: 
	npm ci

dev:
	npm run dev

build:
	npm run build

test:
	npx vitest run

lint:
	npx eslint .

lint-fix:
	npx eslint . --fix