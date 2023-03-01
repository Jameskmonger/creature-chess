# Extend our base NodeJS builder image (see apps/nodejs-builder.Dockerfile)
FROM nodejs-builder
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

# we need to do the `build` here, because the app requires process.env vars
# do you know a better way? please make a PR
CMD yarn build-$APP_DIR && yarn cache clean && yarn start-${APP_DIR}

EXPOSE 3000
