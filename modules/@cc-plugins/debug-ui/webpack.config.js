/* eslint-disable @typescript-eslint/no-var-requires */
// Runtime-loadable browser bundle. UI-only debugging mod -
// only React is shared (no JSS, no redux, no own actions).
const { createPluginWebpackConfig } = require("@cc-plugins/api/build");

module.exports = createPluginWebpackConfig({
	entry: "./src/client/index.ts",
	shared: ["react"],
});
