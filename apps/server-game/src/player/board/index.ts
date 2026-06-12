import { Player } from "@creature-chess/gamemode";

import { SubscribableBoard } from "@creature-chess/board";
import { GamePhase } from "@creature-chess/models";
import { serialiseBoard } from "@creature-chess/networking";

import { GameSocket } from "../socket";

const SPECTATE_EMIT_DEBOUNCE_MS = 50;

const subscribeBoardEmit = (
	subscribable: SubscribableBoard,
	pieceRegistry: Player["gamemode"]["pieceRegistry"],
	socket: GameSocket,
	socketEvent: "boardUpdate" | "benchUpdate"
) => {
	const emit = () =>
		socket.emit(socketEvent, serialiseBoard(subscribable, pieceRegistry));

	// Fresh snapshot on subscribe - needed when spectating target switches.
	emit();

	let timer: ReturnType<typeof setTimeout> | null = null;
	const unsub = subscribable.subscribe(() => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			timer = null;
			emit();
		}, SPECTATE_EMIT_DEBOUNCE_MS);
	});

	return () => {
		if (timer) {
			clearTimeout(timer);
		}
		unsub();
	};
};

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

	const match = targetEntity.match;
	if (match) {
		const matchBoard = match.getBoardForPlayer(localPlayerId);
		socket.emit("matchBoardUpdate", {
			turn: match.getTurn(),
			board: serialiseBoard(matchBoard.board, pieceRegistry),
		});
	}

	const unsubscribes: (() => void)[] = [];

	unsubscribes.push(
		targetEntity.gamemode.events.onPhaseStart(GamePhase.READY, () => {
			const currentMatch = targetEntity.match;
			if (currentMatch) {
				const boardData = currentMatch.getBoardForPlayer(localPlayerId);
				socket.emit("matchBoardUpdate", {
					turn: null,
					board: serialiseBoard(boardData.board, pieceRegistry),
				});
			}
		})
	);

	unsubscribes.push(
		subscribeBoardEmit(board, pieceRegistry, socket, "boardUpdate")
	);
	unsubscribes.push(
		subscribeBoardEmit(bench, pieceRegistry, socket, "benchUpdate")
	);

	return () => unsubscribes.forEach((fn) => fn());
};

export const setupPlayerBoard = (entity: Player, socket: GameSocket) => {
	let cleanupSpectate: (() => void) | null = null;

	const startSpectating = (targetEntity: Player) => {
		cleanupSpectate?.();
		cleanupSpectate = setupSpectateListeners(targetEntity, entity.id, socket);
	};

	const teardownAbort = new AbortController();

	(async () => {
		await new Promise<void>((resolve) => {
			const timer = setTimeout(() => {
				teardownAbort.signal.removeEventListener("abort", onAbort);
				resolve();
			}, 200);
			const onAbort = () => {
				clearTimeout(timer);
				resolve();
			};
			teardownAbort.signal.addEventListener("abort", onAbort, { once: true });
		});
		if (teardownAbort.signal.aborted) {
			return;
		}

		const target = entity.spectatingId
			? entity.gamemode.getPlayerById(entity.spectatingId) || entity
			: entity;

		startSpectating(target);
	})();

	const unsubSpectateChange = entity.events.onSpectatingChange((id) => {
		const targetEntity = id
			? entity.gamemode.getPlayerById(id) || entity
			: entity;

		startSpectating(targetEntity);
	});

	return () => {
		teardownAbort.abort();
		cleanupSpectate?.();
		unsubSpectateChange();
	};
};
