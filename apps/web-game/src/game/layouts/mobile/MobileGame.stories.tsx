import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";
import { createInitialBoardState } from "@shoki/board";
import { GamePhase, inProgressBattle, PlayerStatus, StreakType } from "@creature-chess/models";

import { MobileGame } from "./MobileGame";
import { GameState } from "../../state";
import { ConnectionStatus } from "../../connection-status";
import { Overlay } from "../../ui";

export default {
  title: "Game/MobileGame",
  component: MobileGame,
  argTypes: {},
} as Meta;


const mockedState: GameState = {
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
	board: createInitialBoardState("local-board", { width: 7, height: 3 }),
	bench: createInitialBoardState("local-bench", { width: 7, height: 1 }),
	playerInfo: {
		opponentId: null,
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
		cards: [ null, null, null, null, null ],
		locked: false
	},
	match: {
		board: null
	},
	playerList: [
		{
			id: "1234",
			name: "jkm",
			health: 69,
			ready: false,
			status: PlayerStatus.CONNECTED,
			streakType: StreakType.WIN,
			streakAmount: 3,
			money: 20,
			level: 4,
			profile: {
				picture: 1,
				title: 1
			},
			battle: inProgressBattle("5678")
		},
		{
			id: "5678",
			name: "Jeff",
			health: 20,
			ready: false,
			status: PlayerStatus.CONNECTED,
			streakType: StreakType.LOSS,
			streakAmount: 1,
			money: 3,
			level: 5,
			profile: {
				picture: 12,
				title: null
			},
			battle: inProgressBattle("1234")
		},
		{
			id: "abcd",
			name: "Bob the Cat",
			health: 60,
			ready: false,
			status: PlayerStatus.CONNECTED,
			streakType: StreakType.WIN,
			streakAmount: 2,
			money: 15,
			level: 4,
			profile: {
				picture: 8,
				title: null
			},
			battle: inProgressBattle("ab99")
		},
		{
			id: "ab99",
			name: "Derek the Dog",
			health: 55,
			ready: false,
			status: PlayerStatus.CONNECTED,
			streakType: StreakType.WIN,
			streakAmount: 2,
			money: 8,
			level: 4,
			profile: {
				picture: 20,
				title: null
			},
			battle: inProgressBattle("abcd")
		},
	],
	quickChat: {},
	spectating: {
		id: null
	}
};

const Template: Story<any> = (args) => (
	<Provider
		store={configureStore({
			reducer: createSlice({ name: "mock slice", initialState: { game: mockedState }, reducers: {} }).reducer
		})}
	>
		<MobileGame />
	</Provider>
);

export const Default = Template.bind({});
Default.args = {};
