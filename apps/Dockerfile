FROM node:12-alpine AS node
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

RUN yarn set version berry

ADD . .

RUN yarn
RUN yarn build:$APP_DIR

EXPOSE 3000

CMD yarn start:${APP_DIR}
