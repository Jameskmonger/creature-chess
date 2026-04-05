FROM local/nodejs-base

ENV NX_DAEMON=false

# Build @creature-chess packages (nx caches already-built models/board)
ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn nx run-many -t build --projects='@creature-chess/*'
