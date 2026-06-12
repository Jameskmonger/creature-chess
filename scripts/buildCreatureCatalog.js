/* eslint-disable */

// Projects the operator's installed creature plugins into a client-safe
// catalog: every creature the server would ship at game-connect, written
// once so the browser can render creature art (menu, lobby avatars) before
// any game exists. Mirrors the server's connect-time projection
// (apps/server-game/src/player) - same registry, same origin → ownerPluginId.
//
// Run by the `manifest-builder` service alongside buildManifest.js. Unlike
// that script it must actually load the plugins (their onEnable seeds the
// creature registry), so it requires the built workspace packages.

const fs = require("fs");
const path = require("path");

const { PluginLoader } = require("@cc-engine/kernel/loader");
const { createDefaultGamemodeContext } = require("@creature-chess/gamemode");
const { categorisePlugin } = require("./resolvePlugin.js");

const [, , ...args] = process.argv;
const positional = args.filter((a) => !a.startsWith("--"));
const manifestPath = positional[0];
const outputPath = positional[1];

if (!manifestPath || !outputPath) {
	process.stderr.write(
		"usage: buildCreatureCatalog.js <manifest-path> <output-path>\n"
	);
	process.exit(1);
}

const log = (level) => (message, meta) =>
	process.stderr.write(
		`[creatures:${level}] ${message}${meta ? ` ${JSON.stringify(meta)}` : ""}\n`
	);
const logger = {
	debug: () => {},
	info: log("info"),
	warn: log("warn"),
	error: log("error"),
};

(async () => {
	const operatorManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
	const ids = operatorManifest.plugins || [];

	const context = createDefaultGamemodeContext();
	const loader = new PluginLoader({ logger });

	const modIds = ids.filter((id) => {
		const report = categorisePlugin(id);
		// Pass not-found through so the loader raises the canonical error.
		return report.kind === "not-found" ? true : report.serverEntry;
	});

	const result = await loader.load(modIds, { logger, ...context });
	if (result.failed.length > 0) {
		logger.warn(
			`${result.failed.length} plugin(s) failed to load; catalog may be incomplete`,
			{ failed: result.failed.map((f) => f.plugin) }
		);
	}

	const catalog = [...context.creatures.entriesWithOrigin()].map(
		({ definition, origin }) => ({
			definition,
			ownerPluginId: origin.plugin,
		})
	);

	fs.mkdirSync(path.dirname(outputPath), { recursive: true });
	fs.writeFileSync(outputPath, JSON.stringify(catalog) + "\n");

	process.stderr.write(
		`[creatures] wrote ${outputPath}: ${catalog.length} creature(s) from ${result.loaded.length} plugin(s)\n`
	);
})().catch((err) => {
	process.stderr.write(`[creatures] failed: ${err.stack || err}\n`);
	process.exit(1);
});
