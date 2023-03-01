# Extend our base NodeJS builder image (see apps/nodejs-builder.Dockerfile)
FROM nodejs-builder
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

VOLUME /code/apps/$APP_DIR/dist

CMD yarn build-$APP_DIR
