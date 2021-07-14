lerna exec --parallel --scope "@creature-chess/@(server-game|battle|models|data|networking|auth-server|gamemode)" -- npm prune --production --no-package-lock --no-fund --no-audit

mkdir -p ./bin/server-game ./bin/cc-battle ./bin/cc-models ./bin/cc-data ./bin/cc-networking ./bin/cc-auth ./bin/cc-gamemode

cp -r ./packages/server-game/package.json ./packages/server-game/lib/ ./packages/server-game/node_modules/ ./bin/server-game/ 2>/dev/null || :
cp -r ./packages/cc-battle/package.json ./packages/cc-battle/lib/ ./packages/cc-battle/node_modules/ ./bin/cc-battle/ 2>/dev/null || :
cp -r ./packages/cc-models/package.json ./packages/cc-models/lib/ ./packages/cc-models/node_modules/ ./bin/cc-models/ 2>/dev/null || :
cp -r ./packages/cc-data/package.json ./packages/cc-data/lib/ ./packages/cc-data/node_modules/ ./bin/cc-data/ 2>/dev/null || :
cp -r ./packages/cc-networking/package.json ./packages/cc-networking/lib/ ./packages/cc-networking/node_modules/ ./bin/cc-networking/ 2>/dev/null || :
cp -r ./packages/cc-auth/package.json ./packages/cc-auth/lib/ ./packages/cc-auth/node_modules/ ./bin/cc-auth/ 2>/dev/null || :
cp -r ./packages/cc-gamemode/package.json ./packages/cc-gamemode/lib/ ./packages/cc-gamemode/node_modules/ ./bin/cc-gamemode/ 2>/dev/null || :

find . -type f -name '*.d.ts' -delete
find . -type f -name '*.ts' -delete
find . -type f -name 'tsconfig.json' -delete
find . -type f -name '*.md' -delete
