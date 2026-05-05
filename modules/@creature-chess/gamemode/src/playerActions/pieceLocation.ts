import { z } from "zod";

import { Board, PackedPosition, unpackPosition, unpackX } from "@creature-chess/board";
import { GamePhase, PlayerPieceLocation } from "@creature-chess/models";

import { PlayerState } from "../entities/player/state";

/**
 * Wire schema for {@link PlayerPieceLocation}. Validates the plain number
 * coming off the wire and brands it as `PackedPosition` for handlers.
 */
export const pieceLocationSchema = z.object({
	type: z.enum(["board", "bench"]),
	location: z
		.number()
		.int()
		.nonnegative()
		.transform((n) => n as PackedPosition),
});

export const findPiece = (
	board: Board,
	bench: Board,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		const [x, y] = unpackPosition(location.location);
		return board.getPieceIdAtPosition(x, y);
	}

	return bench.getPieceIdAtPosition(unpackX(location.location), 0);
};

export const isLocationLocked = (
	state: PlayerState,
	location: PlayerPieceLocation
) => {
	if (location.type === "board") {
		return state.roundInfo.phase !== GamePhase.PREPARING;
	}
	return false;
};
