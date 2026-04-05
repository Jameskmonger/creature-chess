import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";
import { SubscribableBoard } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

import { AppState } from "./state";

type Slices = {
	board: SubscribableBoard;
	bench: SubscribableBoard;
	matchBoard: SubscribableBoard;
	pieceRegistry: PieceRegistry;
};

export type ClientExtra = {
	slices: Slices;
};

export type ClientStartListening = TypedStartListening<AppState, Dispatch<UnknownAction>, ClientExtra>;
