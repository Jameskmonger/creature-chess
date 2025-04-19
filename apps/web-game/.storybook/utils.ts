import { configureStore, createSlice } from "@reduxjs/toolkit";

import { BoardState, createInitialBoardState } from "@shoki/board";

import { getDefinitionById } from "@creature-chess/gamemode";
import { GamePhase, PieceModel, QuickChatOption } from "@creature-chess/models";
import {
	PlayerStatus,
	inProgressBattle,
} from "@creature-chess/models/game/playerList";
import { StreakType } from "@creature-chess/models/player";
import { PlayerTitle } from "@creature-chess/models/player/title";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { ConnectionStatus } from "../src/networking/connection-status";
import { GameState } from "../src/store/game/state";
import { StatsState } from "../src/store/game/stats/state";

const createPlayer = (
	id: string,
	name: string,
	picture: number,
	title: PlayerTitle | null,
	opponentId: string,
	opponentIsClone: boolean = false,
	streak: { type: StreakType; amount: number } | null = null
) => ({
	id,
	name,
	health: 100,
	ready: false,
	status: PlayerStatus.CONNECTED,
	streakType: streak ? streak.type : null,
	streakAmount: streak ? streak.amount : null,
	money: 20,
	level: 4,
	profile: {
		picture,
		title,
	},
	battle: inProgressBattle(opponentId, opponentIsClone),
});

const createBoardState = (halfBoard: boolean): BoardState<PieceModel> => {
	const state = createInitialBoardState<PieceModel>("local-board", {
		width: 7,
		height: halfBoard ? 3 : 6,
	});

	const definition1 = getDefinitionById(1)!;
	const piece1: PieceModel = {
		id: "piece-1-id",
		ownerId: "1234",
		definitionId: 1,
		definition: definition1,
		traits: definition1.traits,
		facingAway: false,
		maxHealth: definition1.stages[0].hp,
		currentHealth: definition1.stages[0].hp,
		stage: 0,
		lastBattleStats: {
			damageDealt: Math.floor(Math.random() * 100),
			damageTaken: Math.floor(Math.random() * 100),
			turnsSurvived: Math.floor(Math.random() * 10),
		},
	};

	const definition2 = getDefinitionById(2)!;
	const piece2: PieceModel = {
		id: "piece-2-id",
		ownerId: "1234",
		definitionId: 2,
		definition: definition2,
		traits: definition2.traits,
		facingAway: false,
		maxHealth: definition2.stages[0].hp,
		currentHealth: definition2.stages[0].hp,
		stage: 0,
		lastBattleStats: null,
	};

	return {
		...state,
		pieces: {
			...state.pieces,
			[piece1.id]: piece1,
			[piece2.id]: piece2,
		},
		piecePositions: {
			[halfBoard ? "3,0" : "3,3"]: piece1.id,
			[halfBoard ? "4,0" : "4,3"]: piece2.id,
		},
	};
};

const createBenchState = (): BoardState<PieceModel> => {
	const state = createInitialBoardState<PieceModel>("local-bench", {
		width: GamemodeSettingsPresets["default"].benchSize,
		height: 1,
	});

	const definition = getDefinitionById(5)!;
	const piece: PieceModel = {
		id: "bpiece-1-id",
		ownerId: "1234",
		definitionId: 5,
		definition,
		traits: definition.traits,
		facingAway: false,
		maxHealth: definition.stages[0].hp,
		currentHealth: definition.stages[0].hp,
		stage: 0,
		lastBattleStats: {
			damageDealt: Math.floor(Math.random() * 100),
			damageTaken: Math.floor(Math.random() * 100),
			turnsSurvived: Math.floor(Math.random() * 10),
		},
	};

	return {
		...state,
		pieces: {
			...state.pieces,
			[piece.id]: piece,
		},
		piecePositions: {
			["1,0"]: piece.id,
		},
	};
};

const createMockedState = (halfBoard: boolean): GameState => {
	const board = createBoardState(halfBoard);
	const bench = createBenchState();

	return {
		settings: GamemodeSettingsPresets["default"],
		ui: {
			connectionStatus: ConnectionStatus.CONNECTED,
			currentOverlay: null,
			inGame: true,
			selectedPieceId: null,
			winnerId: null,
		},
		roundInfo: {
			phase: GamePhase.PREPARING,
			phaseStartedAtSeconds: Date.now() / 1000,
			round: 1,
		},
		board,
		bench,
		playerInfo: {
			opponentId: "5678",
			opponentIsClone: false,
			battle: null,
			health: 100,
			level: 3,
			xp: 2,
			matchRewards: null,
			money: 5,
			ready: false,
			status: PlayerStatus.CONNECTED,
			streak: {
				amount: 1,
				type: StreakType.WIN,
			},
		},
		cardShop: {
			cards: [
				{
					id: "card-1",
					definitionId: 13,
					cost: 1,
					name: "Cardiling",
					traits: ["fire", "cunning"],
				},
				{
					id: "card-2",
					definitionId: 32,
					cost: 3,
					name: "Cairfrey",
					traits: ["metal", "arcane"],
				},
				{
					id: "card-3",
					definitionId: 30,
					cost: 4,
					name: "Hubursa",
					traits: ["earth", "arcane"],
				},
				null,
				{
					id: "card-4",
					definitionId: 1,
					cost: 1,
					name: "Budaye",
					traits: ["wood", "valiant", "water"],
				},
			],
			locked: false,
		},
		match: {
			board: null,
		},
		stats: [
			...Object.values(board.pieces),
			...Object.values(bench.pieces),
		].reduce((acc, piece) => {
			acc[piece.id] = {
				damageDealt: Math.floor(Math.random() * 100),
				damageTaken: Math.floor(Math.random() * 100),
				turnsSurvived: Math.floor(Math.random() * 10),
			};
			return acc;
		}, {} as StatsState),
		playerList: [
			createPlayer(
				"1234",
				"jkm",
				1,
				{ color: 0x79ffe0, text: "Developer" },
				"5678",
				false,
				{ type: StreakType.WIN, amount: 6 }
			),
			createPlayer("5678", "Jeff", 12, null, "1234"),
			createPlayer("abcd", "Bob the Cat", 12, null, "ab99"),
			createPlayer("ab99", "Derek the Dog", 20, null, "abcd"),
			createPlayer(
				"1235",
				"Eric123",
				1,
				{ color: 0xe89292, text: "Contributor" },
				"5678"
			),
			createPlayer("5679", "Ignius_Rex", 12, null, "1234"),
			createPlayer("abce", "AlfaCenTauri", 12, null, "ab99", false, {
				type: StreakType.WIN,
				amount: 3,
			}),
			createPlayer("ab90", "what this game", 20, null, "abcd", false, {
				type: StreakType.LOSS,
				amount: 2,
			}),
		],
		quickChat: {
			["1234"]: {
				value: QuickChatOption.HAPPY,
				receivedAt: Date.now(),
			},
			["5678"]: {
				value: QuickChatOption.ANGRY,
				receivedAt: Date.now(),
			},
		},
		spectating: {
			id: null,
		},
	};
};

export const createMockStore = (
	halfBoard: boolean,
	decorateState?: (state: GameState) => GameState
) =>
	configureStore({
		reducer: createSlice({
			name: "mock slice",
			initialState: {
				game: decorateState
					? decorateState(createMockedState(halfBoard))
					: createMockedState(halfBoard),
			},
			reducers: {},
		}).reducer,
	});
