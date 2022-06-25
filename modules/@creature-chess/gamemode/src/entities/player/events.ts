import { createAction } from "@reduxjs/toolkit";

import {
	PieceModel,
	QuickChatOption,
	QuickChatValue,
} from "@creature-chess/models";

import { PlayerMatchRewards } from "./state/playerInfo/reducer";

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

export type PlayerMatchRewardsEvent = ReturnType<
	typeof playerMatchRewardsEvent
>;
export const playerMatchRewardsEvent = createAction<
	PlayerMatchRewards | null,
	"playerMatchRewardsEvent"
>("playerMatchRewardsEvent");

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
	playerMatchRewardsEvent.toString(),
	playerReceiveQuickChatEvent.toString(),
];

export type PlayerEvent =
	| AfterSellPieceEvent
	| AfterRerollCardsEvent
	| ClientFinishMatchEvent
	| PlayerDeathEvent
	| PlayerMatchRewardsEvent
	| PlayerFinishMatchEvent
	| PlayerReceiveQuickChatEvent;
