install:
	@echo "Setting up the project..."
	yarn

db:
	@echo "Setting up the database and running migrations..."
	yarn dockerup-db

	@read -p "Enter the DATABASE_URL for seeding: " DATABASE_URL; \
	DATABASE_URL=$$DATABASE_URL yarn workspace @creature-chess/data prisma-migrate deploy

server:
	@echo "Running the game..."
	yarn dockerup
