FROM local/server-base:latest
ARG APP_DIR
ENV APP_DIR ${APP_DIR}
ENV NX_DAEMON=false

WORKDIR /code

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

CMD yarn nx build @creature-chess-app/$APP_DIR && yarn cache clean && yarn start-${APP_DIR}

EXPOSE 3000
