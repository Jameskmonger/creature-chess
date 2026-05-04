# =====

all: install build server
rebuild: build server

# =====

install:
	@echo "Setting up the project..."
	yarn

build:
	@echo "Building the docker images..."
	docker compose -f docker-compose.yml build nodejs-base nginx \
	&& docker compose -f docker-compose.yml build server-base web-base \
	&& docker compose -f docker-compose.yml build server-game server-info web-game-builder

server:
	@echo "Running the game..."
	docker compose -f docker-compose.yml up -d

down:
	@echo "Stopping the game..."
	docker compose -f docker-compose.yml down
