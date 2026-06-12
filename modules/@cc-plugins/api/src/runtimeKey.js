// Single source of truth for the global key the host installs the client
// plugin runtime under.
// Plain CommonJS so webpack configs can import without needing to transpile.
module.exports = { CLIENT_PLUGIN_RUNTIME_KEY: "__CC_CLIENT_PLUGIN_RUNTIME__" };
