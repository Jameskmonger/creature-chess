import { GameEvents, PlayerCommands } from "@creature-chess/models";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { GameSessionHolder } from "~/game/GameSessionHolder";
import { GameConnection } from "~/networking/GameConnection";
import { LobbyConnection } from "~/networking/LobbyConnection";
import { ClientExtra, ClientStartListening } from "~/store/listenerContext";
import { Holder } from "~/utils/Holder";

import {
	PlayerStatus,
	StreakType,
	finishedBattle,
	inProgressBattle,
} from "@creature-chess/models";

import { Player, playersReducer } from "./state";
import { setupPlayersSyncListeners } from "./sync";

const LOCAL_ID = "local-player";

const buildPlayer = (overrides: Partial<Player>): Player => ({
	id: LOCAL_ID,
	name: "Local",
	health: 100,
	money: 5,
	level: 1,
	ready: false,
	streakType: null,
	streakAmount: null,
	battle: null,
	status: PlayerStatus.CONNECTED,
	profile: null,
	...overrides,
});

const buildStore = (options: { accountId?: string | null } = {}) => {
	const accountIdHolder = new Holder<string>("AccountId");
	if (options.accountId !== null) {
		accountIdHolder.set(options.accountId ?? LOCAL_ID);
	}

	const extra: ClientExtra = {
		sessionHolder: new GameSessionHolder(),
		gameConnectionHolder: new Holder<GameConnection>("GameConnection"),
		lobbyConnectionHolder: new Holder<LobbyConnection>("LobbyConnection"),
		accountIdHolder,
	};

	const middleware = createListenerMiddleware({ extra });
	const store = configureStore({
		reducer: { players: playersReducer },
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().prepend(middleware.middleware),
	});
	setupPlayersSyncListeners(middleware.startListening as ClientStartListening);

	const seed = (players: Player[]) =>
		store.dispatch(GameEvents.playerListChangedEvent({ players }));

	return { store, seed, accountIdHolder };
};

const localPlayer = (
	state: ReturnType<ReturnType<typeof buildStore>["store"]["getState"]>
) => state.players.find((p) => p.id === LOCAL_ID);

describe("players sync listeners", () => {
	it("routes updateHealthCommand into the local Player entry", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({}), buildPlayer({ id: "other", name: "Other" })]);

		store.dispatch(PlayerCommands.playerInfoCommands.updateHealthCommand(75));

		await Promise.resolve();

		expect(localPlayer(store.getState())?.health).toBe(75);
		expect(store.getState().players.find((p) => p.id === "other")?.health).toBe(
			100
		);
	});

	it("routes updateMoneyCommand into the local Player entry", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({})]);

		store.dispatch(PlayerCommands.playerInfoCommands.updateMoneyCommand(12));

		await Promise.resolve();

		expect(localPlayer(store.getState())?.money).toBe(12);
	});

	it("routes updateLevelCommand level into the local Player entry (xp ignored at this seam)", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({})]);

		store.dispatch(
			PlayerCommands.playerInfoCommands.updateLevelCommand({ level: 4, xp: 7 })
		);

		await Promise.resolve();

		expect(localPlayer(store.getState())?.level).toBe(4);
	});

	it("routes updateReadyCommand into the local Player entry", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({})]);

		store.dispatch(PlayerCommands.playerInfoCommands.updateReadyCommand(true));

		await Promise.resolve();

		expect(localPlayer(store.getState())?.ready).toBe(true);
	});

	it("flattens streak shape across the seam", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({})]);

		store.dispatch(
			PlayerCommands.playerInfoCommands.updateStreakCommand({
				type: StreakType.WIN,
				amount: 3,
			})
		);

		await Promise.resolve();

		const player = localPlayer(store.getState());
		expect(player?.streakType).toBe(StreakType.WIN);
		expect(player?.streakAmount).toBe(3);
	});

	it("routes updateBattleCommand into the local Player entry", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({})]);

		const battle = inProgressBattle("opp", false);
		store.dispatch(
			PlayerCommands.playerInfoCommands.updateBattleCommand(battle)
		);

		await Promise.resolve();

		expect(localPlayer(store.getState())?.battle).toEqual(battle);

		const finished = finishedBattle("opp", false, true, 2, 0);
		store.dispatch(
			PlayerCommands.playerInfoCommands.updateBattleCommand(finished)
		);

		await Promise.resolve();

		expect(localPlayer(store.getState())?.battle).toEqual(finished);
	});

	it("routes updateStatusCommand into the local Player entry", async () => {
		const { store, seed } = buildStore();
		seed([buildPlayer({})]);

		store.dispatch(
			PlayerCommands.playerInfoCommands.updateStatusCommand(PlayerStatus.DEAD)
		);

		await Promise.resolve();

		expect(localPlayer(store.getState())?.status).toBe(PlayerStatus.DEAD);
	});

	it("does nothing when the account id is unset", async () => {
		const { store, seed } = buildStore({ accountId: null });
		seed([buildPlayer({})]);

		store.dispatch(PlayerCommands.playerInfoCommands.updateHealthCommand(50));

		await Promise.resolve();

		expect(localPlayer(store.getState())?.health).toBe(100);
	});

	it("does nothing when the account id does not match any Player", async () => {
		const { store, seed } = buildStore({ accountId: "ghost" });
		seed([buildPlayer({})]);

		store.dispatch(PlayerCommands.playerInfoCommands.updateHealthCommand(50));

		await Promise.resolve();

		expect(localPlayer(store.getState())?.health).toBe(100);
	});
});
