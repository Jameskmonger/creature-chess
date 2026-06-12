import { networkedAction } from "@cc-plugins/api";

import type { PieceModel } from "../piece";
import {
	playerReceiveQuickChatEvent,
	type PlayerReceiveQuickChatEvent,
} from "./quickChat";

export type AfterSellPieceEvent = ReturnType<typeof afterSellPieceEvent>;
export const afterSellPieceEvent = networkedAction<
	{ piece: PieceModel },
	"afterSellPieceEvent"
>("afterSellPieceEvent");

export type AfterRerollCardsEvent = ReturnType<typeof afterRerollCardsEvent>;
export const afterRerollCardsEvent = networkedAction("afterRerollCardsEvent");

export type ClientFinishMatchEvent = ReturnType<typeof clientFinishMatchEvent>;
export const clientFinishMatchEvent = networkedAction("clientFinishMatchEvent");

export type PlayerDeathEvent = ReturnType<typeof playerDeathEvent>;
export const playerDeathEvent = networkedAction("playerDeathEvent");

export type PlayerFinishMatchEvent = ReturnType<typeof playerFinishMatchEvent>;
export const playerFinishMatchEvent = networkedAction<
	{
		homeScore: number;
		awayScore: number;
		isHomePlayer: boolean;
	},
	"playerFinishMatchEvent"
>("playerFinishMatchEvent");

export type PlayerEventByType = {
	afterSellPiece: AfterSellPieceEvent;
	afterRerollCards: AfterRerollCardsEvent;
	clientFinishMatch: ClientFinishMatchEvent;
	playerDeath: PlayerDeathEvent;
	playerFinishMatch: PlayerFinishMatchEvent;
	playerReceiveQuickChat: PlayerReceiveQuickChatEvent;
};

const playerEventActionCreators: {
	[K in keyof PlayerEventByType]: { type: string };
} = {
	afterSellPiece: afterSellPieceEvent,
	afterRerollCards: afterRerollCardsEvent,
	clientFinishMatch: clientFinishMatchEvent,
	playerDeath: playerDeathEvent,
	playerFinishMatch: playerFinishMatchEvent,
	playerReceiveQuickChat: playerReceiveQuickChatEvent,
};

export const PlayerEventTypeByActionType: Record<
	string,
	keyof PlayerEventByType
> = Object.fromEntries(
	(Object.keys(playerEventActionCreators) as (keyof PlayerEventByType)[]).map(
		(key) => [playerEventActionCreators[key].type, key]
	)
);

export const wirePlayerEventCreators = [
	playerDeathEvent,
	playerReceiveQuickChatEvent,
] as const;

export const PlayerEventActionTypesArray: readonly string[] =
	wirePlayerEventCreators.map((c) => c.type);

export type PlayerEvent =
	| AfterSellPieceEvent
	| AfterRerollCardsEvent
	| ClientFinishMatchEvent
	| PlayerDeathEvent
	| PlayerFinishMatchEvent
	| PlayerReceiveQuickChatEvent;
