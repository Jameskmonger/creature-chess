FROM node:16-alpine AS node
ARG APP_DIR
ENV APP_DIR ${APP_DIR}

WORKDIR /code

RUN yarn set version berry

# copy package.json files separately to allow for yarn installation before copying code
# this enables better docker caching and a nicer dev experience
ADD package.json yarn.lock .yarnrc.yml ./
ADD .yarn/plugins/ ./.yarn/plugins/
ADD .yarn/releases/ ./.yarn/releases/

# TODO we shouldn't have to copy this here.
ADD lambda/user/package.json ./lambda/user/

ADD apps/server-game/package.json ./apps/server-game/
ADD apps/web-game/package.json ./apps/web-game/
ADD apps/web-menu/package.json ./apps/web-menu/

ADD modules/@creature-chess/auth-server/package.json ./modules/@creature-chess/auth-server/
ADD modules/@creature-chess/auth-web/package.json ./modules/@creature-chess/auth-web/
ADD modules/@creature-chess/battle/package.json ./modules/@creature-chess/battle/
ADD modules/@creature-chess/bot/package.json ./modules/@creature-chess/bot/
ADD modules/@creature-chess/data/package.json ./modules/@creature-chess/data/
ADD modules/@creature-chess/gamemode/package.json ./modules/@creature-chess/gamemode/
ADD modules/@creature-chess/models/package.json ./modules/@creature-chess/models/
ADD modules/@creature-chess/networking/package.json ./modules/@creature-chess/networking/
ADD modules/@creature-chess/ui/package.json ./modules/@creature-chess/ui/

ADD modules/@shoki/board/package.json ./modules/@shoki/board/
ADD modules/@shoki/board-react/package.json ./modules/@shoki/board-react/
ADD modules/@shoki/engine/package.json ./modules/@shoki/engine/
ADD modules/@shoki/networking/package.json ./modules/@shoki/networking/

RUN yarn install --frozen-lockfile --network-timeout 1000000

ADD . .

RUN yarn build-$APP_DIR && yarn cache clean

EXPOSE 3000

CMD yarn start-${APP_DIR}
