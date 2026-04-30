import { Dispatch, TypedStartListening, UnknownAction } from "@reduxjs/toolkit";

import { Board } from "@creature-chess/board";
import { GamemodeSettings, PieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BattleEvent, BattleEventLog } from "./battleEventLog";
import {
	pauseBattleCommand,
	resumeBattleCommand,
	startBattleCommand,
} from "./commands";
import { battleFinishEvent } from "./events";
import { simulateTurn } from "./simulator";
import { PieceCombatState, PieceInfoStore } from "./state";
import { duration } from "./utils/duration";

const isATeamDefeated = (
	board: Board,
	pieceRegistry: PieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>
) => {
	const survivingPieces = board
		.getAllPieces()
		.map((p) => pieceRegistry.getPieceById(p.id))
		.filter((p): p is PieceModel => p !== null)
		.filter((p) => combatStore.getPiece(p.id).currentHealth > 0);

	const pieceOwnerIds = survivingPieces.map((p) => p.ownerId);

	return new Set(pieceOwnerIds).size <= 1;
};

const runBattle = async (
	controls: { paused: boolean },
	board: Board,
	pieceRegistry: PieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>,
	startingTurn: number,
	settings: GamemodeSettings,
	dispatch: Dispatch,
	onEvents?: (events: BattleEvent[]) => void
) => {
	let turnCount = startingTurn;

	const eventLog = new BattleEventLog();

	while (true) {
		const shouldStop =
			turnCount >= settings.battleTurnCount ||
			isATeamDefeated(board, pieceRegistry, combatStore);

		if (shouldStop) {
			// Emit dying events and remove any pieces that died on the final turn
			const deadPieceIds: string[] = [];
			for (const p of board.getAllPieces()) {
				const piece = pieceRegistry.getPieceById(p.id);
				if (piece && combatStore.getPiece(p.id).currentHealth <= 0) {
					eventLog.append({ type: "piece_dying", pieceId: p.id });
					deadPieceIds.push(p.id);
				}
			}

			const finalEvents = eventLog.consume();
			if (finalEvents.length > 0 && onEvents) {
				onEvents(finalEvents);
			}

			for (const id of deadPieceIds) {
				board.removePiece(id);
			}

			await duration(settings.postBattleSettleMs).remaining().promise;

			dispatch(battleFinishEvent({ turn: turnCount }));
			break;
		}

		while (controls.paused) {
			await duration(1000).remaining().promise;
		}

		const turnTimer =
			settings.battleTurnDuration > 0
				? duration(settings.battleTurnDuration)
				: null;

		simulateTurn(++turnCount, board, pieceRegistry, { combatStore, eventLog });

		const events = eventLog.consume();
		if (events.length > 0 && onEvents) {
			onEvents(events);
		}

		if (turnTimer !== null) {
			await turnTimer.remaining().promise;
		}
	}
};

export const setupBattleListeners = <TState>(
	startListening: TypedStartListening<TState, Dispatch<UnknownAction>>,
	settings: GamemodeSettings,
	board: Board,
	pieceRegistry: PieceRegistry,
	combatStore: PieceInfoStore<PieceCombatState>,
	onEvents?: (events: BattleEvent[]) => void
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
			await runBattle(
				controls,
				board,
				pieceRegistry,
				combatStore,
				action.payload.turn || 0,
				settings,
				api.dispatch,
				onEvents
			);
		},
	});
};
