import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { PieceAction } from "../actions";

export type AttackState = { type: "attacking"; payload: { targetId: string } };
export type WanderState = { type: "wandering" };

export type PieceState = WanderState | AttackState;

export type StateResult = [PieceState] | [PieceState, PieceAction[]];

export type StateFunction = (
	currentTurn: number,
	board: BoardState<PieceModel>,
	state: PieceState,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
) => StateResult;
