lerna exec --parallel --scope "@shoki/*" -- npm prune --production --no-package-lock --no-fund --no-audit

mkdir -p ./bin ./bin/shoki-board ./bin/shoki-engine ./bin/shoki-networking

cp -r ./packages/shoki-board/package.json ./packages/shoki-board/lib/ ./packages/shoki-board/node_modules/ ./bin/shoki-board/ 2>/dev/null || :
cp -r ./packages/shoki-engine/package.json ./packages/shoki-engine/lib/ ./packages/shoki-engine/node_modules/ ./bin/shoki-engine/ 2>/dev/null || :
cp -r ./packages/shoki-networking/package.json ./packages/shoki-networking/lib/ ./packages/shoki-networking/node_modules/ ./bin/shoki-networking/ 2>/dev/null || :

find . -type f -name '*.d.ts' -delete
find . -type f -name '*.ts' -delete
find . -type f -name 'tsconfig.json' -delete
find . -type f -name '*.md' -delete
