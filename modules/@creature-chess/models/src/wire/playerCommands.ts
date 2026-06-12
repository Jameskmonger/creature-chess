import { networkedAction } from "@cc-plugins/api";

import type { Card } from "../card";

import { playerInfoCommands, PlayerInfoUpdateCommand } from "./playerInfoCommands";

export type CardShopState = {
	cards: (Card | null)[];
	locked: boolean;
};

export const initialCardShopState: CardShopState = {
	cards: [],
	locked: false,
};

export type SpectatingState = {
	id: string | null;
};

export const initialSpectatingState: SpectatingState = {
	id: null,
};

export const updateCardsCommand = networkedAction<
	(Card | null)[],
	"cards/updateCardsCommand"
>("cards/updateCardsCommand");

export const updateShopLockCommand = networkedAction<
	boolean,
	"cards/updateShopLockCommand"
>("cards/updateShopLockCommand");

export const setSpectatingIdCommand = networkedAction<
	string | null,
	"spectating/setSpectatingIdCommand"
>("spectating/setSpectatingIdCommand");

export const playerInfoUpdateCreators = [
	updateCardsCommand,
	updateShopLockCommand,
	setSpectatingIdCommand,
	...Object.values(playerInfoCommands),
] as const;

export const PlayerInfoUpdateCommandActionTypesArray: readonly string[] =
	playerInfoUpdateCreators.map((c) => c.type);

export { playerInfoCommands, type PlayerInfoUpdateCommand };
