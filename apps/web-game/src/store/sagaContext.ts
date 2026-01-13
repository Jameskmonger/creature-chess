import { getContext } from "typed-redux-saga";

import { SubscribableBoard } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

type Slices = {
	board: SubscribableBoard;
	bench: SubscribableBoard;
	matchBoard: SubscribableBoard;
	pieceRegistry: PieceRegistry;
};

export type SagaContext = {
	slices: Slices;
};

export const getPlayerSlices = () => getContext<Slices>("slices");
