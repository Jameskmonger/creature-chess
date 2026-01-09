import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ConnectionStatus } from "~/networking/connection-status";
import { GameState } from "~/store/game/state";
import { StatsState } from "~/store/game/stats/state";

import { BoardState, createInitialBoardState } from "@shoki/board";

import { getDefinitionById } from "@creature-chess/gamemode";
import {
	FinishedQuickChatOptions,
	GamePhase,
	PieceModel,
	ReadyQuickChatOptions,
} from "@creature-chess/models";
import {
	PlayerStatus,
	inProgressBattle,
} from "@creature-chess/models/game/playerList";
import { StreakType } from "@creature-chess/models/player";
import { PlayerTitle } from "@creature-chess/models/player/title";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

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

const createMockedState = (): GameState => {
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
					id: "card-4",
					definitionId: 11,
					cost: 2,
					name: "Bolt",
					traits: ["metal", "valiant"],
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
				{
					id: "card-5",
					definitionId: 47,
					cost: 5,
					name: "Kirkanon",
					traits: ["metal", "arcane"],
				},
			],
			locked: false,
		},
		stats: {},
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
				value: FinishedQuickChatOptions.HAPPY,
				receivedAt: Date.now(),
			},
			["5678"]: {
				value: ReadyQuickChatOptions.ANGRY,
				receivedAt: Date.now(),
			},
		},
		spectating: {
			id: null,
		},
		network: {
			pingMs: 69,
			lastPingTimestamp: Date.now(),
		},
	};
};

export const createMockStore = (
	decorateState?: (state: GameState) => GameState
) =>
	configureStore({
		reducer: createSlice({
			name: "mock slice",
			initialState: {
				game: decorateState
					? decorateState(createMockedState())
					: createMockedState(),
			},
			reducers: {},
		}).reducer,
	});
