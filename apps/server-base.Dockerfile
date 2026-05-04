FROM local/nodejs-base

ENV NX_DAEMON=false

# Build data layer (needs prisma generate before tsc)
ADD modules/@cc-server/data/ ./modules/@cc-server/data/
RUN yarn workspace @cc-server/data prisma-generate && \
    yarn nx build @cc-server/data

# Build remaining @creature-chess packages (nx caches already-built ones)
ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn nx run-many -t build --projects='@creature-chess/*'

# Build remaining @cc-server packages (nx caches data)
ADD modules/@cc-server/ ./modules/@cc-server/
RUN yarn nx run-many -t build --projects='@cc-server/*'

# server-game depends on @cc-bot/*
ADD modules/@cc-bot/ ./modules/@cc-bot/
RUN yarn nx run-many -t build --projects='@cc-bot/*'
