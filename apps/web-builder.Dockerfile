# Extend our base NodeJS builder image (see apps/nodejs-builder.Dockerfile)
FROM nodejs-builder
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

ADD modules/@shoki-web/ ./modules/@shoki-web/
RUN yarn workspaces foreach --include "@shoki-web/*" run build

ADD apps/$APP_DIR/ ./apps/$APP_DIR/

VOLUME /code/apps/$APP_DIR/dist

CMD yarn build-$APP_DIR
