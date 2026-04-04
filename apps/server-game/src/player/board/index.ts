import { Task } from "redux-saga";
import {
	all,
	call,
	race,
	take,
	select,
	delay,
	getContext,
	takeLatest,
} from "typed-redux-saga";
import { getDependency, getVariable } from "@shoki/engine";

import {
	PlayerVariables,
	PlayerEntity,
	PlayerActions,
	PlayerEntityDependencies,
	PlayerState,
	PlayerCommands,
	GameEvents,
	Match,
	PlayerEvents,
	getPlayerEntityDependencies,
	removeBenchPiecesCommand,
	removeBoardPiecesCommand,
} from "@creature-chess/gamemode";
import { serialiseBoard } from "@creature-chess/networking";

import { GameSocket } from "../socket";
import { getPlayerSocket } from "../net/registries";
import { addBenchPieceCommand, addBoardPieceCommand, moveBenchPieceCommand, moveBoardPieceCommand, removeBenchPieceCommand, removeBoardPieceCommand, swapBenchPiecesCommand, swapBoardPiecesCommand } from "@creature-chess/gamemode";

const getSpectatingPlayer = function*() {
	const spectatingId = yield* select(
		(state: PlayerState) => state.spectating.id
	);

	if (!spectatingId) {
		return null;
	}

	const game = yield* getDependency<PlayerEntityDependencies, "gamemode">(
		"gamemode"
	);
	return game.getPlayerById(spectatingId) || null;
};

const getMatch = () =>
	getVariable<PlayerVariables, Match | null>((variables) => variables.match);

const spectatePlayerBoard = function*(
	socket: GameSocket
) {
	const playerId = yield* getContext<string>("id");

	const {
		boards: { board, bench },
		gamemode: { pieceRegistry },
	} = yield* getPlayerEntityDependencies();

	// Send current board and bench state immediately so the client
	// doesn't show stale data from a previous spectating target.
	socket.emit("boardUpdate", serialiseBoard(board, pieceRegistry));
	socket.emit("benchUpdate", serialiseBoard(bench, pieceRegistry));

	const initialMatch = yield* getMatch();

	if (initialMatch) {
		const matchBoard = initialMatch.getBoardForPlayer(playerId);

		socket.emit("matchBoardUpdate", {
			turn: initialMatch.getTurn(),
			board: serialiseBoard(matchBoard.board, pieceRegistry, matchBoard.isHome),
		});

		// todo send opponentId
	}

	yield all([
		call(function*() {
			while (true) {
				yield take(GameEvents.playerRunReadyPhaseEvent.toString());

				// todo improve this, it's to allow the match variable to be set... maybe some `setMatchEvent`
				yield delay(100);

				const match = yield* getMatch();

				if (match) {
					const board = match.getBoardForPlayer(playerId);

					socket.emit("matchBoardUpdate", {
						turn: null,
						board: serialiseBoard(board.board, pieceRegistry, board.isHome),
					});
				}

				yield take(PlayerEvents.playerFinishMatchEvent.toString());
			}
		}),
		takeLatest(
			[
				addBoardPieceCommand,
				moveBoardPieceCommand,
				removeBoardPieceCommand,
				removeBoardPiecesCommand,
				swapBoardPiecesCommand,
			],
			function*() {
				yield delay(50);

				socket.emit("boardUpdate", serialiseBoard(board, pieceRegistry));
			}
		),
		takeLatest(
			[
				addBenchPieceCommand,
				moveBenchPieceCommand,
				removeBenchPieceCommand,
				removeBenchPiecesCommand,
				swapBenchPiecesCommand,
			],
			function*() {
				yield delay(50);

				socket.emit("benchUpdate", serialiseBoard(bench, pieceRegistry));
			}
		),
	]);
};

const spectateOtherPlayer = function*(player: PlayerEntity) {
	const socket = yield* getPlayerSocket();

	let task: Task | null = null;
	try {
		task = player.runSaga(function*() {
			yield call(spectatePlayerBoard, socket);
		});

		yield task.toPromise<void>();
	} finally {
		task?.cancel();
	}
};

const spectateLocalPlayer = function*() {
	const socket = yield* getPlayerSocket();
	yield call(spectatePlayerBoard, socket);
};

/**
 * Watch the local player board and bench, or that of the currently spectated player
 */
export const playerBoard = function*() {
	yield delay(200); // todo (#418) remove the need for this

	let spectating = yield* call(getSpectatingPlayer);

	while (true) {
		const {
			newSpectate,
		}: { newSpectate?: PlayerActions.SpectatePlayerAction } = yield* race({
			// todo strongly type this
			newSpectate: take<any>(PlayerCommands.setSpectatingIdCommand.toString()),

			forever: spectating
				? call(spectateOtherPlayer, spectating)
				: call(spectateLocalPlayer),
		});

		if (!newSpectate) {
			return;
		}

		spectating = yield* call(getSpectatingPlayer);
	}
};
