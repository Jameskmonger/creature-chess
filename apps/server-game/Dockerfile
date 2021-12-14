FROM node:12-alpine AS node

WORKDIR /code

RUN yarn set version berry

ADD . /code

RUN yarn
RUN yarn build:web-game && cp -r apps/web-game/public apps/server-game

EXPOSE 3000

CMD [ "yarn", "start:server-game" ]
