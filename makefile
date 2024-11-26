build:
	@echo "Zip all files"
	zip build-front.zip package.json package-lock.json .env Dockerfile docker-compose.yml vite.config.ts index.html postcss.config.js tailwind.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json
	zip -r build-front.zip src
	zip -r build-front.zip public