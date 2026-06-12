import { defineClientPlugin } from "@cc-plugins/api";

import pkg from "../../package.json";
import { debugUi } from "./ui";

/**
 * Dev mod that outlines every declared Region with its class name. Flip
 * it on (add to `creature-chess.dev.json`) and every extension surface
 * the gamemode exposes is visible at runtime - the live answer to "what
 * can a mod target?"
 *
 * Hover any tag to see the ctx payload for that region. Empty regions
 * (like `app-extension`) get a small visible footprint so a developer
 * can find them even when no mod is rendering into them.
 */
export default defineClientPlugin(pkg, {
	ui: debugUi,
});
