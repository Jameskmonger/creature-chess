# syntax=docker/dockerfile:1.7-labs
###
# Base image for building nodejs apps in the monorepo.
# Layers:
#   1. yarn binary
#   2. yarn workspace metadata (package.jsons)  - invalidated by deps changes
#   3. yarn install                              - cached unless deps change
#   4. core packages source + build              - invalidated by code changes
###

FROM node:24-alpine3.20

WORKDIR /code

RUN yarn set version 4.9.1

ADD package.json yarn.lock .yarnrc.yml nx.json ./
ADD .yarn/plugins/ ./.yarn/plugins/
ADD .yarn/releases/ ./.yarn/releases/

# Copy ONLY the package.json files (preserving directory structure) so this
# layer is invalidated only when a workspace's dependency manifest changes,
# not when any random source file in apps/ or modules/ changes.
# Requires dockerfile:1.7-labs (--parents).
COPY --parents apps/*/package.json modules/*/*/package.json ./

RUN yarn install --frozen-lockfile --network-timeout 1000000

ENV NX_DAEMON=false

ADD tsconfig.json ./

ADD modules/@shoki/ ./modules/@shoki/
ADD modules/@creature-chess/models/ ./modules/@creature-chess/models/
ADD modules/@creature-chess/board/ ./modules/@creature-chess/board/

RUN yarn nx run-many -t build --projects='@shoki/*,@creature-chess/models,@creature-chess/board'
