import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";
import { PieceAnimationEventStore } from "~/components/game/board/piece/match/animationEventStore";

import { SubscribableBoard } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

import { AppState } from "./state";

type Slices = {
	board: SubscribableBoard;
	bench: SubscribableBoard;
	matchBoard: SubscribableBoard;
	pieceRegistry: PieceRegistry;
	animationEventStore: PieceAnimationEventStore;
};

export type ClientExtra = {
	slices: Slices;
};

export type ClientStartListening = TypedStartListening<
	AppState,
	Dispatch<UnknownAction>,
	ClientExtra
>;
