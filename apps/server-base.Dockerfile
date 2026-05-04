FROM local/nodejs-base

ENV NX_DAEMON=false

# Build @creature-chess packages
ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn nx run-many -t build --projects='@creature-chess/*'

# Build @cc-server packages
ADD modules/@cc-server/ ./modules/@cc-server/
RUN yarn nx run-many -t build --projects='@cc-server/*'

# server-game depends on @cc-bot/*
ADD modules/@cc-bot/ ./modules/@cc-bot/
RUN yarn nx run-many -t build --projects='@cc-bot/*'
