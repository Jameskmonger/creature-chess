import { takeLatest, take, delay, put } from "@redux-saga/core/effects";
import { select } from "typed-redux-saga";

import { BoardSelectors } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

import { getDefinitionById } from "../../../definitions";
import * as pieceSelectors from "../../../player/pieceSelectors";
import { getPlayerEntityDependencies } from "../dependencies";
import { PlayerState } from "../state";
import { isPlayerBoardLocked } from "../state/selectors";

const pieceCanEvolve = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);

	if (!definition) {
		return false;
	}

	return piece.stage < definition.stages.length - 1;
};

export const evolutionSaga = function* () {
	const {
		boardSlices: { boardSlice, benchSlice },
	} = yield* getPlayerEntityDependencies();

	yield takeLatest<
		| ReturnType<typeof boardSlice.commands.addBoardPieceCommand>
		| ReturnType<typeof benchSlice.commands.addBoardPieceCommand>
	>(
		// need to check when bench/board pieces are added (could have come from shop)
		// or when board piece is updated (could be due to a previous evolution)
		[
			boardSlice.commands.addBoardPieceCommand,
			benchSlice.commands.addBoardPieceCommand,
		],
		function* ({ payload: { piece } }) {
			if (!pieceCanEvolve(piece)) {
				return;
			}

			const boardLocked = yield* select(isPlayerBoardLocked);

			// if evolution is locked, wait for it to be unlocked
			if (boardLocked) {
				// todo check if we have 3 evolvable pieces on the bench and evolve those? maybe

				yield take(boardSlice.commands.unlockBoardCommand);
				yield delay(500);
			}

			const targetDefinitionId = piece.definitionId;
			const targetStage = piece.stage;

			const getCombinablePieces = (pieces: PieceModel[]) =>
				pieces.filter((p) => p.stage === targetStage);

			const matchingBoardPieces = yield* select((state: PlayerState) =>
				getCombinablePieces(
					pieceSelectors.getPiecesForDefinition(state.board, targetDefinitionId)
				)
			);
			const matchingBenchPieces = yield* select((state: PlayerState) =>
				getCombinablePieces(
					pieceSelectors.getPiecesForDefinition(state.bench, targetDefinitionId)
				)
			);

			const totalInstances =
				matchingBoardPieces.length + matchingBenchPieces.length;

			if (totalInstances < DEFAULT_GAME_OPTIONS.game.piecesToEvolve) {
				return;
			}

			if (matchingBoardPieces.length > 0) {
				// replace a board piece if it exists
				const pieceToReplace = matchingBoardPieces.pop()!;

				const piecePosition = yield* select((s: PlayerState) =>
					BoardSelectors.getPiecePosition(s.board, pieceToReplace.id)
				);

				if (!piecePosition) {
					return;
				}

				const { x, y } = piecePosition;

				// remove any remaining board pieces
				const boardPieceIds = [...matchingBoardPieces, pieceToReplace].map(
					(p) => p.id
				);
				yield put(boardSlice.commands.removeBoardPiecesCommand(boardPieceIds));

				const benchPieceIds = matchingBenchPieces.map((p) => p.id);
				yield put(
					benchSlice.commands.removeBoardPiecesCommand([
						...benchPieceIds,
						piece.id,
					])
				);

				const newPiece = {
					...pieceToReplace,
					stage: targetStage + 1,
				};

				yield put(
					boardSlice.commands.addBoardPieceCommand({ x, y, piece: newPiece })
				);
			} else {
				// otherwise replace the just-added bench piece
				const benchPieceIds = matchingBenchPieces.map((p) => p.id);

				const newPiece = {
					...piece,
					stage: targetStage + 1,
				};

				const piecePosition = yield* select((s: PlayerState) =>
					BoardSelectors.getPiecePosition(s.bench, piece.id)
				);

				if (!piecePosition) {
					return;
				}

				const { x, y } = piecePosition;

				yield put(
					benchSlice.commands.removeBoardPiecesCommand([
						...benchPieceIds,
						piece.id,
					])
				);
				yield put(
					benchSlice.commands.addBoardPieceCommand({ x, y, piece: newPiece })
				);
			}
		}
	);
};
