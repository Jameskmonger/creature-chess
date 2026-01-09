import { takeLatest, put, call, all } from "@redux-saga/core/effects";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import {
	pauseBattleCommand,
	resumeBattleCommand,
	StartBattleCommand,
	startBattleCommand,
} from "./commands";
import { battleFinishEvent, exposeStoreEvent } from "./events";
import { simulateTurn } from "./simulator";
import { PieceCombatState } from "./state/state";
import { pieceInfoStore } from "./state/store";
import { duration } from "./utils/duration";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

const isATeamDefeated = (board: Board, pieceRegistry: PieceRegistry) => {
	const survivingPieces = board.getAllPieces()
		.map(p => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null)
		.filter(p => p.currentHealth > 0);

	const pieceOwnerIds = survivingPieces
		.map((p) => p.ownerId);

	// if there are only pieces belonging to 1 or 0 players, then we have a winner
	return new Set(pieceOwnerIds).size <= 1;
};

const runBattle = function*(
	controls: { paused: boolean },
	board: Board,
	pieceRegistry: PieceRegistry,
	startingTurn: number,
	settings: GamemodeSettings
) {
	let turnCount = startingTurn;

	const combatStore = pieceInfoStore<PieceCombatState>({
		state: { type: "wandering" },

		canMoveAtTurn: 15,
		canBeAttackedAtTurn: 0,
		canAttackAtTurn: 15,
	});

	/**
	 * TODO (jkm) come up with a better way to expose the store
	 * https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants
	 */
	yield put(exposeStoreEvent({ stores: { combat: combatStore } }));

	while (true) {
		const shouldStop =
			turnCount >= settings.battleTurnCount || isATeamDefeated(board, pieceRegistry);

		if (shouldStop) {
			yield duration(1000).remaining().promise;

			yield put(battleFinishEvent({ turn: turnCount }));
			break;
		}

		while (controls.paused) {
			yield duration(1000).remaining().promise;
		}

		const turnTimer = duration(settings.battleTurnDuration);

		simulateTurn(++turnCount, board, pieceRegistry, { combatStore });

		yield turnTimer.remaining().promise;
	}
};

export const battleSaga = function*(
	settings: GamemodeSettings,
	board: Board,
	pieceRegistry: PieceRegistry,
) {
	yield takeLatest<StartBattleCommand>(
		startBattleCommand,
		function*({ payload: { turn } }) {
			const controls = { paused: false };

			yield all([
				takeLatest(pauseBattleCommand, function*() {
					controls.paused = true;
				}),
				takeLatest(resumeBattleCommand, function*() {
					controls.paused = false;
				}),
				call(runBattle, controls, board, pieceRegistry, turn || 0, settings),
			]);
		}
	);
};
