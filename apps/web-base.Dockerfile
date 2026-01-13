FROM local/nodejs-base

ADD modules/@creature-chess/ ./modules/@creature-chess/
RUN yarn workspaces foreach --all \
    --include "@creature-chess/*" \
    --exclude "@creature-chess/models" \
    run build
