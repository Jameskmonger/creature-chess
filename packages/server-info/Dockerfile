FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

COPY packages/server-info ./packages/server-info

RUN npm ci --loglevel notice

COPY lerna.json .

RUN npm run bootstrap

COPY tsconfig.json .

RUN npm run build:server-info

# todo: don't put source into the final docker image

EXPOSE 3000

CMD [ "npm", "run", "start:server-info" ]
