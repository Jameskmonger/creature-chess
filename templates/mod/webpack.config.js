/* eslint-disable @typescript-eslint/no-var-requires */
const { createPluginWebpackConfig } = require("@cc-plugins/api/build");

// `entry` points at the plugin's ClientPlugin module (default-exports
// the plugin). The helper wraps it with @cc-plugins/api/webEntry which
// calls `getClientPluginRuntime().register(default)` for you - you do
// NOT need a separate web entry file.
//
// `shared` lists which of react / react-jss / react-redux this mod
// renders against - they become host-shared singletons so there's one
// React, one Provider context, one JSS registry. `@reduxjs/toolkit` is
// always shared (every plugin needs the host's action identity).
module.exports = createPluginWebpackConfig({
	entry: "./src/client/index.ts",
	shared: ["react"],
});
