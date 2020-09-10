FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .
COPY packages/shared ./packages/shared
COPY packages/server ./packages/server

RUN npm ci --loglevel notice

COPY lerna.json .

RUN npm run bootstrap

COPY tsconfig.json .

RUN npm run build:server

EXPOSE 3000

CMD [ "npm", "run", "start:server" ]
