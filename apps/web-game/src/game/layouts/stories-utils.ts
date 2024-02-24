import { configureStore, createSlice } from "@reduxjs/toolkit";

import { BoardState, createInitialBoardState } from "@shoki/board";

import { getDefinitionById } from "@creature-chess/gamemode";
import {
	CreatureType,
	DefinitionClass,
	GamePhase,
	PieceModel,
	QuickChatOption,
} from "@creature-chess/models";
import {
	PlayerStatus,
	inProgressBattle,
} from "@creature-chess/models/game/playerList";
import { StreakType } from "@creature-chess/models/player";
import { PlayerTitle } from "@creature-chess/models/player/title";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { ConnectionStatus } from "../connection-status";
import { GameState } from "../state";

const createPlayer = (
	id: string,
	name: string,
	picture: number,
	title: PlayerTitle | null,
	opponentId: string,
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
	battle: inProgressBattle(opponentId),
});

const createBoardState = (halfBoard: boolean): BoardState<PieceModel> => {
	const state = createInitialBoardState<PieceModel>("local-board", {
		width: 7,
		height: halfBoard ? 3 : 6,
	});

	const definition = getDefinitionById(1)!;
	const piece = {
		id: "piece-1-id",
		ownerId: "player-1-id",
		definitionId: 1,
		definition,
		facingAway: false,
		maxHealth: definition.stages[0].hp,
		currentHealth: definition.stages[0].hp,
		stage: 0,
	};

	return {
		...state,
		pieces: {
			...state.pieces,
			[piece.id]: piece,
		},
		piecePositions: {
			[halfBoard ? "3,0" : "3,3"]: piece.id,
		},
	};
};

const createBenchState = (): BoardState<PieceModel> => {
	const state = createInitialBoardState<PieceModel>("local-bench", {
		width: GamemodeSettingsPresets["default"].benchSize,
		height: 1,
	});

	const definition = getDefinitionById(1)!;
	const piece = {
		id: "bpiece-1-id",
		ownerId: "player-1-id",
		definitionId: 5,
		definition,
		facingAway: false,
		maxHealth: definition.stages[0].hp,
		currentHealth: definition.stages[0].hp,
		stage: 0,
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

const createMockedState = (halfBoard: boolean): GameState => ({
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
	board: createBoardState(halfBoard),
	bench: createBenchState(),
	playerInfo: {
		opponentId: "5678",
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
				definitionId: 10,
				cost: 3,
				class: DefinitionClass.ARCANE,
				name: "Foo",
				type: CreatureType.Fire,
			},
			{
				id: "card-2",
				definitionId: 20,
				cost: 1,
				class: DefinitionClass.CUNNING,
				name: "John Smith",
				type: CreatureType.Water,
			},
			{
				id: "card-3",
				definitionId: 30,
				cost: 5,
				class: DefinitionClass.VALIANT,
				name: "Terry",
				type: CreatureType.Earth,
			},
			null,
			null,
		],
		locked: false,
	},
	match: {
		board: null,
	},
	playerList: [
		createPlayer(
			"1234",
			"jkm",
			1,
			{ color: 0x79ffe0, text: "Developer" },
			"5678",
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
		createPlayer("abce", "AlfaCenTauri", 12, null, "ab99", {
			type: StreakType.WIN,
			amount: 3,
		}),
		createPlayer("ab90", "what this game", 20, null, "abcd", {
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
});

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
