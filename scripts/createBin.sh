lerna exec --parallel -- npm prune --production --no-package-lock --no-fund --no-audit

mkdir -p ./bin
# shoki

mkdir -p ./bin/@shoki
mkdir -p ./bin/@shoki/board ./bin/@shoki/engine ./bin/@shoki/networking

cp -r ./packages/@shoki/board/package.json ./packages/@shoki/board/lib/ ./packages/@shoki/board/node_modules/ ./bin/@shoki/board/ 2>/dev/null || :
cp -r ./packages/@shoki/engine/package.json ./packages/@shoki/engine/lib/ ./packages/@shoki/engine/node_modules/ ./bin/@shoki/engine/ 2>/dev/null || :
cp -r ./packages/@shoki/networking/package.json ./packages/@shoki/networking/lib/ ./packages/@shoki/networking/node_modules/ ./bin/@shoki/networking/ 2>/dev/null || :

# server deps

mkdir -p ./bin/@creature-chess
mkdir -p ./bin/@creature-chess/battle ./bin/@creature-chess/models ./bin/@creature-chess/data ./bin/@creature-chess/networking ./bin/@creature-chess/auth-server ./bin/@creature-chess/gamemode

cp -r ./packages/@creature-chess/battle/package.json ./packages/@creature-chess/battle/lib/ ./packages/@creature-chess/battle/node_modules/ ./bin/@creature-chess/battle/ 2>/dev/null || :
cp -r ./packages/@creature-chess/models/package.json ./packages/@creature-chess/models/lib/ ./packages/@creature-chess/models/node_modules/ ./bin/@creature-chess/models/ 2>/dev/null || :
cp -r ./packages/@creature-chess/data/package.json ./packages/@creature-chess/data/lib/ ./packages/@creature-chess/data/node_modules/ ./bin/@creature-chess/data/ 2>/dev/null || :
cp -r ./packages/@creature-chess/networking/package.json ./packages/@creature-chess/networking/lib/ ./packages/@creature-chess/networking/node_modules/ ./bin/@creature-chess/networking/ 2>/dev/null || :
cp -r ./packages/@creature-chess/auth-server/package.json ./packages/@creature-chess/auth-server/lib/ ./packages/@creature-chess/auth-server/node_modules/ ./bin/@creature-chess/auth-server/ 2>/dev/null || :
cp -r ./packages/@creature-chess/gamemode/package.json ./packages/@creature-chess/gamemode/lib/ ./packages/@creature-chess/gamemode/node_modules/ ./bin/@creature-chess/gamemode/ 2>/dev/null || :

# server

mkdir -p ./bin/@creature-chess/server-game

cp -r ./packages/@creature-chess/server-game/package.json ./packages/@creature-chess/server-game/lib/ ./packages/@creature-chess/server-game/node_modules/ ./bin/@creature-chess/server-game/ 2>/dev/null || :

# hoisted

cp -r ./node_modules/ ./bin/ 2>/dev/null || :

find . -type f -name '*.d.ts' -delete
find . -type f -name '*.ts' -delete
find . -type f -name 'tsconfig.json' -delete
find . -type f -name '*.md' -delete
