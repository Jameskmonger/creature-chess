# =====

all: install build server
rebuild: build server

# =====

install:
	@echo "Setting up the project..."
	yarn install --immutable

build:
	@echo "Building the docker images..."
	docker compose -f docker-compose.yml build nodejs-base \
	&& docker compose -f docker-compose.yml build server-base web-base \
	&& docker compose -f docker-compose.yml build \
		server-game server-info web-game-builder manifest-builder nginx

server:
	@echo "Running the game..."
	docker compose -f docker-compose.yml up -d

reload:
	@echo "Reloading manifest + server..."
	docker compose -f docker-compose.yml up -d --force-recreate manifest-builder server-game

# Sanity-check creature-chess.json and creature-chess.dev.json, and run the manifest builder tests.
validate:
	@echo "Running buildManifest.js tests..."
	@node --test scripts/buildManifest.test.js
	@echo "Validating creature-chess.json..."
	@node scripts/buildManifest.js --strict creature-chess.json /tmp/cc-validate-prod.json
	@echo "Validating creature-chess.dev.json..."
	@node scripts/buildManifest.js --strict creature-chess.dev.json /tmp/cc-validate-dev.json
	@rm -f /tmp/cc-validate-prod.json /tmp/cc-validate-dev.json

logs:
	docker compose -f docker-compose.yml logs -f --tail=200

down:
	@echo "Stopping the game..."
	docker compose -f docker-compose.yml down

.PHONY: all rebuild install build server reload validate logs down
