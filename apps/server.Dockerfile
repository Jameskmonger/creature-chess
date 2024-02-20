# Extend our base NodeJS builder image (see apps/nodejs-builder.Dockerfile)
FROM nodejs-builder
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

# Copy and build the @cc-server packages
ADD modules/@cc-server/ ./modules/@cc-server/
RUN yarn workspaces foreach --all --include "@cc-server/*" run build


ADD apps/$APP_DIR/ ./apps/$APP_DIR/

# TODO (James) we need to do the `build` here, because the app requires process.env vars
# 					do you know a better way? please make a PR
CMD yarn build-$APP_DIR && yarn cache clean && yarn start-${APP_DIR}

EXPOSE 3000
