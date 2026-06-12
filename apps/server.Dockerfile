FROM local/server-base:latest
ARG APP_DIR
ENV APP_DIR=${APP_DIR}
ENV NX_DAEMON=false

WORKDIR /code

# Plugin resolution helper is shared with build-time tooling and required at runtime.
ADD scripts/ ./scripts/

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

RUN yarn nx build @creature-chess-app/$APP_DIR && yarn cache clean

EXPOSE 3000

CMD node apps/${APP_DIR}/dist/index.js
