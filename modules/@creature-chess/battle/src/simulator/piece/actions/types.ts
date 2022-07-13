import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { StateResult } from "../state/types";

export type MoveAction = { type: "move"; payload: { x: number; y: number } };

export type PieceAction = MoveAction;

export type ActionFunction = (
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	piece: PieceModel,
	piecePosition: PiecePosition,
	action: MoveAction,
	{ combatStore }: Stores
) => BoardState<PieceModel>;
