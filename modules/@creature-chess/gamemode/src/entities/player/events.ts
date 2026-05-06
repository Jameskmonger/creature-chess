import { createAction } from "@reduxjs/toolkit";

import { PieceModel, QuickChatOption } from "@creature-chess/models";

export type AfterSellPieceEvent = ReturnType<typeof afterSellPieceEvent>;
export const afterSellPieceEvent = createAction<
	{ piece: PieceModel },
	"afterSellPieceEvent"
>("afterSellPieceEvent");

export type AfterRerollCardsEvent = ReturnType<typeof afterRerollCardsEvent>;
export const afterRerollCardsEvent = createAction("afterRerollCardsEvent");

export type ClientFinishMatchEvent = ReturnType<typeof clientFinishMatchEvent>;
export const clientFinishMatchEvent = createAction("clientFinishMatchEvent");

export type PlayerDeathEvent = ReturnType<typeof playerDeathEvent>;
export const playerDeathEvent = createAction("playerDeathEvent");

export type PlayerFinishMatchEvent = ReturnType<typeof playerFinishMatchEvent>;
export const playerFinishMatchEvent = createAction<
	{
		homeScore: number;
		awayScore: number;
		isHomePlayer: boolean;
	},
	"playerFinishMatchEvent"
>("playerFinishMatchEvent");

export type PlayerReceiveQuickChatEvent = ReturnType<
	typeof playerReceiveQuickChatEvent
>;
export const playerReceiveQuickChatEvent = createAction<
	{
		sendingPlayerId: string;
		chatValue: QuickChatOption;
	},
	"playerReceiveQuickChatEvent"
>("playerReceiveQuickChatEvent");

/**
 * Keyed map of every Player event — the surface for the keyed
 * `player.events.onPlayerEvent(type, fn)` channel. Includes both
 * wire-forwarded events and server-internal events.
 */
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

export const PlayerEventTypeByActionType: Record<string, keyof PlayerEventByType> =
	Object.fromEntries(
		(Object.keys(playerEventActionCreators) as (keyof PlayerEventByType)[]).map(
			(key) => [playerEventActionCreators[key].type, key]
		)
	);

// Wire-shape subset: events the server forwards to the client over
// `sendLocalPlayerEvents`. The firehose `player.events.onPlayerEvent(fn)`
// fires only for these. Internal events go through the keyed channel.
export const PlayerEventActionTypesArray = [
	playerDeathEvent.toString(),
	playerReceiveQuickChatEvent.toString(),
];

export type PlayerEvent =
	| AfterSellPieceEvent
	| AfterRerollCardsEvent
	| ClientFinishMatchEvent
	| PlayerDeathEvent
	| PlayerFinishMatchEvent
	| PlayerReceiveQuickChatEvent;
