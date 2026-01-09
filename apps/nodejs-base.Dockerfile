###
# Base image for building nodejs apps in the monorepo
# This uses a simple approach: cache dependencies, then copy everything and build
###

FROM node:24-alpine3.20

WORKDIR /code

RUN yarn set version 4.9.1

# Copy dependency files first for better layer caching
# When dependencies don't change, this layer is reused
ADD package.json yarn.lock .yarnrc.yml ./
ADD .yarn/plugins/ ./.yarn/plugins/
ADD .yarn/releases/ ./.yarn/releases/

# Copy all package.json files - preserve directory structure for yarn workspaces
RUN --mount=type=bind,source=modules,target=/tmp/src/modules \
	--mount=type=bind,source=apps,target=/tmp/src/apps \
    cd /tmp/src && find modules apps -name 'package.json' | \
	while read f; do mkdir -p /code/$(dirname $f) && cp $f /code/$f; done

# Install dependencies - this layer is cached unless package.json or yarn.lock changes
RUN yarn install --frozen-lockfile --network-timeout 1000000

# Copy source code
ADD tsconfig.json ./

ADD modules/@shoki/ ./modules/@shoki/
ADD modules/@creature-chess/models/ ./modules/@creature-chess/models/
ADD modules/@creature-chess/board/ ./modules/@creature-chess/board/

RUN yarn workspaces foreach --all --include "@shoki/*" run build
RUN yarn workspace @creature-chess/models run build
RUN yarn workspace @creature-chess/board run build
