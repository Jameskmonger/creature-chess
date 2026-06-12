import * as React from "react";

import { RegionContexts, UiOperation, wrap } from "@cc-plugins/api";
// Side-effect: pulls in the gamemode's `RegionContexts` declarations so
// the static class list below type-checks against the full vocabulary.
import "@creature-chess/gamemode/client";

import { RegionLabel } from "./components/RegionLabel";

/** Helper: one wrap registration that draws a labeled outline around
 * whatever the host renders for `cls`. */
const labelWrap = <C extends keyof RegionContexts>(
	cls: C
): UiOperation<RegionContexts[C]> =>
	wrap(
		cls,
		(children, ctx) => (
			<RegionLabel cls={cls} ctx={ctx}>
				{children}
			</RegionLabel>
		),
		{ id: `@cc-plugins/debug-ui:${cls}` }
	);

/**
 * Every Region class the gamemode declares, with the same dev outline.
 * Adding a new class to `RegionContexts` and forgetting it here would
 * silently miss the surface - the `_exhaustive` assertion below makes
 * that a compile error instead.
 */
const ALL_CLASSES = [
	"player-avatar",
	"player-list-row",
	"player-profile-bar",
	"player-piece-tile",
	"card-shop-card",
	"overlay-content",
	"match-rewards-summary",
	"phase-timer",
	"board-surface",
	"lobby-player-slot",
	"main-menu",
	"settings-section",
	"app-extension",
] as const satisfies readonly (keyof RegionContexts)[];

// Compile-time completeness check: if `RegionContexts` ever has a class
// not present in `ALL_CLASSES`, `MissingClass` resolves to that class
// name and the `extends never` check fails with a tuple containing the
// gap. Updating `clientRegions.ts` without updating this mod becomes a
// build error, not a runtime omission.
type MissingClass = Exclude<keyof RegionContexts, (typeof ALL_CLASSES)[number]>;
const exhaustivenessCheck: [MissingClass] extends [never]
	? true
	: ["debug-ui MISSING REGION CLASSES:", MissingClass] = true;
void exhaustivenessCheck;

export const debugUi: UiOperation[] = ALL_CLASSES.map(labelWrap);
