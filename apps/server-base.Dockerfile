FROM local/nodejs-base

# Build server-specific packages
ADD modules/@cc-server/data/ ./modules/@cc-server/data/
RUN yarn workspace @cc-server/data prisma-generate && \
    yarn workspace @cc-server/data run build

ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn workspaces foreach --all \
    --include "@creature-chess/*" \
    --exclude "@creature-chess/models" \
    run build

ADD modules/@cc-server/ ./modules/@cc-server/
RUN yarn workspaces foreach --all --include "@cc-server/*" run build
