import delay from "delay";

import { GamePhase } from "@creature-chess/models";

import {
	Player,
	PlayerCommands,
	GameEvents,
	PlayerEvents,
	removeBenchPiecesCommand,
	removeBoardPiecesCommand,
} from "@creature-chess/gamemode";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
	moveBenchPieceCommand,
	moveBoardPieceCommand,
	removeBenchPieceCommand,
	removeBoardPieceCommand,
	swapBenchPiecesCommand,
	swapBoardPiecesCommand,
} from "@creature-chess/gamemode";
import { serialiseBoard } from "@creature-chess/networking";

import { GameSocket } from "../socket";

const BOARD_CHANGE_ACTIONS = new Set([
	addBoardPieceCommand.type,
	moveBoardPieceCommand.type,
	removeBoardPieceCommand.type,
	removeBoardPiecesCommand.type,
	swapBoardPiecesCommand.type,
]);

const BENCH_CHANGE_ACTIONS = new Set([
	addBenchPieceCommand.type,
	moveBenchPieceCommand.type,
	removeBenchPieceCommand.type,
	removeBenchPiecesCommand.type,
	swapBenchPiecesCommand.type,
]);

const setupSpectateListeners = (
	targetEntity: Player,
	localPlayerId: string,
	socket: GameSocket
) => {
	const {
		board,
		bench,
		gamemode: { pieceRegistry },
	} = targetEntity;

	// Send current board and bench state immediately so the client
	// doesn't show stale data from a previous spectating target.
	socket.emit("boardUpdate", serialiseBoard(board, pieceRegistry));
	socket.emit("benchUpdate", serialiseBoard(bench, pieceRegistry));

	const match = targetEntity.match;
	if (match) {
		const matchBoard = match.getBoardForPlayer(localPlayerId);
		socket.emit("matchBoardUpdate", {
			turn: match.getTurn(),
			board: serialiseBoard(matchBoard.board, pieceRegistry),
		});

		// todo send opponentId
	}

	const unsubscribes: (() => void)[] = [];

	unsubscribes.push(
		targetEntity.addListener({
			actionCreator: GameEvents.gamePhaseStartedEvent,
			effect: async ({ payload: { phase } }, api) => {
				if (phase !== GamePhase.READY) {
					return;
				}

				const currentMatch = api.player.match;
				if (currentMatch) {
					const boardData = currentMatch.getBoardForPlayer(localPlayerId);
					socket.emit("matchBoardUpdate", {
						turn: null,
						board: serialiseBoard(boardData.board, pieceRegistry),
					});
				}

				// Wait for finish match
				await api.take(
					(a) => a.type === PlayerEvents.playerFinishMatchEvent.type
				);
			},
		})
	);

	// Watch board changes
	unsubscribes.push(
		targetEntity.addListener({
			predicate: (action) => BOARD_CHANGE_ACTIONS.has(action.type),
			effect: async (_action, api) => {
				api.cancelActiveListeners();
				await delay(50);
				socket.emit("boardUpdate", serialiseBoard(board, pieceRegistry));
			},
		})
	);

	// Watch bench changes
	unsubscribes.push(
		targetEntity.addListener({
			predicate: (action) => BENCH_CHANGE_ACTIONS.has(action.type),
			effect: async (_action, api) => {
				api.cancelActiveListeners();
				await delay(50);
				socket.emit("benchUpdate", serialiseBoard(bench, pieceRegistry));
			},
		})
	);

	return () => unsubscribes.forEach((fn) => fn());
};

/**
 * Watch the local player board and bench, or that of the currently spectated player.
 * Registers a listener on the player entity for spectating changes.
 */
export const setupPlayerBoard = (entity: Player, socket: GameSocket) => {
	let cleanupSpectate: (() => void) | null = null;

	const startSpectating = (targetEntity: Player) => {
		cleanupSpectate?.();
		cleanupSpectate = setupSpectateListeners(targetEntity, entity.id, socket);
	};

	const task = entity.runEffect(async () => {
		await delay(200);

		const target = entity.spectatingId
			? entity.gamemode.getPlayerById(entity.spectatingId) || entity
			: entity;

		startSpectating(target);
	});

	const unsubSpectateChange = entity.addListener({
		actionCreator: PlayerCommands.setSpectatingIdCommand,
		effect: async (_action, api) => {
			const targetEntity = api.player.spectatingId
				? api.player.gamemode.getPlayerById(api.player.spectatingId) || entity
				: entity;

			startSpectating(targetEntity);
		},
	});

	return () => {
		cleanupSpectate?.();
		task.cancel();
		unsubSpectateChange();
	};
};
