FROM node:12-alpine AS node

WORKDIR /code

RUN yarn set version berry

ADD . /code

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start:server-info" ]