import { Builders } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

import { definitions } from "./state";

export const makePiece = (
	id: string,
	ownerId: "A" | "B",
	definition: number,
	facingAway: boolean
) =>
	Builders.buildPieceModel({
		id,
		ownerId,
		definition: definitions[definition],
		definitionId: definitions[definition].id,
		facingAway,
	});

export const initialBoardPieces = {
	pieces: {
		["001"]: makePiece("001", "A", 1, false),
		["002"]: makePiece("002", "A", 2, false),
		["003"]: makePiece("003", "A", 3, false),
		["004"]: makePiece("004", "A", 4, false),
		["101"]: makePiece("101", "B", 9, true),
		["102"]: makePiece("102", "B", 10, true),
		["103"]: makePiece("103", "B", 11, true),
	},
	piecePositions: {
		["3,2"]: "001",
		["2,2"]: "002",
		["4,2"]: "003",
		["3,1"]: "004",
		["2,3"]: "101",
		["3,3"]: "102",
		["4,3"]: "103",
	},
	size: DEFAULT_GAME_OPTIONS.boardSize,
};
