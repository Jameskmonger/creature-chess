lerna exec --parallel --ignore "@creature-chess/@(app|server-info)" -- npm prune --production --no-package-lock --no-fund --no-audit

mkdir -p ./bin ./bin/server-game ./bin/auth-server ./bin/board ./bin/battle ./bin/models ./bin/data ./bin/networking ./bin/gamemode

cp -r ./packages/server-game/package.json ./packages/server-game/lib/ ./packages/server-game/node_modules/ ./bin/server-game/ 2>/dev/null || :
cp -r ./packages/board/package.json ./packages/board/lib/ ./packages/board/node_modules/ ./bin/board/ 2>/dev/null || :
cp -r ./packages/battle/package.json ./packages/battle/lib/ ./packages/battle/node_modules/ ./bin/battle/ 2>/dev/null || :
cp -r ./packages/models/package.json ./packages/models/lib/ ./packages/models/node_modules/ ./bin/models/ 2>/dev/null || :
cp -r ./packages/data/package.json ./packages/data/lib/ ./packages/data/node_modules/ ./bin/data/ 2>/dev/null || :
cp -r ./packages/networking/package.json ./packages/networking/lib/ ./packages/networking/node_modules/ ./bin/networking/ 2>/dev/null || :
cp -r ./packages/auth-server/package.json ./packages/auth-server/lib/ ./packages/auth-server/node_modules/ ./bin/auth-server/ 2>/dev/null || :
cp -r ./packages/gamemode/package.json ./packages/gamemode/lib/ ./packages/gamemode/node_modules/ ./bin/gamemode/ 2>/dev/null || :

find . -type f -name '*.d.ts' -delete
find . -type f -name '*.ts' -delete
find . -type f -name 'tsconfig.json' -delete
find . -type f -name '*.md' -delete
