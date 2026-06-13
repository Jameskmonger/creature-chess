import { PlayerTitle } from "./title";

export interface PlayerProfile {
	title: PlayerTitle | null;
	/**
	 * Avatar image source: a URL (any origin), or a `creature:<id>` ref the
	 * client resolves against the creature registry.
	 */
	picture: string | null;
}

export const CREATURE_PICTURE_PREFIX = "creature:";

export const creaturePicture = (id: number): string =>
	`${CREATURE_PICTURE_PREFIX}${id}`;
