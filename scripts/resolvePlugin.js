/* eslint-disable */

// One source of truth for "where does plugin <id> live on disk, and what
// shape is it?". The operator overlay (`CC_MODS_DIR`) wins so a dropped-in
// mod overrides a monorepo workspace of the same id. We then fall through
// to whatever `require` can resolve - workspace symlinks today, npm-installed
// packages once we publish.

const fs = require("fs");
const path = require("path");

function pluginDir(id, { modsDir = process.env.CC_MODS_DIR } = {}) {
	if (modsDir) {
		const candidate = path.join(modsDir, id);
		if (fs.existsSync(path.join(candidate, "package.json"))) {
			return candidate;
		}
	}
	try {
		return path.dirname(require.resolve(`${id}/package.json`));
	} catch {
		return null;
	}
}

function pluginPackage(id, opts) {
	const dir = pluginDir(id, opts);
	if (!dir) return null;
	return JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
}

/**
 * Whether a plugin actually ships a browser bundle by file existence.
 */
function clientBundlePath(id, opts) {
	const dir = pluginDir(id, opts);
	if (!dir) return null;
	const bundle = path.join(dir, "dist/web/index.js");
	return fs.existsSync(bundle) ? bundle : null;
}

/** Does the package declare (or default to) a Node-importable entry? */
function hasServerEntry(pkg, dir) {
	if (!pkg) return false;

	const { exports } = pkg;
	if (exports) {
		// String form: `"exports": "./index.js"`.
		if (typeof exports === "string") return true;
		if (typeof exports === "object" && exports !== null) {
			// Subpath form: `{ ".": ... }`.
			if (exports["."]) return true;
			// Top-level conditional form (no subpath keys):
			// `{ "require": ..., "import": ..., "default": ... }`.
			const hasSubpaths = Object.keys(exports).some((k) => k.startsWith("."));
			if (!hasSubpaths && Object.keys(exports).length > 0) return true;
		}
		return false;
	}

	if (pkg.main) return true;

	// Neither `main` nor `exports`: Node resolves an `index.js` by default.
	if (dir) return fs.existsSync(path.join(dir, "index.js"));
	return false;
}

/**
 * Full shape report for a plugin id. Single source of truth for "is there
 * a server half, a client half, both, neither".
 */
function categorisePlugin(id, opts) {
	const dir = pluginDir(id, opts);
	if (!dir) {
		return {
			id,
			dir: null,
			kind: "not-found",
			serverEntry: false,
			clientBundle: null,
		};
	}

	let pkg = null;
	try {
		pkg = JSON.parse(fs.readFileSync(path.join(dir, "package.json"), "utf8"));
	} catch {
		// Unreadable package.json on a real directory - treat as not-found
		// so neither side tries to load it.
		return {
			id,
			dir,
			kind: "not-found",
			serverEntry: false,
			clientBundle: null,
		};
	}

	const serverEntry = hasServerEntry(pkg, dir);
	const bundle = path.join(dir, "dist/web/index.js");
	const clientBundle = fs.existsSync(bundle) ? bundle : null;

	let kind;
	if (serverEntry && clientBundle) kind = "isomorphic";
	else if (clientBundle) kind = "client-only";
	else kind = "server-only";

	return { id, dir, kind, serverEntry, clientBundle };
}

module.exports = {
	pluginDir,
	pluginPackage,
	clientBundlePath,
	hasServerEntry,
	categorisePlugin,
};
