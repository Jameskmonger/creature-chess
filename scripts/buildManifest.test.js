/* eslint-disable */
// Run via `node --test scripts/buildManifest.test.js` (Node ≥ 18).
// Covers the triage that `make validate --strict` relies on - we test
// the script end-to-end (spawn + assert) so the CLI contract is what's
// locked in, not just internal helpers.

const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const crypto = require("node:crypto");
const { spawnSync } = require("node:child_process");

const SCRIPT = path.resolve(__dirname, "buildManifest.js");

const stubBundle = (id) => `// stub bundle ${id}`;
const versionOf = (id) =>
	crypto.createHash("sha256").update(stubBundle(id)).digest("hex").slice(0, 8);
const bundled = (id) => ({ id, version: versionOf(id) });

// Build a fake mods tree on disk so resolvePlugin's CC_MODS_DIR path
// is exercised end-to-end (no mocking of fs / require.resolve).
function makeFixture({ plugins, bundles = {} }) {
	const root = fs.mkdtempSync(path.join(os.tmpdir(), "cc-bm-"));
	const modsDir = path.join(root, "mods");

	for (const id of plugins) {
		const pkgDir = path.join(modsDir, id);
		fs.mkdirSync(pkgDir, { recursive: true });
		fs.writeFileSync(
			path.join(pkgDir, "package.json"),
			JSON.stringify({ name: id, version: "0.0.1" })
		);
		if (bundles[id]) {
			const webDir = path.join(pkgDir, "dist/web");
			fs.mkdirSync(webDir, { recursive: true });
			fs.writeFileSync(path.join(webDir, "index.js"), stubBundle(id));
		}
	}

	const manifestPath = path.join(root, "creature-chess.json");
	const outputPath = path.join(root, "out.json");
	return { root, modsDir, manifestPath, outputPath };
}

function writeManifest(fixturePath, ids) {
	fs.writeFileSync(fixturePath, JSON.stringify({ plugins: ids }));
}

function runScript({ modsDir, manifestPath, outputPath, strict = false }) {
	const args = strict
		? ["--strict", manifestPath, outputPath]
		: [manifestPath, outputPath];
	// CC_MODS_DIR isolates resolution from the surrounding workspace so
	// the test only sees plugins we explicitly wrote into the fixture
	// (and so require.resolve fallbacks don't accidentally find real ones).
	return spawnSync("node", [SCRIPT, ...args], {
		env: { ...process.env, CC_MODS_DIR: modsDir },
		encoding: "utf8",
	});
}

test("happy path: a bundled plugin is emitted", () => {
	const fx = makeFixture({
		plugins: ["@me/bundled"],
		bundles: { "@me/bundled": true },
	});
	writeManifest(fx.manifestPath, ["@me/bundled"]);

	const r = runScript(fx);
	assert.strictEqual(r.status, 0, r.stderr);
	assert.deepStrictEqual(JSON.parse(fs.readFileSync(fx.outputPath, "utf8")), {
		plugins: [bundled("@me/bundled")],
	});
	assert.match(r.stderr, /bundled\s+@me\/bundled/);
});

test("a resolvable plugin with no dist/web/index.js is server-only", () => {
	const fx = makeFixture({ plugins: ["@me/server-only"] });
	writeManifest(fx.manifestPath, ["@me/server-only"]);

	const r = runScript(fx);
	assert.strictEqual(r.status, 0);
	assert.deepStrictEqual(JSON.parse(fs.readFileSync(fx.outputPath, "utf8")), {
		plugins: [],
	});
	assert.match(r.stderr, /server-only\s+@me\/server-only/);
});

test("an unresolvable id is reported NOT FOUND", () => {
	const fx = makeFixture({ plugins: [] });
	writeManifest(fx.manifestPath, ["@me/typo"]);

	const r = runScript(fx);
	// Non-strict: still exits 0, still writes the (empty) projection,
	// but reports the missing id loudly on stderr.
	assert.strictEqual(r.status, 0);
	assert.deepStrictEqual(JSON.parse(fs.readFileSync(fx.outputPath, "utf8")), {
		plugins: [],
	});
	assert.match(r.stderr, /NOT FOUND\s+@me\/typo/);
});

test("--strict fails non-zero when any id is NOT FOUND", () => {
	const fx = makeFixture({
		plugins: ["@me/real"],
		bundles: { "@me/real": true },
	});
	writeManifest(fx.manifestPath, ["@me/real", "@me/typo"]);

	const r = runScript({ ...fx, strict: true });
	assert.strictEqual(r.status, 1);
	assert.match(r.stderr, /--strict/);
	assert.match(r.stderr, /NOT FOUND\s+@me\/typo/);
});

test("--strict still succeeds when every id resolves", () => {
	const fx = makeFixture({
		plugins: ["@me/bundled", "@me/server"],
		bundles: { "@me/bundled": true },
	});
	writeManifest(fx.manifestPath, ["@me/bundled", "@me/server"]);

	const r = runScript({ ...fx, strict: true });
	assert.strictEqual(r.status, 0, r.stderr);
});

test("mixed manifest: bundled + server-only + missing in one run", () => {
	const fx = makeFixture({
		plugins: ["@me/has-bundle", "@me/just-server"],
		bundles: { "@me/has-bundle": true },
	});
	writeManifest(fx.manifestPath, [
		"@me/has-bundle",
		"@me/just-server",
		"@me/missing",
	]);

	const r = runScript(fx);
	assert.strictEqual(r.status, 0);
	assert.deepStrictEqual(JSON.parse(fs.readFileSync(fx.outputPath, "utf8")), {
		plugins: [bundled("@me/has-bundle")],
	});
	assert.match(r.stderr, /1 bundled, 1 server-only, 1 not-found/);
});

test("preserves manifest plugin order in the projection", () => {
	const fx = makeFixture({
		plugins: ["@a/one", "@b/two", "@c/three"],
		bundles: { "@a/one": true, "@b/two": true, "@c/three": true },
	});
	writeManifest(fx.manifestPath, ["@c/three", "@a/one", "@b/two"]);

	const r = runScript(fx);
	assert.strictEqual(r.status, 0);
	assert.deepStrictEqual(JSON.parse(fs.readFileSync(fx.outputPath, "utf8")), {
		plugins: [bundled("@c/three"), bundled("@a/one"), bundled("@b/two")],
	});
});

test("usage line on missing args", () => {
	const r = spawnSync("node", [SCRIPT], { encoding: "utf8" });
	assert.strictEqual(r.status, 1);
	assert.match(r.stderr, /usage:/);
});
