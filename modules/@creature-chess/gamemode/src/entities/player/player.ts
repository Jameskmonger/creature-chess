import { Logger } from "winston";

import {
	SubscribableBoard,
	unpackPosition,
	unpackX,
} from "@creature-chess/board";
import {
	Card,
	GamePhase,
	GamemodeSettings,
	MAX_HEALTH,
	PieceModel,
	PlayerBattle,
	PlayerPieceLocation,
	PlayerProfile,
	PlayerStatus,
	PlayerStreak,
	QuickChatOption,
} from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

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
import { PlayerState, initialPlayerState } from "./state";
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

	/** Introduce a fresh piece into the player's possession. */
	addPiece: (piece: PieceModel, at: PlayerPieceLocation) => void;
	relocatePiece: (pieceId: string, to: PlayerPieceLocation) => void;
	swapPieces: (pieceAId: string, pieceBId: string) => void;
	/** Remove a piece from the player's possession. Returns it to the deck unless opted out. */
	removePiece: (pieceId: string, options?: { returnToDeck?: boolean }) => void;
	removePieces: (pieceIds: string[], options?: { returnToDeck?: boolean }) => void;

	setMoney: (amount: number) => void;
	addMoney: (amount: number) => void;
	reduceMoney: (amount: number) => void;

	setHealth: (amount: number) => void;
	addHealth: (amount: number) => void;
	/** Apply damage. Auto-eliminates on health reaching zero from non-zero. */
	reduceHealth: (amount: number) => void;

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

const WIRE_PLAYER_EVENT_TYPES = new Set(PlayerEventActionTypesArray);
const INFO_UPDATE_TYPES = new Set(PlayerInfoUpdateCommandActionTypesArray);

const cloneInitialState = (): PlayerState => ({
	cardShop: { ...initialPlayerState.cardShop, cards: [] },
	playerInfo: { ...initialPlayerState.playerInfo, streak: { ...initialPlayerState.playerInfo.streak } },
	spectating: { ...initialPlayerState.spectating },
});

export const createPlayer = (
	id: string,
	dependencies: {
		logger: Logger;
		boards: { board: SubscribableBoard; bench: SubscribableBoard };
		gamemode: Gamemode;
		pieceRegistry: PieceRegistry;
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
	const state: PlayerState = cloneInitialState();

	const subscribers = new Set<(action: Action) => void>();

	const emit = (action: Action) => {
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

	const eliminate = () => {
		state.playerInfo.status = PlayerStatus.DEAD;
		emit(playerInfoCommands.updateStatusCommand(PlayerStatus.DEAD));
		emit(playerDeathEvent());

		const remainingCards = state.cardShop.cards.filter(
			(c): c is Card => c !== null
		);
		const allPieceIds = [
			...board.getAllPieces(),
			...bench.getAllPieces(),
		].map((p) => p.id);

		player.setCards([]);
		player.removePieces(allPieceIds);
		dependencies.gamemode.getDeck().addCards(remainingCards);
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

		addPiece: (piece, at) => {
			if (at.type === "board" && player.boardLocked) {
				return;
			}
			dependencies.pieceRegistry.registerPiece(piece);
			if (at.type === "board") {
				const [x, y] = unpackPosition(at.location);
				board.setPiece(piece.id, x, y);
			} else {
				bench.setPiece(piece.id, unpackX(at.location), 0);
			}
			runEvolutions(player);
		},

		relocatePiece: (pieceId, to) => {
			const onBoard = board.containsPiece(pieceId);
			const onBench = bench.containsPiece(pieceId);
			if (!onBoard && !onBench) {
				return;
			}
			// Lock check: any board endpoint is forbidden while locked.
			if ((onBoard || to.type === "board") && player.boardLocked) {
				return;
			}
			// Piece-limit check applies only when bench → board (board count grows).
			if (onBench && to.type === "board" && !player.belowPieceLimit) {
				return;
			}

			if (onBoard) {
				board.removePiece(pieceId);
			} else {
				bench.removePiece(pieceId);
			}

			if (to.type === "board") {
				const [x, y] = unpackPosition(to.location);
				board.setPiece(pieceId, x, y);
			} else {
				bench.setPiece(pieceId, unpackX(to.location), 0);
			}

			runEvolutions(player);
		},

		swapPieces: (pieceAId, pieceBId) => {
			const aOnBoard = board.containsPiece(pieceAId);
			const aOnBench = bench.containsPiece(pieceAId);
			const bOnBoard = board.containsPiece(pieceBId);
			const bOnBench = bench.containsPiece(pieceBId);
			if (!(aOnBoard || aOnBench) || !(bOnBoard || bOnBench)) {
				return;
			}
			if ((aOnBoard || bOnBoard) && player.boardLocked) {
				return;
			}

			if (aOnBoard && bOnBoard) {
				board.swapPieces(pieceAId, pieceBId);
				return;
			}
			if (aOnBench && bOnBench) {
				bench.swapPieces(pieceAId, pieceBId);
				return;
			}
			// Cross-side: A and B trade locations.
			const aPos = (aOnBoard ? board : bench).getPiecePosition(pieceAId)!;
			const bPos = (bOnBoard ? board : bench).getPiecePosition(pieceBId)!;
			(aOnBoard ? board : bench).removePiece(pieceAId);
			(bOnBoard ? board : bench).removePiece(pieceBId);
			(bOnBoard ? board : bench).setPiece(pieceAId, bPos[0], bPos[1]);
			(aOnBoard ? board : bench).setPiece(pieceBId, aPos[0], aPos[1]);
		},

		removePiece: (pieceId, options) => {
			player.removePieces([pieceId], options);
		},

		removePieces: (pieceIds, options) => {
			const { pieceRegistry } = dependencies;
			const removed: PieceModel[] = [];
			for (const pid of pieceIds) {
				const onBoard = board.containsPiece(pid);
				const onBench = bench.containsPiece(pid);
				if (!onBoard && !onBench) {
					continue;
				}
				if (onBoard) {
					board.removePiece(pid);
				} else {
					bench.removePiece(pid);
				}
				const piece = pieceRegistry.getPieceById(pid);
				if (piece) {
					removed.push(piece);
				}
				pieceRegistry.deregisterPiece(pid);
			}
			if (options?.returnToDeck !== false && removed.length > 0) {
				dependencies.gamemode.getDeck().addPieces(removed);
			}
		},

		setMoney: (amount) => {
			state.playerInfo.money = amount;
			emit(playerInfoCommands.updateMoneyCommand(amount));
		},
		addMoney: (amount) => {
			state.playerInfo.money += amount;
			emit(playerInfoCommands.updateMoneyCommand(state.playerInfo.money));
		},
		reduceMoney: (amount) => {
			state.playerInfo.money -= amount;
			emit(playerInfoCommands.updateMoneyCommand(state.playerInfo.money));
		},

		setHealth: (amount) => {
			state.playerInfo.health = amount;
			emit(playerInfoCommands.updateHealthCommand(amount));
		},
		addHealth: (amount) => {
			const next = Math.min(MAX_HEALTH, state.playerInfo.health + amount);
			state.playerInfo.health = next;
			emit(playerInfoCommands.updateHealthCommand(next));
		},
		reduceHealth: (amount) => {
			const oldHealth = state.playerInfo.health;
			const newHealth = Math.max(0, oldHealth - amount);
			state.playerInfo.health = newHealth;
			emit(playerInfoCommands.updateHealthCommand(newHealth));
			if (newHealth === 0 && oldHealth !== 0) {
				eliminate();
			}
		},

		setLevel: (payload) => {
			state.playerInfo.level = payload.level;
			state.playerInfo.xp = payload.xp;
			emit(playerInfoCommands.updateLevelCommand(payload));
		},
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

			state.playerInfo.level = level;
			state.playerInfo.xp = xp;
			emit(playerInfoCommands.updateLevelCommand({ level, xp }));
		},

		setReady: (ready) => {
			state.playerInfo.ready = ready;
			emit(playerInfoCommands.updateReadyCommand(ready));
		},
		setShopLocked: (locked) => {
			state.cardShop.locked = locked;
			emit(updateShopLockCommand(locked));
		},
		setOpponent: (payload) => {
			state.playerInfo.opponentId = payload.id;
			state.playerInfo.opponentIsClone = payload.isClone ?? false;
			emit(playerInfoCommands.updateOpponentCommand(payload));
		},
		setBattle: (battle) => {
			state.playerInfo.battle = battle;
			emit(playerInfoCommands.updateBattleCommand(battle));
		},
		setStreak: (streak) => {
			state.playerInfo.streak = streak;
			emit(playerInfoCommands.updateStreakCommand(streak));
		},
		setStatus: (status) => {
			state.playerInfo.status = status;
			emit(playerInfoCommands.updateStatusCommand(status));
		},
		setSpectatingId: (spectatingId) => {
			state.spectating.id = spectatingId;
			emit(setSpectatingIdCommand(spectatingId));
		},
		setMatchRewards: (rewards) => {
			state.playerInfo.matchRewards = rewards;
			emit(playerInfoCommands.playerMatchRewardsEvent(rewards));
		},
		setCards: (cards) => {
			state.cardShop.cards = cards;
			emit(updateCardsCommand(cards));
		},

		setFinishStanding: ({ position, round }) => {
			(player as { finishPosition: number }).finishPosition = position;
			(player as { finishRound: number }).finishRound = round;
		},

		emitRerollCards: () => {
			if (player.alive) {
				const { pieceRegistry } = dependencies;
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
			emit(afterRerollCardsEvent());
		},
		emitSellPiece: (piece) => {
			emit(afterSellPieceEvent({ piece }));
		},
		emitFinishMatch: (payload) => emit(playerFinishMatchEvent(payload)),
		emitReceiveQuickChat: (payload) =>
			emit(playerReceiveQuickChatEvent(payload)),
		emitClientFinishMatch: () => {
			player.match?.onClientFinishMatch(player.id);
			emit(clientFinishMatchEvent());
		},

		events,
	};

	return player;
};
