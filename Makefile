# =====

DB_PROJECT := creature-chess-db
DB_MIGRATION_CONTAINER := creature-chess-server-base-migrate

all: install build db server
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

# The `creature-chess-db` network is declared `external` in both compose files so
# that the db stack and the app stack can share it. Create it up-front if missing.
network:
	@docker network inspect $(DB_PROJECT) >/dev/null 2>&1 \
		|| (echo "Creating docker network $(DB_PROJECT)..." && docker network create $(DB_PROJECT))

db: network
	@echo "Setting up the database and running migrations..."
	docker compose -p $(DB_PROJECT) -f docker-compose.db.yml up -d postgres
# This step runs a server-base container because it contains the @cc-server/data package
	docker compose -f docker-compose.yml run --name $(DB_MIGRATION_CONTAINER) -e DATABASE_URL server-base yarn workspace @cc-server/data prisma migrate deploy; \
	EXIT_CODE=$$?; \
	docker rm -f $(DB_MIGRATION_CONTAINER) >/dev/null 2>&1 || true; \
	exit $$EXIT_CODE

server:
	@echo "Running the game..."
	docker compose -f docker-compose.yml up -d

down:
	@echo "Stopping the game..."
	docker compose -f docker-compose.yml down
	@echo "Stopping the database..."
	docker compose -p $(DB_PROJECT) -f docker-compose.db.yml down

# =====

# This step is used to create a new migration.
# It creates a new nodejs-builder container, runs the migration command inside,
# then copies the migration files to the local machine.
add-migration: network
	@echo "Creating new migration"
	read -p "Enter the migration name:  " MIGRATION_NAME; \
	docker compose -p $(DB_PROJECT) -f docker-compose.db.yml up -d postgres; \
	docker compose run -e DATABASE_URL nodejs-builder yarn workspace @cc-server/data prisma migrate dev --name $$MIGRATION_NAME; \
	CONTAINER_ID=$$(docker ps -aqf "ancestor=nodejs-builder" --latest); \
	docker cp $$CONTAINER_ID:/code/modules/@cc-server/data/prisma/migrations ./modules/@cc-server/data/prisma/; \
	docker stop $$CONTAINER_ID; \
	docker rm $$CONTAINER_ID; \
	yarn workspace @cc-server/data prisma generate

prisma-generate:
	@echo "Generating prisma client"
	yarn workspace @cc-server/data run prisma-generate
