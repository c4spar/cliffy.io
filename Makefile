.DEFAULT_GOAL := serve

include .env
export

lint:
	deno lint
fmt:
	deno fmt
serve:
	deno run --watch=. --allow-env --allow-net --allow-read --import-map=import_map.json main.ts
prod:
	deno run --watch=. --allow-env --allow-net --allow-read main.ts

