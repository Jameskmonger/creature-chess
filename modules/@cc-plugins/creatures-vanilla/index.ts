// Server entry - the kernel loader's require() lands here.
export { default } from "./src/index";

// Raw catalog, for tooling that needs the definitions outside a running plugin
// (e.g. offline encoders/analysers keyed on the vanilla creature set).
export { vanillaCreatureDefinitions } from "./src/definitions";
