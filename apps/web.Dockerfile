FROM local/web-base
ARG APP_DIR
ENV APP_DIR ${APP_DIR}
ENV NX_DAEMON=false

WORKDIR /code

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

VOLUME /code/apps/$APP_DIR/dist

CMD yarn nx build @creature-chess-app/$APP_DIR
