import { PlayerTitle } from "./title";

export interface PlayerProfile {
	title: PlayerTitle | null;
	/**
	 * Avatar image source: a URL (any origin), a `creature:<id>` ref resolved
	 * against the creature registry, or an `asset:<path>` ref resolved against
	 * the bundled image root.
	 */
	picture: string | null;
}

export const CREATURE_PICTURE_PREFIX = "creature:";

export const creaturePicture = (id: number): string =>
	`${CREATURE_PICTURE_PREFIX}${id}`;

// A repo-bundled image (under the configured image root), e.g. "bots/robot-001.png".
export const ASSET_PICTURE_PREFIX = "asset:";

export const assetPicture = (path: string): string =>
	`${ASSET_PICTURE_PREFIX}${path}`;
