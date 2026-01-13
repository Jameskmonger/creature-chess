import { take, delay, put } from "@redux-saga/core/effects";
import { select, takeLatest } from "typed-redux-saga";

import { GamePhase, PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models/config";

import { getDefinitionById } from "../../../definitions";
import { getPlayerEntityDependencies } from "../dependencies";
import { isPlayerBoardLocked } from "../state/selectors";
import { addBenchPieceCommand, addBoardPieceCommand, removeBenchPiecesCommand, removeBoardPiecesCommand } from "../state/board";
import { GamePhaseStartedEvent, gamePhaseStartedEvent } from "../../../game/events";
import { AnyAction } from "redux-saga";
import { Board, packPosition } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

const pieceCanEvolve = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);

	if (!definition) {
		return false;
	}

	return piece.stage < definition.stages.length - 1;
};

function getPiecesForDefinition(board: Board, pieceRegistry: PieceRegistry, definitionId: number) {
	return board.getAllPieces()
		.map(({ id }) => pieceRegistry.getPieceById(id))
		.filter((p): p is NonNullable<typeof p> => p !== null)
		.filter((p) => p.definitionId === definitionId);
}

const getCombinablePieces = (pieces: PieceModel[], targetStage: number) =>
	pieces.filter((p) => p.stage === targetStage);

export const evolutionSaga = function*() {
	const {
		boards: { board, bench },
		gamemode: { pieceRegistry }
	} = yield* getPlayerEntityDependencies();

	yield takeLatest(
		// need to check when bench/board pieces are added (could have come from shop)
		// or when board piece is updated (could be due to a previous evolution)
		[
			addBoardPieceCommand,
			addBenchPieceCommand,
		],
		function*({ payload: { pieceId } }) {
			const piece = pieceRegistry.getPieceById(pieceId);

			if (!piece) {
				return;
			}

			if (!pieceCanEvolve(piece)) {
				return;
			}

			const boardLocked = yield* select(isPlayerBoardLocked);

			// if evolution is locked, wait for it to be unlocked
			if (boardLocked) {
				// todo check if we have 3 evolvable pieces on the bench and evolve those? maybe

				// wait for preparing phase to begin
				yield take((action: AnyAction) =>
					action.type === gamePhaseStartedEvent.type
					&& (action as GamePhaseStartedEvent).payload.phase === GamePhase.PREPARING
				);

				yield delay(500);
			}

			const targetDefinitionId = piece.definitionId;
			const targetStage = piece.stage;

			const matchingBoardPieces = getCombinablePieces(
				getPiecesForDefinition(board, pieceRegistry, targetDefinitionId),
				targetStage
			);

			const matchingBenchPieces = getCombinablePieces(
				getPiecesForDefinition(bench, pieceRegistry, targetDefinitionId),
				targetStage
			);

			const totalInstances =
				matchingBoardPieces.length + matchingBenchPieces.length;

			if (totalInstances < PIECES_TO_EVOLVE) {
				return;
			}

			if (matchingBoardPieces.length > 0) {
				// replace a board piece if it exists
				const pieceToReplace = matchingBoardPieces.pop()!;

				const piecePosition = board.getPiecePosition(pieceToReplace.id);

				if (!piecePosition) {
					return;
				}

				const [x, y] = piecePosition;

				// remove any remaining board pieces
				const boardPieceIds = [...matchingBoardPieces, pieceToReplace].map(
					(p) => p.id
				);
				yield put(removeBoardPiecesCommand({ pieceIds: boardPieceIds }));

				const benchPieceIds = matchingBenchPieces.map((p) => p.id);
				yield put(
					removeBenchPiecesCommand({
						pieceIds: [
							...benchPieceIds,
							piece.id,
						]
					})
				);

				for (const p of [...boardPieceIds, ...benchPieceIds, piece.id]) {
					pieceRegistry.deregisterPiece(p);
				}

				const newPiece = {
					...pieceToReplace,
					stage: targetStage + 1,
				};

				pieceRegistry.registerPiece(newPiece);

				yield put(
					addBoardPieceCommand({
						pieceId: newPiece.id,
						position: packPosition(x, y),
					})
				);
			} else {
				// otherwise replace the just-added bench piece
				const benchPieceIds = matchingBenchPieces.map((p) => p.id);

				const newPiece = {
					...piece,
					stage: targetStage + 1,
				};

				const piecePosition = bench.getPiecePosition(piece.id);

				if (!piecePosition) {
					return;
				}

				const [x] = piecePosition;

				yield put(
					removeBenchPiecesCommand({
						pieceIds: [
							...benchPieceIds,
							piece.id,
						]
					})
				);
				yield put(
					addBenchPieceCommand({
						pieceId: newPiece.id,
						position: { x },
					})
				);
			}
		}
	);
};
