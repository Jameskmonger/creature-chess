import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ConnectionStatus } from "~/networking";
import { GameState } from "~/store/game/state";

import { finishedBattle, GamePhase } from "@creature-chess/models";
import {
	FinishedQuickChatOptions,
	ReadyQuickChatOptions,
} from "@creature-chess/models";
import { PlayerStatus, assetPicture, inProgressBattle } from "@creature-chess/models";
import { StreakType } from "@creature-chess/models";
import { PlayerTitle } from "@creature-chess/models";

// Mirror the bot avatar scheme so storybook players show a real (servable)
// avatar image; creature pictures resolve to null without a creature registry.
const robotAvatar = (index: number): string =>
	assetPicture(`bots/robot-${String((index % 9) + 1).padStart(3, "0")}.png`);

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
	ready: true,
	status: PlayerStatus.CONNECTED,
	streakType: streak ? streak.type : null,
	streakAmount: streak ? streak.amount : null,
	money: 20,
	level: 4,
	profile: {
		picture: robotAvatar(picture),
		title,
	},
	battle: inProgressBattle(opponentId, opponentIsClone),
});

const createMockedState = (): GameState => {
	return {
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
		localPlayer: {
			opponentId: "5678",
			opponentIsClone: false,
			xp: 2,
			matchRewards: null,
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
		players: [
			{
				...createPlayer(
					"1234",
					"jkm",
					0,
					{ color: 0x79ffe0, text: "Developer" },
					"5678",
					false,
					{ type: StreakType.WIN, amount: 6 }
				),
				health: 100,
			},
			{
				...createPlayer("5678", "Jeff", 1, null, "1234"),
				battle: finishedBattle("1235", false, false, 2, 1),
				health: 85,
			},
			{
				...createPlayer("abcd", "Bob the Cat", 2, null, "ab99"),
				health: 70,
			},
			{
				...createPlayer("ab99", "Derek the Dog", 3, null, "abcd"),
				health: 50,
			},
			{
				...createPlayer(
					"1235",
					"Eric123",
					4,
					{ color: 0xe89292, text: "Contributor" },
					"5678"
				),
				battle: finishedBattle("5678", false, true, 2, 1),
				health: 40,
			},
			{
				...createPlayer("5679", "Ignius_Rex", 5, null, "1234"),
				health: 30,
			},
			{
				...createPlayer("abce", "AlfaCenTauri", 6, null, "ab99", false, {
					type: StreakType.WIN,
					amount: 3,
				}),
				health: 20,
			},
			{
				...createPlayer("ab90", "what this game", 7, null, "abcd", false, {
					type: StreakType.LOSS,
					amount: 2,
				}),
				health: 10,
			},
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
		plugins: {},
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
