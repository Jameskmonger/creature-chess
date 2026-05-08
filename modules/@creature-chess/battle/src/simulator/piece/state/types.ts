import { Board } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { Stores } from "../../types";
import { PieceAction } from "../actions";

export type AttackState = { type: "attacking"; payload: { targetId: string } };
export type WanderState = { type: "wandering" };
export type DyingState = { type: "dying"; payload: { dieAtTurn: number } };

export type PieceState = WanderState | DyingState | AttackState;

export type StateResult = [PieceState] | [PieceState, PieceAction[]];

export type StateHandler = (
	currentTurn: number,
	state: PieceState,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore }: Stores
) => StateResult;
