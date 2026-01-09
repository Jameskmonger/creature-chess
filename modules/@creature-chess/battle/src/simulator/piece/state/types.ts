import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { PieceAction } from "../actions";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

export type AttackState = { type: "attacking"; payload: { targetId: string } };
export type WanderState = { type: "wandering" };
export type DyingState = { type: "dying"; payload: { dieAtTurn: number } };

export type PieceState = WanderState | DyingState | AttackState;

export type StateResult = [PieceState] | [PieceState, PieceAction[]];

export type StateHandler = (
	currentTurn: number,
	state: PieceState,
	board: Board,
	pieceRegistry: PieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore }: Stores
) => StateResult;
