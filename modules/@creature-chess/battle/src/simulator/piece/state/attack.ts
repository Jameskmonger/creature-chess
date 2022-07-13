import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { AttackState, StateResult } from "./types";

export function doAttack(
	currentTurn: number,
	board: BoardState<PieceModel>,
	state: AttackState,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
): StateResult {
	return [state];
}
