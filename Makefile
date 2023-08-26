# =====

all: install build db server
rebuild: build server

# =====

install:
	@echo "Setting up the project..."
	yarn

build:
	@echo "Building the docker images..."
	docker compose -f docker-compose.yml build

db:
	@echo "Setting up the database and running migrations..."
	docker compose -f docker-compose.db.yml up -d postgres
	docker compose run -e DATABASE_URL nodejs-builder yarn workspace @creature-chess/data prisma migrate deploy

server:
	@echo "Running the game..."
	docker compose -f docker-compose.yml up -d

down:
	@echo "Stopping the game..."
	docker compose -f docker-compose.yml down
	@echo "Stopping the database..."
	docker compose -f docker-compose.db.yml down

# =====

# This step is used to create a new migration.
# It creates a new nodejs-builder container, runs the migration command inside,
# then copies the migration files to the local machine.
add-migration:
	@echo "Creating new migration"
	read -p "Enter the migration name:  " MIGRATION_NAME; \
	docker compose -f docker-compose.db.yml up -d postgres; \
	docker compose run -e DATABASE_URL nodejs-builder yarn workspace @creature-chess/data prisma migrate dev --name $$MIGRATION_NAME; \
	CONTAINER_ID=$$(docker ps -aqf "ancestor=nodejs-builder" --latest); \
	docker cp $$CONTAINER_ID:/code/modules/@creature-chess/data/prisma/migrations ./modules/@creature-chess/data/prisma/; \
	docker stop $$CONTAINER_ID; \
	docker rm $$CONTAINER_ID; \
	yarn workspace @creature-chess/data prisma generate
