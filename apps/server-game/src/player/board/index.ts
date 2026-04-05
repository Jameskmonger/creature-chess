import delay from "delay";

import {
	PlayerVariables,
	PlayerEntity,
	PlayerCommands,
	GameEvents,
	Match,
	PlayerEvents,
	PlayerState,
	removeBenchPiecesCommand,
	removeBoardPiecesCommand,
} from "@creature-chess/gamemode";
import { serialiseBoard } from "@creature-chess/networking";

import { GameSocket } from "../socket";
import { addBenchPieceCommand, addBoardPieceCommand, moveBenchPieceCommand, moveBoardPieceCommand, removeBenchPieceCommand, removeBoardPieceCommand, swapBenchPiecesCommand, swapBoardPiecesCommand } from "@creature-chess/gamemode";

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
	targetEntity: PlayerEntity,
	localPlayerId: string,
	socket: GameSocket,
) => {
	const {
		boards: { board, bench },
		gamemode: { pieceRegistry },
	} = targetEntity.dependencies;

	// Send current board and bench state immediately so the client
	// doesn't show stale data from a previous spectating target.
	socket.emit("boardUpdate", serialiseBoard(board, pieceRegistry));
	socket.emit("benchUpdate", serialiseBoard(bench, pieceRegistry));

	const match = targetEntity.getVariable<Match | null>((v) => v.match);
	if (match) {
		const matchBoard = match.getBoardForPlayer(localPlayerId);
		socket.emit("matchBoardUpdate", {
			turn: match.getTurn(),
			board: serialiseBoard(matchBoard.board, pieceRegistry, matchBoard.isHome),
		});

		// todo send opponentId
	}

	const unsubscribes: (() => void)[] = [];

	unsubscribes.push(
		targetEntity.addListener({
			actionCreator: GameEvents.playerRunReadyPhaseEvent,
			effect: async (_action, api) => {
				// todo improve this, it's to allow the match variable to be set... maybe some `setMatchEvent`
				await delay(100);

				const currentMatch = api.extra.getVariable<Match | null>((v: PlayerVariables) => v.match);
				if (currentMatch) {
					const boardData = currentMatch.getBoardForPlayer(localPlayerId);
					socket.emit("matchBoardUpdate", {
						turn: null,
						board: serialiseBoard(boardData.board, pieceRegistry, boardData.isHome),
					});
				}

				// Wait for finish match
				await api.take((a) => a.type === PlayerEvents.playerFinishMatchEvent.type);
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
export const setupPlayerBoard = (entity: PlayerEntity, socket: GameSocket) => {
	let cleanupSpectate: (() => void) | null = null;

	const startSpectating = (targetEntity: PlayerEntity) => {
		cleanupSpectate?.();
		cleanupSpectate = setupSpectateListeners(targetEntity, entity.id, socket);
	};

	const task = entity.runEffect(async () => {
		await delay(200);

		const spectatingId = entity.select((state: PlayerState) => state.spectating.id);
		const target = spectatingId
			? entity.dependencies.gamemode.getPlayerById(spectatingId) || entity
			: entity;

		startSpectating(target);
	});

	const unsubSpectateChange = entity.addListener({
		actionCreator: PlayerCommands.setSpectatingIdCommand,
		effect: async (_action, api) => {
			const spectatingId = api.getState().spectating.id;
			const targetEntity = spectatingId
				? api.extra.dependencies.gamemode.getPlayerById(spectatingId) || entity
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
