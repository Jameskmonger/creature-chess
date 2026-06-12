/* eslint-disable */

// Build helper a plugin's webpack config calls.

const path = require("path");

const { CLIENT_PLUGIN_RUNTIME_KEY } = require("./src/runtimeKey");

/**
 * A map from libraries to properties on the shared library collection.
 */
const SHARED_PROPERTY = {
	react: "react",
	"react-jss": "reactJss",
	"react-redux": "reactRedux",
	"@reduxjs/toolkit": "reduxToolkit",
};

/**
 * Build a plugin's browser-bundle webpack config.
 *
 *   entry - the plugin's ClientPlugin module
 *   shared - libraries to externalise to the host runtime.
 */
function createPluginWebpackConfig({ entry, shared = [] }) {
	const sharedLibs = ["@reduxjs/toolkit", ...shared];

	const externals = {};
	for (const lib of sharedLibs) {
		const prop = SHARED_PROPERTY[lib];
		if (!prop) {
			throw new Error(
				`createPluginWebpackConfig: unknown shared singleton "${lib}". ` +
					`Known: ${Object.keys(SHARED_PROPERTY).join(", ")}`
			);
		}
		externals[lib] = [CLIENT_PLUGIN_RUNTIME_KEY, "shared", prop];
	}

	const entryAbs = path.resolve(entry);
	const pluginRoot = locatePackageRoot(path.dirname(entryAbs));
	const outputDir = path.join(pluginRoot, "dist/web");

	const webEntry = require.resolve("./webEntry.js");

	return {
		mode: "production",
		entry: webEntry,
		output: {
			// This filename is load-bearing, there are dependencies on dist/web/index.js existing and being the plugin bundle.
			filename: "index.js",
			path: outputDir,
			clean: true,
			chunkFilename: "[name].[contenthash:8].js",
			publicPath: "auto",
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: "ts-loader",
						options: { transpileOnly: true },
					},
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js"],
			alias: { "@cc-plugins-entry": entryAbs },
		},
		externalsType: "window",
		externals,
	};
}

/**
 * Walk up from a starting dir until we find a `package.json`. Used to
 * locate the plugin package root from its entry path.
 */
function locatePackageRoot(startDir) {
	const fs = require("fs");
	let dir = startDir;
	for (let i = 0; i < 8; i++) {
		if (fs.existsSync(path.join(dir, "package.json"))) {
			return dir;
		}
		const parent = path.dirname(dir);
		if (parent === dir) break;
		dir = parent;
	}
	throw new Error(
		`createPluginWebpackConfig: could not locate package.json above ${startDir}`
	);
}

module.exports = { createPluginWebpackConfig, CLIENT_PLUGIN_RUNTIME_KEY };
