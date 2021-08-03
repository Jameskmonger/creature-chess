import { PieceModel, QuickChatOption, QuickChatValue } from "@creature-chess/models";
import { createAction } from "@reduxjs/toolkit";

export type AfterSellPieceEvent = ReturnType<typeof afterSellPieceEvent>;
export const afterSellPieceEvent = createAction<{ piece: PieceModel }, "afterSellPieceEvent">("afterSellPieceEvent");

export type AfterRerollCardsEvent = ReturnType<typeof afterRerollCardsEvent>;
export const afterRerollCardsEvent = createAction("afterRerollCardsEvent");


export type PlayerEvent =
	AfterSellPieceEvent
	| AfterRerollCardsEvent;
