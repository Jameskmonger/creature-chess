import { Board, unpackPosition } from "@creature-chess/board";
import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";

export type Placement =
	| { kind: "drop"; action: PlayerActions.DropPiecePlayerAction }
	| { kind: "swap"; action: PlayerActions.SwapPiecePlayerAction }
	| { kind: "noop" };

export function resolvePiecePlacement(
	sourcePieceId: string,
	target: PlayerPieceLocation,
	board: Board,
	bench: Board
): Placement {
	const targetBoard = target.type === "board" ? board : bench;
	const [x, y] = unpackPosition(target.location);
	const occupant = targetBoard.getPieceIdAtPosition(x, y);

	if (occupant === sourcePieceId) {
		return { kind: "noop" };
	}

	if (occupant !== null) {
		return {
			kind: "swap",
			action: PlayerActions.swapPiecePlayerAction({
				pieceAId: sourcePieceId,
				pieceBId: occupant,
			}),
		};
	}

	return {
		kind: "drop",
		action: PlayerActions.dropPiecePlayerAction({
			pieceId: sourcePieceId,
			to: target,
		}),
	};
}
