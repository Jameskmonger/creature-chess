import {
	configureStore,
	createListenerMiddleware,
	createSlice,
} from "@reduxjs/toolkit";
import { GameSession } from "~/game/GameSession";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { ClientExtra } from "~/store/listenerContext";

import { GamemodeSettingsPresets } from "@creature-chess/models";

import { startBattleCommand } from "../battle/commands";
import {
	boardUpdateAction,
	benchUpdateAction,
	matchBoardUpdateAction,
	setupBoardSyncListeners,
} from "./sync";

const buildStore = () => {
	const sessionHolder = new GameSessionHolder();
	sessionHolder.set(new GameSession(GamemodeSettingsPresets.default));
	const extra: ClientExtra = { sessionHolder };

	const seen: { type: string; payload?: unknown }[] = [];
	const recorder = createSlice({
		name: "recorder",
		initialState: 0,
		reducers: {},
		extraReducers: (builder) => {
			builder.addDefaultCase((state, action) => {
				seen.push({ type: action.type, payload: (action as any).payload });
				return state;
			});
		},
	});

	const middleware = createListenerMiddleware({ extra });
	const store = configureStore({
		reducer: { recorder: recorder.reducer },
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({ serializableCheck: false }).prepend(
				middleware.middleware
			),
	});
	setupBoardSyncListeners(middleware.startListening as any);
	return { store, session: sessionHolder.get(), seen };
};

const flush = () => Promise.resolve();

const piece = (id: string, ownerId = "p1") =>
	({
		id,
		ownerId,
		definitionId: 1,
		stage: 0,
		facingAway: false,
		maxHealth: 10,
		traits: [],
	}) as any;

describe("setupBoardSyncListeners", () => {
	describe("boardUpdateAction", () => {
		it("populates the board and registers pieces", async () => {
			const { store, session } = buildStore();

			store.dispatch(
				boardUpdateAction({
					positions: { "0,0": "piece-1", "1,2": "piece-2" },
					pieces: [piece("piece-1"), piece("piece-2")],
				})
			);
			await flush();

			expect(session.board.getPieceIdAtPosition(0, 0)).toBe("piece-1");
			expect(session.board.getPieceIdAtPosition(1, 2)).toBe("piece-2");
			expect(session.pieceRegistry.getPieceById("piece-1")).toBeDefined();
		});

		it("clears prior board state on each update", async () => {
			const { store, session } = buildStore();

			store.dispatch(
				boardUpdateAction({
					positions: { "0,0": "piece-1" },
					pieces: [piece("piece-1")],
				})
			);
			await flush();

			store.dispatch(
				boardUpdateAction({
					positions: { "1,1": "piece-2" },
					pieces: [piece("piece-2")],
				})
			);
			await flush();

			expect(session.board.getPieceIdAtPosition(0, 0)).toBeNull();
			expect(session.board.getPieceIdAtPosition(1, 1)).toBe("piece-2");
		});
	});

	describe("benchUpdateAction", () => {
		it("populates the bench rather than the board", async () => {
			const { store, session } = buildStore();

			store.dispatch(
				benchUpdateAction({
					positions: { "0,0": "piece-1" },
					pieces: [piece("piece-1")],
				})
			);
			await flush();

			expect(session.bench.getPieceIdAtPosition(0, 0)).toBe("piece-1");
			expect(session.board.getPieceIdAtPosition(0, 0)).toBeNull();
		});
	});

	describe("matchBoardUpdateAction", () => {
		it("populates the matchBoard", async () => {
			const { store, session } = buildStore();

			store.dispatch(
				matchBoardUpdateAction({
					turn: null,
					board: {
						positions: { "0,0": "piece-1" },
						pieces: [piece("piece-1")],
					},
				})
			);
			await flush();

			expect(session.matchBoard.getPieceIdAtPosition(0, 0)).toBe("piece-1");
		});

		it("dispatches startBattleCommand when turn is non-null", async () => {
			const { store, session, seen } = buildStore();

			store.dispatch(
				matchBoardUpdateAction({
					turn: 3,
					board: {
						positions: { "0,0": "piece-1" },
						pieces: [piece("piece-1")],
					},
				})
			);
			await flush();

			expect(seen).toContainEqual({
				type: startBattleCommand.type,
				payload: { turn: 3 },
			});
			expect(session.matchBoard.getPieceIdAtPosition(0, 0)).toBe("piece-1");
		});

		it("dispatches startBattleCommand for turn 0", async () => {
			const { store, seen } = buildStore();

			store.dispatch(
				matchBoardUpdateAction({
					turn: 0,
					board: { positions: {}, pieces: [] },
				})
			);
			await flush();

			expect(seen).toContainEqual({
				type: startBattleCommand.type,
				payload: { turn: 0 },
			});
		});

		it("does not dispatch startBattleCommand when turn is null", async () => {
			const { store, seen } = buildStore();

			store.dispatch(
				matchBoardUpdateAction({
					turn: null,
					board: { positions: {}, pieces: [] },
				})
			);
			await flush();

			const battleDispatches = seen.filter(
				(action) => action.type === startBattleCommand.type
			);
			expect(battleDispatches).toHaveLength(0);
		});
	});
});
