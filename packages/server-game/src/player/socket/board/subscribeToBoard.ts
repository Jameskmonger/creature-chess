import { select, takeLatest } from "typed-redux-saga";
import { BoardSlice, BoardState } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";
import { PlayerState } from "@creature-chess/gamemode";

/**
 * A subscriber to observe a player's board and call a callback whenever it changes
 *
 * @param slice The {@link BoardSlice} to use
 * @param selector A selector function for the {@link BoardState} from {@link PlayerState}
 * @param callback The callback function with the {@link BoardState}
 */
export const subscribeToBoard = function*(
	slice: BoardSlice<PieceModel>,
	selector: (state: PlayerState) => BoardState<PieceModel>,
	callback: (board: BoardState<PieceModel>) => void
) {
	const initialState = yield* select(selector);
	callback(initialState);

	yield takeLatest(
		[
			slice.commands.addBoardPieceCommand,
			slice.commands.moveBoardPieceCommand,
			slice.commands.removeBoardPiecesCommand,
			slice.commands.updateBoardPiecesCommand,
			slice.commands.swapPiecesCommand
		],
		function*() {
			const state = yield* select(selector);
			callback(state);
		}
	);
};
