import {
	Dispatch,
	TypedStartListening,
	UnknownAction,
	isAnyOf,
} from "@reduxjs/toolkit";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import {
	pauseBattleCommand,
	resumeBattleCommand,
	startBattleCommand,
} from "./commands";
import { battleFinishEvent } from "./events";
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

	return new Set(pieceOwnerIds).size <= 1;
};

const runBattle = async (
	controls: { paused: boolean },
	board: Board,
	pieceRegistry: PieceRegistry,
	startingTurn: number,
	settings: GamemodeSettings,
	dispatch: Dispatch,
) => {
	let turnCount = startingTurn;

	const combatStore = pieceInfoStore<PieceCombatState>({
		state: { type: "wandering" },

		canMoveAtTurn: 15,
		canBeAttackedAtTurn: 0,
		canAttackAtTurn: 15,
	});

	while (true) {
		const shouldStop =
			turnCount >= settings.battleTurnCount || isATeamDefeated(board, pieceRegistry);

		if (shouldStop) {
			await duration(1000).remaining().promise;

			dispatch(battleFinishEvent({ turn: turnCount }));
			break;
		}

		while (controls.paused) {
			await duration(1000).remaining().promise;
		}

		const turnTimer = duration(settings.battleTurnDuration);

		simulateTurn(++turnCount, board, pieceRegistry, { combatStore });

		await turnTimer.remaining().promise;
	}
};

export const setupBattleListeners = <TState>(
	startListening: TypedStartListening<TState, Dispatch<UnknownAction>>,
	settings: GamemodeSettings,
	board: Board,
	pieceRegistry: PieceRegistry,
) => {
	const controls = { paused: false };

	startListening({
		actionCreator: pauseBattleCommand,
		effect: async () => {
			controls.paused = true;
		},
	});

	startListening({
		actionCreator: resumeBattleCommand,
		effect: async () => {
			controls.paused = false;
		},
	});

	startListening({
		actionCreator: startBattleCommand,
		effect: async (action, api) => {
			api.cancelActiveListeners();

			controls.paused = false;
			await runBattle(controls, board, pieceRegistry, action.payload.turn || 0, settings, api.dispatch);
		},
	});
};
