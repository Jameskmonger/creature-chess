# One-shot service that writes the client-safe plugin manifest into a
# volume nginx serves at /plugins/manifest.json. Reads the operator's
# creature-chess.json (bind-mounted) and projects only the public ids;
# server settings/secrets in that file stay server-side.
#
# Centralised so however many sharded server-game instances run behind
# a load balancer, the browser sees one consistent set. Invisible in
# operation - `docker compose up` runs it, nginx waits for it, the
# operator never invokes it directly.
FROM local/web-base
ENV NX_DAEMON=false

WORKDIR /code

# The script's "does this plugin ship a browser bundle?" check is whether `dist/web/index.js` exists.
# So we have to also run `build:web` here for the workspace plugins, otherwise every plugin would be classified as server-only.
RUN yarn nx run-many -t build:web --projects='@cc-plugins/*' && yarn cache clean

ADD scripts/ ./scripts/

CMD node scripts/buildManifest.js \
	"${CREATURE_CHESS_MANIFEST:-creature-chess.json}" \
	/output/manifest.json \
	&& node scripts/buildCreatureCatalog.js \
	"${CREATURE_CHESS_MANIFEST:-creature-chess.json}" \
	/output/creatures.json
