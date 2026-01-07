FROM local/nodejs-base

# Build web-specific packages only
ADD modules/@shoki-web/ ./modules/@shoki-web/
RUN yarn workspaces foreach --all --include "@shoki-web/*" run build

ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn workspaces foreach --all \
    --include "@creature-chess/*" \
    --exclude "@creature-chess/models" \
    run build
