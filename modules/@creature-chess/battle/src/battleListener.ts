import {
	Dispatch,
	TypedStartListening,
	UnknownAction,
} from "@reduxjs/toolkit";

import { PieceModel } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { BattleEvent, BattleEventLog } from "./battleEventLog";
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
import { PieceRegistry } from "@creature-chess/utils";

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
	onEvents?: (events: BattleEvent[]) => void,
) => {
	let turnCount = startingTurn;

	const combatStore = pieceInfoStore<PieceCombatState>({
		state: { type: "wandering" },

		canMoveAtTurn: 15,
		canBeAttackedAtTurn: 0,
		canAttackAtTurn: 15,
	});

	const eventLog = new BattleEventLog();

	while (true) {
		const shouldStop =
			turnCount >= settings.battleTurnCount || isATeamDefeated(board, pieceRegistry);

		if (shouldStop) {
			// Emit dying events and remove any pieces that died on the final turn
			const deadPieceIds: string[] = [];
			for (const p of board.getAllPieces()) {
				const piece = pieceRegistry.getPieceById(p.id);
				if (piece && piece.currentHealth <= 0) {
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

			await duration(1000).remaining().promise;

			dispatch(battleFinishEvent({ turn: turnCount }));
			break;
		}

		while (controls.paused) {
			await duration(1000).remaining().promise;
		}

		const turnTimer = duration(settings.battleTurnDuration);

		simulateTurn(++turnCount, board, pieceRegistry, { combatStore, eventLog });

		const events = eventLog.consume();
		if (events.length > 0 && onEvents) {
			onEvents(events);
		}

		await turnTimer.remaining().promise;
	}
};

export const setupBattleListeners = <TState>(
	startListening: TypedStartListening<TState, Dispatch<UnknownAction>>,
	settings: GamemodeSettings,
	board: Board,
	pieceRegistry: PieceRegistry,
	onEvents?: (events: BattleEvent[]) => void,
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
			await runBattle(controls, board, pieceRegistry, action.payload.turn || 0, settings, api.dispatch, onEvents);
		},
	});
};
