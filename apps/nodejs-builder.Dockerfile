###
# This Dockerfile is used to create a base image for building our nodejs apps
#
# It is not intended to be used directly, but rather as a base image for other
# Dockerfiles. Look at apps/Dockerfile for an example.
#
# This Dockerfile copies the relevant JS files into the image, and then runs
# yarn install.
###

FROM node:16-alpine

WORKDIR /code

RUN yarn set version berry

# By copying the package.json and yarn.lock files first, we can take advantage of
# Docker's caching. This means that we don't have to re-run yarn install every
# time a source file changes

ADD package.json yarn.lock .yarnrc.yml ./
ADD .yarn/plugins/ ./.yarn/plugins/
ADD .yarn/releases/ ./.yarn/releases/

ADD apps/server-game/package.json ./apps/server-game/
ADD apps/server-info/package.json ./apps/server-info/
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
ADD modules/@shoki/card-deck/package.json ./modules/@shoki/card-deck/
ADD modules/@shoki/engine/package.json ./modules/@shoki/engine/
ADD modules/@shoki/networking/package.json ./modules/@shoki/networking/

ADD modules/@shoki-web/board-react/package.json ./modules/@shoki-web/board-react/

ADD modules/@tools/battle-tester/package.json ./modules/@tools/battle-tester/

# Run the install now that we have the package.json and yarn.lock files
RUN yarn install --frozen-lockfile --network-timeout 1000000

# Finally, copy the rest of the source code into the image
# These steps happen after the install, so that we don't have to re-run the
# install every time one of these steps has a different result

ADD tsconfig.json ./

# Copy and build the `@shoki` packages
ADD modules/@shoki/ ./modules/@shoki/
RUN yarn workspaces foreach --include "@shoki/*" run build

# Copy and build the @creature-chess/models
ADD modules/@creature-chess/models/ ./modules/@creature-chess/models/
RUN yarn workspace @creature-chess/models run build

# Copy and build the @creature-chess/data
ADD modules/@creature-chess/data/ ./modules/@creature-chess/data/
RUN yarn workspace @creature-chess/data prisma-generate
RUN yarn workspace @creature-chess/data run build

# Copy and build the remaining `@creature-chess` packages
ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn workspaces foreach --include "@creature-chess/*" --exclude "@creature-chess/models" --exclude "@creature-chess/data" run build
