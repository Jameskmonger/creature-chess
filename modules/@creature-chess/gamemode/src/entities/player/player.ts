import { Logger } from "winston";

import {
	PackedPosition,
	SubscribableBoard,
	unpackX,
	unpackY,
} from "@creature-chess/board";
import {
	Card,
	GamePhase,
	GamemodeSettings,
	MAX_HEALTH,
	PieceModel,
	PlayerBattle,
	PlayerProfile,
	PlayerStatus,
	PlayerStreak,
	QuickChatOption,
} from "@creature-chess/models";

import type { Gamemode } from "../../game";
import type { Match } from "../../game/match";
import { getXpToNextLevel } from "../../player/xp";
import {
	PlayerEvent,
	PlayerEventActionTypesArray,
	PlayerEventByType,
	PlayerEventTypeByActionType,
	afterRerollCardsEvent,
	afterSellPieceEvent,
	clientFinishMatchEvent,
	playerDeathEvent,
	playerFinishMatchEvent,
	playerReceiveQuickChatEvent,
} from "./events";
import { runEvolutions } from "./operations/evolution";
import { PlayerState, playerReducers } from "./state";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
	clearBenchCommand,
	clearBoardCommand,
	moveBenchPieceCommand,
	moveBoardPieceCommand,
	removeBenchPieceCommand,
	removeBenchPiecesCommand,
	removeBoardPieceCommand,
	removeBoardPiecesCommand,
	swapBenchPiecesCommand,
	swapBoardPiecesCommand,
} from "./state/board";
import { updateCardsCommand, updateShopLockCommand } from "./state/cardShop";
import {
	PlayerInfoUpdateCommand,
	PlayerInfoUpdateCommandActionTypesArray,
} from "./state/commands";
import { PlayerMatchRewards } from "./state/playerInfo";
import { playerInfoCommands } from "./state/playerInfo/reducer";
import { setSpectatingIdCommand } from "./state/spectating";

type Action = { type: string; payload?: any };

export type PlayerInfoFieldMap = {
	health: number;
	streak: PlayerStreak;
	status: PlayerStatus;
	battle: PlayerBattle | null;
	ready: boolean;
};

export type PlayerEventsApi = {
	onInfoUpdate(fn: (action: PlayerInfoUpdateCommand) => void): () => void;
	onInfoUpdate<K extends keyof PlayerInfoFieldMap>(
		field: K,
		fn: (value: PlayerInfoFieldMap[K]) => void,
		opts?: { emitInitial?: boolean }
	): () => void;
	/** Firehose: every wire-shape Player event. Used by outgoing-networking to forward over the socket. */
	onPlayerEvent(fn: (action: PlayerEvent) => void): () => void;
	/** Keyed: subscribe to one Player event type. Internal events not forwarded to the wire are reachable here. */
	onPlayerEvent<K extends keyof PlayerEventByType>(
		type: K,
		fn: (action: PlayerEventByType[K]) => void
	): () => void;
	onSpectatingChange(fn: (id: string | null) => void): () => void;
	onQuit(fn: () => void): () => void;
};

export type Player = {
	readonly id: string;

	readonly logger: Logger;
	readonly board: SubscribableBoard;
	readonly bench: SubscribableBoard;
	readonly gamemode: Gamemode;
	readonly settings: GamemodeSettings;

	name: string;
	profile: PlayerProfile;
	readonly finishPosition: number;
	readonly finishRound: number;
	match: Match | null;

	readonly money: number;
	readonly health: number;
	readonly xp: number;
	readonly level: number;
	readonly streak: PlayerStreak;
	readonly status: PlayerStatus;
	readonly ready: boolean;
	readonly shopLocked: boolean;
	readonly opponentId: string | null;
	readonly opponentIsClone: boolean;
	readonly battle: PlayerBattle | null;
	readonly cards: (Card | null)[];
	readonly matchRewards: PlayerMatchRewards | null;
	readonly alive: boolean;
	readonly boardLocked: boolean;
	readonly belowPieceLimit: boolean;
	readonly spectatingId: string | null;

	addBoardPiece: (payload: { pieceId: string; position: PackedPosition }) => void;
	removeBoardPiece: (payload: { pieceId: string }) => void;
	removeBoardPieces: (payload: { pieceIds: string[] }) => void;
	swapBoardPieces: (payload: { pieceIdA: string; pieceIdB: string }) => void;
	moveBoardPiece: (payload: {
		pieceId: string;
		from: PackedPosition;
		to: PackedPosition;
	}) => void;
	clearBoard: () => void;

	addBenchPiece: (payload: { pieceId: string; position: { x: number } }) => void;
	removeBenchPiece: (payload: { pieceId: string }) => void;
	removeBenchPieces: (payload: { pieceIds: string[] }) => void;
	swapBenchPieces: (payload: { pieceIdA: string; pieceIdB: string }) => void;
	moveBenchPiece: (payload: {
		pieceId: string;
		from: { x: number };
		to: { x: number };
	}) => void;
	clearBench: () => void;

	setMoney: (amount: number) => void;
	addMoney: (amount: number) => void;
	reduceMoney: (amount: number) => void;

	setHealth: (amount: number) => void;
	addHealth: (amount: number) => void;
	/** Returns true if the reduction killed the player (newly reached zero). */
	reduceHealth: (amount: number) => boolean;

	setLevel: (payload: { level: number; xp: number }) => void;
	addXp: (amount: number) => void;

	setReady: (ready: boolean) => void;
	setShopLocked: (locked: boolean) => void;
	setOpponent: (payload: { id: string | null; isClone?: boolean }) => void;
	setBattle: (battle: PlayerBattle | null) => void;
	setStreak: (streak: PlayerStreak) => void;
	setStatus: (status: PlayerStatus) => void;
	setSpectatingId: (id: string | null) => void;
	setMatchRewards: (rewards: PlayerMatchRewards | null) => void;
	setCards: (cards: (Card | null)[]) => void;

	/** Mark the player as eliminated. Sets status to DEAD and emits death event. */
	eliminate: () => void;

	setFinishStanding: (payload: { position: number; round: number }) => void;

	emitRerollCards: () => void;
	emitSellPiece: (piece: PieceModel) => void;
	emitFinishMatch: (payload: {
		homeScore: number;
		awayScore: number;
		isHomePlayer: boolean;
	}) => void;
	emitReceiveQuickChat: (payload: {
		sendingPlayerId: string;
		chatValue: QuickChatOption;
	}) => void;
	emitClientFinishMatch: () => void;

	events: PlayerEventsApi;
};

type ReducersMapObject<TState> = {
	[K in keyof TState]: (
		state: TState[K] | undefined,
		action: Action
	) => TState[K];
};

function combineReducersPlain<TState>(reducers: ReducersMapObject<TState>) {
	const keys = Object.keys(reducers) as (keyof TState)[];

	return (state: TState | undefined, action: Action): TState => {
		let changed = false;
		const nextState = {} as TState;

		for (const key of keys) {
			const reducer = reducers[key] as (state: any, action: Action) => any;
			const prev = state ? state[key] : undefined;
			const next = reducer(prev, action);
			nextState[key] = next;
			if (next !== prev) {
				changed = true;
			}
		}

		return changed || !state ? nextState : state;
	};
}

const WIRE_PLAYER_EVENT_TYPES = new Set(PlayerEventActionTypesArray);
const INFO_UPDATE_TYPES = new Set(PlayerInfoUpdateCommandActionTypesArray);

export const createPlayer = (
	id: string,
	dependencies: {
		logger: Logger;
		boards: { board: SubscribableBoard; bench: SubscribableBoard };
		gamemode: Gamemode;
		settings: GamemodeSettings;
	},
	initialVars: {
		name: string;
		profile: PlayerProfile;
		finishPosition: number;
		finishRound: number;
		match: Match | null;
	}
): Player => {
	const rootReducer = combineReducersPlain<PlayerState>(playerReducers);
	let state: PlayerState = rootReducer(undefined, { type: "@@INIT" });

	const subscribers = new Set<(action: Action) => void>();

	const put = (action: Action) => {
		state = rootReducer(state, action);
		// Snapshot the set so subscribers added/removed during dispatch don't
		// affect the current notification round.
		const snapshot = [...subscribers];
		for (const fn of snapshot) {
			fn(action);
		}
	};

	const subscribe = (fn: (action: Action) => void): (() => void) => {
		subscribers.add(fn);
		return () => {
			subscribers.delete(fn);
		};
	};

	const board = dependencies.boards.board;
	const bench = dependencies.boards.bench;

	const infoFieldDefs: {
		[K in keyof PlayerInfoFieldMap]: {
			actionType: string;
			getCurrent: () => PlayerInfoFieldMap[K];
		};
	} = {
		health: {
			actionType: playerInfoCommands.updateHealthCommand.type,
			getCurrent: () => state.playerInfo.health,
		},
		streak: {
			actionType: playerInfoCommands.updateStreakCommand.type,
			getCurrent: () => state.playerInfo.streak,
		},
		status: {
			actionType: playerInfoCommands.updateStatusCommand.type,
			getCurrent: () => state.playerInfo.status,
		},
		battle: {
			actionType: playerInfoCommands.updateBattleCommand.type,
			getCurrent: () => state.playerInfo.battle,
		},
		ready: {
			actionType: playerInfoCommands.updateReadyCommand.type,
			getCurrent: () => state.playerInfo.ready,
		},
	};

	function onInfoUpdate(
		fn: (action: PlayerInfoUpdateCommand) => void
	): () => void;
	function onInfoUpdate<K extends keyof PlayerInfoFieldMap>(
		field: K,
		fn: (value: PlayerInfoFieldMap[K]) => void,
		opts?: { emitInitial?: boolean }
	): () => void;
	function onInfoUpdate(
		fieldOrFn: keyof PlayerInfoFieldMap | ((action: any) => void),
		maybeFn?: (value: any) => void,
		opts?: { emitInitial?: boolean }
	): () => void {
		if (typeof fieldOrFn === "function") {
			const unionFn = fieldOrFn;
			return subscribe((a) => {
				if (INFO_UPDATE_TYPES.has(a.type)) {
					unionFn(a as PlayerInfoUpdateCommand);
				}
			});
		}

		const field = fieldOrFn;
		const fn = maybeFn!;
		const def = infoFieldDefs[field];
		if (opts?.emitInitial !== false) {
			fn(def.getCurrent());
		}
		return subscribe((a) => {
			if (a.type === def.actionType) {
				fn(a.payload);
			}
		});
	}

	function onPlayerEvent(fn: (action: PlayerEvent) => void): () => void;
	function onPlayerEvent<K extends keyof PlayerEventByType>(
		type: K,
		fn: (action: PlayerEventByType[K]) => void
	): () => void;
	function onPlayerEvent(
		typeOrFn:
			| keyof PlayerEventByType
			| ((action: PlayerEvent) => void),
		maybeFn?: (action: any) => void
	): () => void {
		if (typeof typeOrFn === "function") {
			const firehoseFn = typeOrFn;
			return subscribe((a) => {
				if (WIRE_PLAYER_EVENT_TYPES.has(a.type)) {
					firehoseFn(a as PlayerEvent);
				}
			});
		}
		const targetKey = typeOrFn;
		const keyedFn = maybeFn!;
		return subscribe((a) => {
			if (PlayerEventTypeByActionType[a.type] === targetKey) {
				keyedFn(a);
			}
		});
	}

	const onSpectatingChange = (fn: (id: string | null) => void): (() => void) =>
		subscribe((a) => {
			if (a.type === setSpectatingIdCommand.type) {
				fn(a.payload as string | null);
			}
		});

	const onQuit = (fn: () => void): (() => void) =>
		subscribe((a) => {
			if (
				a.type === playerInfoCommands.updateStatusCommand.type &&
				a.payload === PlayerStatus.QUIT
			) {
				fn();
			}
		});

	const events: PlayerEventsApi = {
		onInfoUpdate,
		onPlayerEvent,
		onSpectatingChange,
		onQuit,
	};

	const player: Player = {
		id,
		logger: dependencies.logger,
		board,
		bench,
		gamemode: dependencies.gamemode,
		settings: dependencies.settings,
		name: initialVars.name,
		profile: initialVars.profile,
		finishPosition: initialVars.finishPosition,
		finishRound: initialVars.finishRound,
		match: initialVars.match,

		get money() {
			return state.playerInfo.money;
		},
		get health() {
			return state.playerInfo.health;
		},
		get xp() {
			return state.playerInfo.xp;
		},
		get level() {
			return state.playerInfo.level;
		},
		get streak() {
			return state.playerInfo.streak;
		},
		get status() {
			return state.playerInfo.status;
		},
		get ready() {
			return state.playerInfo.ready;
		},
		get shopLocked() {
			return state.cardShop.locked;
		},
		get opponentId() {
			return state.playerInfo.opponentId;
		},
		get opponentIsClone() {
			return state.playerInfo.opponentIsClone;
		},
		get battle() {
			return state.playerInfo.battle;
		},
		get cards() {
			return state.cardShop.cards;
		},
		get matchRewards() {
			return state.playerInfo.matchRewards;
		},
		get alive() {
			return state.playerInfo.health > 0;
		},
		get boardLocked() {
			return dependencies.gamemode.getRoundInfo().phase !== GamePhase.PREPARING;
		},
		get belowPieceLimit() {
			return board.pieceCount < state.playerInfo.level;
		},
		get spectatingId() {
			return state.spectating.id;
		},

		addBoardPiece: (payload) => {
			board.setPiece(
				payload.pieceId,
				unpackX(payload.position),
				unpackY(payload.position)
			);
			put(addBoardPieceCommand(payload));
			runEvolutions(player);
		},
		removeBoardPiece: (payload) => {
			board.removePiece(payload.pieceId);
			put(removeBoardPieceCommand(payload));
		},
		removeBoardPieces: (payload) => {
			for (const pid of payload.pieceIds) {
				board.removePiece(pid);
			}
			put(removeBoardPiecesCommand(payload));
		},
		swapBoardPieces: (payload) => {
			board.swapPieces(payload.pieceIdA, payload.pieceIdB);
			put(swapBoardPiecesCommand(payload));
		},
		moveBoardPiece: (payload) => {
			const existing = board.getPiecePosition(payload.pieceId);
			if (
				!existing ||
				existing[0] !== unpackX(payload.from) ||
				existing[1] !== unpackY(payload.from)
			) {
				return;
			}
			board.setPiece(
				payload.pieceId,
				unpackX(payload.to),
				unpackY(payload.to)
			);
			put(moveBoardPieceCommand(payload));
		},
		clearBoard: () => {
			board.clear();
			put(clearBoardCommand());
		},

		addBenchPiece: (payload) => {
			bench.setPiece(payload.pieceId, payload.position.x, 0);
			put(addBenchPieceCommand(payload));
			runEvolutions(player);
		},
		removeBenchPiece: (payload) => {
			bench.removePiece(payload.pieceId);
			put(removeBenchPieceCommand(payload));
		},
		removeBenchPieces: (payload) => {
			for (const pid of payload.pieceIds) {
				bench.removePiece(pid);
			}
			put(removeBenchPiecesCommand(payload));
		},
		swapBenchPieces: (payload) => {
			bench.swapPieces(payload.pieceIdA, payload.pieceIdB);
			put(swapBenchPiecesCommand(payload));
		},
		moveBenchPiece: (payload) => {
			const existing = bench.getPiecePosition(payload.pieceId);
			if (!existing || existing[0] !== payload.from.x) {
				return;
			}
			bench.setPiece(payload.pieceId, payload.to.x, 0);
			put(moveBenchPieceCommand(payload));
		},
		clearBench: () => {
			bench.clear();
			put(clearBenchCommand());
		},

		setMoney: (amount) => put(playerInfoCommands.updateMoneyCommand(amount)),
		addMoney: (amount) =>
			put(playerInfoCommands.updateMoneyCommand(state.playerInfo.money + amount)),
		reduceMoney: (amount) =>
			put(playerInfoCommands.updateMoneyCommand(state.playerInfo.money - amount)),

		setHealth: (amount) =>
			put(playerInfoCommands.updateHealthCommand(amount)),
		addHealth: (amount) =>
			put(
				playerInfoCommands.updateHealthCommand(
					Math.min(MAX_HEALTH, state.playerInfo.health + amount)
				)
			),
		reduceHealth: (amount) => {
			const oldHealth = state.playerInfo.health;
			const newHealth = Math.max(0, oldHealth - amount);
			put(playerInfoCommands.updateHealthCommand(newHealth));
			return newHealth === 0 && oldHealth !== 0;
		},

		setLevel: (payload) =>
			put(playerInfoCommands.updateLevelCommand(payload)),
		addXp: (amount) => {
			let level = state.playerInfo.level;
			let xp = state.playerInfo.xp;

			for (let i = 0; i < amount; i++) {
				const toNextLevel = getXpToNextLevel(level);
				const newXp = xp + 1;

				if (newXp === toNextLevel) {
					xp = 0;
					level++;
				} else {
					xp = newXp;
				}
			}

			put(playerInfoCommands.updateLevelCommand({ level, xp }));
		},

		setReady: (ready) =>
			put(playerInfoCommands.updateReadyCommand(ready)),
		setShopLocked: (locked) => put(updateShopLockCommand(locked)),
		setOpponent: (payload) =>
			put(playerInfoCommands.updateOpponentCommand(payload)),
		setBattle: (battle) =>
			put(playerInfoCommands.updateBattleCommand(battle)),
		setStreak: (streak) =>
			put(playerInfoCommands.updateStreakCommand(streak)),
		setStatus: (status) =>
			put(playerInfoCommands.updateStatusCommand(status)),
		setSpectatingId: (spectatingId) =>
			put(setSpectatingIdCommand(spectatingId)),
		setMatchRewards: (rewards) =>
			put(playerInfoCommands.playerMatchRewardsEvent(rewards)),
		setCards: (cards) => put(updateCardsCommand(cards)),

		eliminate: () => {
			put(playerInfoCommands.updateStatusCommand(PlayerStatus.DEAD));
			put(playerDeathEvent());

			const { pieceRegistry } = dependencies.gamemode;
			const allPieces = [...board.getAllPieces(), ...bench.getAllPieces()]
				.map((piece) => pieceRegistry.getPieceById(piece.id))
				.filter((p): p is PieceModel => p !== null);
			const remainingCards = state.cardShop.cards.filter(
				(c): c is Card => c !== null
			);

			player.setCards([]);
			player.clearBoard();
			player.clearBench();
			for (const piece of allPieces) {
				pieceRegistry.deregisterPiece(piece.id);
			}

			const deck = dependencies.gamemode.getDeck();
			deck.addPieces(allPieces);
			deck.addCards(remainingCards);
		},

		setFinishStanding: ({ position, round }) => {
			(player as { finishPosition: number }).finishPosition = position;
			(player as { finishRound: number }).finishRound = round;
		},

		emitRerollCards: () => {
			if (player.alive) {
				const { pieceRegistry } = dependencies.gamemode;
				const allPieces = [...board.getAllPieces(), ...bench.getAllPieces()]
					.map((p) => pieceRegistry.getPieceById(p.id))
					.filter((p): p is PieceModel => p !== null);
				const excludeIds = allPieces
					.filter((p) => p.stage === 2)
					.map((p) => p.definitionId);
				const remainingCards = state.cardShop.cards.filter(
					(c): c is Card => c !== null
				);

				const newCards = dependencies.gamemode
					.getDeck()
					.reroll(
						remainingCards,
						5,
						player.level,
						dependencies.settings.rerollMultiplier,
						excludeIds
					);

				player.setCards(newCards);
			}
			put(afterRerollCardsEvent());
		},
		emitSellPiece: (piece) => {
			dependencies.gamemode.getDeck().addPiece(piece);
			put(afterSellPieceEvent({ piece }));
		},
		emitFinishMatch: (payload) => put(playerFinishMatchEvent(payload)),
		emitReceiveQuickChat: (payload) =>
			put(playerReceiveQuickChatEvent(payload)),
		emitClientFinishMatch: () => {
			player.match?.onClientFinishMatch(player.id);
			put(clientFinishMatchEvent());
		},

		events,
	};

	return player;
};
