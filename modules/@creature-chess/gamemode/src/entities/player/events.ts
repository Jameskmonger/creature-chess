import { createAction } from "@reduxjs/toolkit";

import { PieceModel, QuickChatOption } from "@creature-chess/models";

import { playerInfoCommands } from "./state/playerInfo/reducer";

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
