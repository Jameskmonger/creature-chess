FROM local/web-base
ARG APP_DIR
ENV APP_DIR=${APP_DIR}
ENV NX_DAEMON=false

# Webpack bakes these into the bundle (see apps/web-game/webpack.config.js).
# They're declared as build args so the image rebuilds if any value changes.
ARG NODE_ENV
ARG API_INFO_URL
ARG CREATURE_CHESS_APP_URL
ARG CREATURE_CHESS_IMAGE_URL
ENV NODE_ENV=${NODE_ENV}
ENV API_INFO_URL=${API_INFO_URL}
ENV CREATURE_CHESS_APP_URL=${CREATURE_CHESS_APP_URL}
ENV CREATURE_CHESS_IMAGE_URL=${CREATURE_CHESS_IMAGE_URL}

WORKDIR /code

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

RUN yarn nx build @creature-chess-app/$APP_DIR && yarn cache clean

# Output is baked into the image at /code/apps/$APP_DIR/dist.
# At container start we sync it to /output (a host-mounted volume that nginx serves).
# Wipe first so stale bundles don't accumulate on the host.
CMD rm -rf /output/* && cp -r /code/apps/${APP_DIR}/dist/. /output/
