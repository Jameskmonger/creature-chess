import { eventChannel, buffers, EventChannel } from "redux-saga";
import { takeLatest, takeEvery, select, put, call, cancelled } from "@redux-saga/core/effects";
// no typings so this needs a standard require
// tslint:disable-next-line: no-var-requires
const present = require("present");

import { IndexedPieces, createPieceCombatState, PieceModel, GameOptions } from "@creature-chess/models";
import { BoardState, BoardSlice } from "@creature-chess/board";

import { simulateTurn } from "./turnSimulator";
import { isATeamDefeated } from "./utils/is-a-team-defeated";
import { BattleEvent, battleFinishEvent, battleTurnEvent } from "./events";

const START_BATTLE = "START_BATTLE";
type START_BATTLE = typeof START_BATTLE;
type StartBattleCommand = { type: START_BATTLE, payload: { turn?: number } };
export const startBattle = (turn?: number): StartBattleCommand => ({ type: START_BATTLE, payload: { turn } });

const duration = (ms: number) => {
	const startTime = present();

	return {
		remaining: () => {
			return new Promise<void>(resolve => {
				const endTime = present();
				const timePassed = endTime - startTime;

				const remaining = Math.max(ms - timePassed, 0);

				if (remaining === 0) {
					resolve();
					return;
				}

				setTimeout(() => resolve(), remaining);
			});
		}
	};
};

const addCombatState = (pieces: IndexedPieces) => {
	return Object.entries(pieces)
		.reduce<IndexedPieces>((acc, [pieceId, piece]) => {
			acc[pieceId] = {
				...piece,
				combat: createPieceCombatState()
			};

			return acc;
		}, {});
};

const runBattle = function*(
	initialBoard: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	startingTurn: number,
	options: GameOptions
) {
	let board: BoardState<PieceModel> = {
		id: initialBoard.id,
		pieces: addCombatState(initialBoard.pieces),
		piecePositions: {
			...initialBoard.piecePositions
		},
		locked: initialBoard.locked,
		size: initialBoard.size,
		pieceLimit: null
	};

	let turnCount = startingTurn;

	while (true) {
		const shouldStop = (
			turnCount >= options.turnCount
			|| isATeamDefeated(board)
		);

		if (shouldStop) {
			yield duration(1000).remaining();

			yield put(battleFinishEvent(turnCount));
			break;
		}

		const turnTimer = duration(options.turnDuration);

		board = simulateTurn(++turnCount, board, boardSlice);
		yield put(battleTurnEvent(turnCount, board));

		yield turnTimer.remaining();
	}
};

export const battleSagaFactory = <TState>(
	boardSelector: (state: TState) => BoardState<PieceModel>
) => function*(gameOptions: GameOptions, boardSlice: BoardSlice<PieceModel>) {
	yield takeLatest<StartBattleCommand>(
		START_BATTLE,
		function*({ payload: { turn } }) {
			const board: BoardState<PieceModel> = yield select(boardSelector);

			yield call(runBattle, board, boardSlice, turn || 0, gameOptions);
		}
	);
};
