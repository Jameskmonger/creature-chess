import { takeLatest, select, put, call, all } from "@redux-saga/core/effects";

import { BoardState, BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import { GameOptions } from "@creature-chess/models/config";

import {
	pauseBattleCommand,
	resumeBattleCommand,
	StartBattleCommand,
	startBattleCommand,
} from "./commands";
import { battleFinishEvent, battleTurnEvent, exposeStoreEvent } from "./events";
import { simulateTurn } from "./simulator";
import { PieceCombatState } from "./state/state";
import { pieceInfoStore } from "./state/store";
import { duration } from "./utils/duration";
import { isATeamDefeated } from "./utils/isATeamDefeated";

const runBattle = function* (
	controls: { paused: false },
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

		canMoveAtTurn: 15,
		canBeAttackedAtTurn: 0,
		canAttackAtTurn: 15,
	});

	yield put(exposeStoreEvent({ stores: { combat: combatStore } }));

	while (true) {
		const shouldStop =
			turnCount >= options.battle.turnCount || isATeamDefeated(board);

		if (shouldStop) {
			yield duration(1000).remaining();

			yield put(battleFinishEvent({ turn: turnCount }));
			break;
		}

		while (controls.paused) {
			yield duration(1000).remaining();
		}

		const turnTimer = duration(options.battle.turnDuration);

		board = simulateTurn(++turnCount, board, boardSlice, { combatStore });
		yield put(
			battleTurnEvent({
				turn: turnCount,
				board,
			})
		);

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

			const controls = { paused: false };

			yield all([
				takeLatest(pauseBattleCommand, function* () {
					controls.paused = true;
				}),
				takeLatest(resumeBattleCommand, function* () {
					controls.paused = false;
				}),
				call(
					runBattle as any,
					controls,
					board,
					boardSlice,
					turn || 0,
					gameOptions
				),
			]);
		}
	);
};
