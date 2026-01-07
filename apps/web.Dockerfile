FROM local/web-base
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

VOLUME /code/apps/$APP_DIR/dist

CMD yarn build-$APP_DIR
