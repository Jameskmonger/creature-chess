/* eslint-disable */

// Projects the operator's creature-chess.json into the client-safe
// manifest: a flat list of plugin ids that ship a browser bundle.
// Nothing else from the operator's file crosses the seam - settings
// and secrets stay server-side.
//
// Run by the `manifest-builder` service at compose-up time. One
// centralised output so however many sharded `server-game` instances
// run, the browser sees one consistent set.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const { categorisePlugin } = require("./resolvePlugin.js");

// Content-hash a bundle so the client can cache-bust on change.
const bundleVersion = (file) =>
	crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex").slice(0, 8);

// Maps the unified categoriser's `kind` to the stderr label the operator
// has been seeing - keeps the projector's diagnostic vocabulary stable
// even as the underlying check grew richer.
const stderrLabel = (kind) => {
	if (kind === "isomorphic" || kind === "client-only") return "bundled";
	if (kind === "server-only") return "server-only";
	return "NOT FOUND";
};

const [, , ...args] = process.argv;
const strict = args.includes("--strict");
const positional = args.filter((a) => !a.startsWith("--"));
const manifestPath = positional[0];
const outputPath = positional[1];

if (!manifestPath || !outputPath) {
	process.stderr.write(
		"usage: buildManifest.js [--strict] <manifest-path> <output-path>\n"
	);
	process.exit(1);
}

const operatorManifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const ids = operatorManifest.plugins || [];

const reports = ids.map((id) => categorisePlugin(id));
const ships = reports.filter((r) => r.clientBundle !== null);
const serverOnly = reports.filter((r) => r.kind === "server-only");
const missing = reports.filter((r) => r.kind === "not-found");

const projection = {
	plugins: ships.map((r) => ({ id: r.id, version: bundleVersion(r.clientBundle) })),
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(projection, null, 2) + "\n");

process.stderr.write(
	`[manifest] wrote ${outputPath}: ${ships.length} bundled, ` +
		`${serverOnly.length} server-only, ${missing.length} not-found\n`
);
for (const r of reports) {
	const label = stderrLabel(r.kind).padEnd(11, " ");
	process.stderr.write(`  ${label} ${r.id}\n`);
}

if (missing.length > 0 && strict) {
	process.stderr.write(
		`[manifest] --strict: ${missing.length} plugin(s) could not be resolved; ` +
			`check spelling and that workspace/overlay/node_modules contain them\n`
	);
	process.exit(1);
}
