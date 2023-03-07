# Extend our base NodeJS builder image (see apps/nodejs-builder.Dockerfile)
FROM nodejs-builder
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

# TODO (James) as @../data is in the `modules` folder, can we do this in nodejs-builder instead?
RUN yarn workspace @creature-chess/data prisma-generate

# TODO (James) we need to do the `build` here, because the app requires process.env vars
# 					do you know a better way? please make a PR
# TODO (James) it's nasty to do a `foreach run build` here, we should exclude apps at least
CMD yarn workspaces foreach run build && yarn cache clean && yarn start-${APP_DIR}

EXPOSE 3000
