import { Board, PackedPosition } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { Stores } from "../../types";

export type MoveAction = { type: "move"; payload: PackedPosition };
export type HitAction = { type: "hit"; payload: { targetId: string } };
export type DeleteAction = { type: "delete" };

export type PieceAction = MoveAction | HitAction | DeleteAction;

export type ActionHandler = (
	currentTurn: number,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	id: PieceModel["id"],
	action: PieceAction,
	stores: Stores
) => void;
