import { takeLatest, select, put, call } from "@redux-saga/core/effects";

import { BoardState, BoardSlice, BoardSelectors } from "@shoki/board";

import { PieceModel, GameOptions } from "@creature-chess/models";

import { StartBattleCommand, startBattleCommand } from "./commands";
import { battleFinishEvent, battleTurnEvent } from "./events";
import { simulateTurn } from "./simulator";
import { PieceCombatState } from "./state/state";
import { pieceInfoStore } from "./state/store";
import { duration } from "./utils/duration";
import { isATeamDefeated } from "./utils/isATeamDefeated";

const runBattle = function* (
	initialBoard: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	startingTurn: number,
	options: GameOptions
) {
	let board: BoardState<PieceModel> = {
		id: initialBoard.id,
		pieces: {
			...initialBoard.pieces,
		},
		piecePositions: {
			...initialBoard.piecePositions,
		},
		locked: initialBoard.locked,
		size: initialBoard.size,
		pieceLimit: null,
	};

	let turnCount = startingTurn;

	const combatStore = pieceInfoStore<PieceCombatState>({
		state: { type: "wandering" },

		targetId: null,
		canMoveAtTurn: 10,
		canBeAttackedAtTurn: 0,
		canAttackAtTurn: null,
	});

	while (true) {
		const shouldStop = turnCount >= options.turnCount || isATeamDefeated(board);

		if (shouldStop) {
			yield duration(1000).remaining();

			yield put(battleFinishEvent({ turn: turnCount }));
			break;
		}

		const turnTimer = duration(options.turnDuration);

		board = simulateTurn(++turnCount, board, boardSlice, { combatStore });
		yield put(battleTurnEvent({ turn: turnCount, board }));

		yield turnTimer.remaining();
	}
};

export const battleSaga = function* (
	boardSelector: <TState>(state: TState) => BoardState<PieceModel>,
	gameOptions: GameOptions,
	boardSlice: BoardSlice<PieceModel>
) {
	yield takeLatest<StartBattleCommand>(
		startBattleCommand,
		function* ({ payload: { turn } }) {
			const board: BoardState<PieceModel> = yield select(boardSelector);

			yield call(runBattle, board, boardSlice, turn || 0, gameOptions);
		}
	);
};
