FROM local/server-base:latest
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

CMD yarn build-$APP_DIR && yarn cache clean && yarn start-${APP_DIR}

EXPOSE 3000
