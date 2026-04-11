import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

export type MoveAction = { type: "move"; payload: { x: number; y: number } };
export type HitAction = { type: "hit"; payload: { targetId: string } };
export type DeleteAction = { type: "delete" };

export type PieceAction = MoveAction | HitAction | DeleteAction;

export type ActionHandler = (
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	id: PieceModel["id"],
	action: PieceAction,
	stores: Stores
) => void;
