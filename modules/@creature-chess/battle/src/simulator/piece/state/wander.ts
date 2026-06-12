import { Board, packPosition, unpackX, unpackY } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { StandardTargetProvider } from "../../../targeting/provider/StandardTargetProvider";
import { TargetProvider } from "../../../targeting/provider/TargetProvider";
import { getTargetAttackPositions } from "../../../targeting/utils/getTargetAttackPositions";
import { Stores } from "../../types";
import { MoveAction } from "../actions";
import { PieceState, StateResult, WanderState } from "./types";

const targetProvider: TargetProvider = new StandardTargetProvider();

function findBestState(
	currentTurn: number,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore, creatures }: Stores
): PieceState {
	const combatState = combatStore.getPiece(pieceId);

	if (combatState.canAttackAtTurn <= currentTurn) {
		const targetId = targetProvider.getTarget(
			board,
			pieceRegistry,
			combatStore,
			creatures,
			pieceId
		);

		if (targetId) {
			return { type: "attacking", payload: { targetId } };
		}
	}

	return { type: "wandering" };
}

export function doWander(
	currentTurn: number,
	state: WanderState,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	pieceId: PieceModel["id"],
	stores: Stores
): StateResult {
	// TODO search for a better state here and return early
	const bestState = findBestState(
		currentTurn,
		board,
		pieceRegistry,
		pieceId,
		stores
	);

	const { combatStore } = stores;

	if (bestState.type !== "wandering") {
		return [bestState];
	}

	const combatState = combatStore.getPiece(pieceId);

	// if the piece can't move yet, don't do anything
	if ((combatState.canMoveAtTurn || 0) > currentTurn) {
		return [state];
	}

	const piecePosition = board.getPiecePosition(pieceId);

	if (!piecePosition) {
		return [state];
	}

	const adjacentPositions = getTargetAttackPositions(
		{ width: board.width, height: board.height },
		packPosition(piecePosition[0], piecePosition[1])
	);
	const emptyPositions = adjacentPositions.filter(
		(p) => board.getPieceIdAtPosition(unpackX(p), unpackY(p)) === null
	);

	// no empty positions, so don't do anything
	if (emptyPositions.length === 0) {
		return [state];
	}

	const moveAction: MoveAction = {
		type: "move",
		payload: emptyPositions[0],
	};

	return [state, [moveAction]];
}
