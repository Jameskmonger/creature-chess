import { isAnyOf } from "@reduxjs/toolkit";

import { Board, packPosition } from "@creature-chess/board";
import { GamePhase, PieceModel } from "@creature-chess/models";
import { PIECES_TO_EVOLVE } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { getDefinitionById } from "../../../definitions";
import {
	gamePhaseStartedEvent,
	GamePhaseStartedEvent,
} from "../../../game/events";
import { PlayerStartListening } from "../player";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
	removeBenchPiecesCommand,
	removeBoardPiecesCommand,
} from "../state/board";
import { isPlayerBoardLocked } from "../state/selectors";

const pieceCanEvolve = (piece: PieceModel) => {
	const definition = getDefinitionById(piece.definitionId);

	if (!definition) {
		return false;
	}

	return piece.stage < definition.stages.length - 1;
};

function getPiecesForDefinition(
	board: Board,
	pieceRegistry: PieceRegistry,
	definitionId: number
) {
	return board
		.getAllPieces()
		.map(({ id }) => pieceRegistry.getPieceById(id))
		.filter((p): p is NonNullable<typeof p> => p !== null)
		.filter((p) => p.definitionId === definitionId);
}

const getCombinablePieces = (pieces: PieceModel[], targetStage: number) =>
	pieces.filter((p) => p.stage === targetStage);

export const setupEvolutionListener = (
	startListening: PlayerStartListening
) => {
	startListening({
		matcher: isAnyOf(addBoardPieceCommand, addBenchPieceCommand),
		effect: async (action, api) => {
			api.cancelActiveListeners();

			const {
				board,
				bench,
				gamemode: { pieceRegistry },
			} = api.player;

			const { pieceId } = (
				action as
					| ReturnType<typeof addBoardPieceCommand>
					| ReturnType<typeof addBenchPieceCommand>
			).payload;

			const piece = pieceRegistry.getPieceById(pieceId);

			if (!piece) {
				return;
			}

			if (!pieceCanEvolve(piece)) {
				return;
			}

			const boardLocked = isPlayerBoardLocked(api.getState());

			// if evolution is locked, wait for it to be unlocked
			if (boardLocked) {
				// todo check if we have 3 evolvable pieces on the bench and evolve those? maybe

				// wait for preparing phase to begin
				await api.take(
					(a) =>
						a.type === gamePhaseStartedEvent.type &&
						(a as GamePhaseStartedEvent).payload.phase === GamePhase.PREPARING
				);

				await api.delay(500);
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
				api.dispatch(removeBoardPiecesCommand({ pieceIds: boardPieceIds }));

				const benchPieceIds = matchingBenchPieces.map((p) => p.id);
				api.dispatch(
					removeBenchPiecesCommand({
						pieceIds: [...benchPieceIds, piece.id],
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

				api.dispatch(
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

				api.dispatch(
					removeBenchPiecesCommand({
						pieceIds: [...benchPieceIds, piece.id],
					})
				);

				for (const p of [...benchPieceIds, piece.id]) {
					pieceRegistry.deregisterPiece(p);
				}

				pieceRegistry.registerPiece(newPiece);

				api.dispatch(
					addBenchPieceCommand({
						pieceId: newPiece.id,
						position: { x },
					})
				);
			}
		},
	});
};
