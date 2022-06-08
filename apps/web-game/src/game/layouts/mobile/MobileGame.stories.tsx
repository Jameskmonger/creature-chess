import React from "react";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Meta, Story } from "@storybook/react";
import { BoardState, createInitialBoardState } from "@shoki/board";
import { GamePhase, inProgressBattle, PieceModel, PlayerStatus, StreakType } from "@creature-chess/models";
import { useGlobalStyles } from "@creature-chess/ui";
import { getDefinitionById } from "@creature-chess/gamemode";

import { MobileGame } from "./MobileGame";
import { GameState } from "../../state";
import { ConnectionStatus } from "../../connection-status";
import { Overlay } from "../../ui";

export default {
  title: "Game/MobileGame",
  component: MobileGame,
  argTypes: {},
} as Meta;

const createPlayer = (id: string, name: string, picture: number, opponentId: string) => ({
	id,
	name,
	health: 100,
	ready: false,
	status: PlayerStatus.CONNECTED,
	streakType: StreakType.WIN,
	streakAmount: 3,
	money: 20,
	level: 4,
	profile: {
		picture,
		title: null
	},
	battle: inProgressBattle(opponentId)
});

const createBoardState = (): BoardState<PieceModel> => {
	const state = createInitialBoardState<PieceModel>("local-board", { width: 7, height: 3 });

	const definition = getDefinitionById(1)!;
	const piece = {
		id: 'piece-1-id',
		ownerId: 'player-1-id',
		definitionId: 1,
		definition,
		facingAway: false,
		maxHealth: definition.stages[0].hp,
		currentHealth: definition.stages[0].hp,
		stage: 0
	};

	return {
		...state,
		pieces: {
			...state.pieces,
			[piece.id]: piece
		},
		piecePositions: {
			[`3,0`]: piece.id
		}
	}
}

const createBenchState = (): BoardState<PieceModel> => {
	const state = createInitialBoardState<PieceModel>("local-bench", { width: 7, height: 1 });

	const definition = getDefinitionById(1)!;
	const piece = {
		id: 'bpiece-1-id',
		ownerId: 'player-1-id',
		definitionId: 5,
		definition,
		facingAway: false,
		maxHealth: definition.stages[0].hp,
		currentHealth: definition.stages[0].hp,
		stage: 0
	};

	return {
		...state,
		pieces: {
			...state.pieces,
			[piece.id]: piece
		},
		piecePositions: {
			[`1,0`]: piece.id
		}
	}
}

const createMockedState = (currentOverlay: Overlay): GameState => ({
	ui: {
		connectionStatus: ConnectionStatus.CONNECTED,
		currentOverlay,
		inGame: true,
		selectedPieceId: null,
		winnerId: null,
	},
	roundInfo: {
		phase: GamePhase.PREPARING,
		phaseStartedAtSeconds: Date.now() / 1000,
		round: 1,
	},
	board: createBoardState(),
	bench: createBenchState(),
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
		createPlayer("1234", "jkm", 1, "5678"),
		createPlayer("5678", "Jeff", 12, "1234"),
		createPlayer("abcd", "Bob the Cat", 12, "ab99"),
		createPlayer("ab99", "Derek the Dog", 20, "abcd"),
	],
	quickChat: {},
	spectating: {
		id: null
	}
});

const createMockStore = (currentOverlay: Overlay) => (
	configureStore({
		reducer: createSlice({ name: "mock slice", initialState: { game: createMockedState(currentOverlay) }, reducers: {} }).reducer
	})
);

const Template: Story<any> = (args) => {
	useGlobalStyles();

	return (
		<Provider
			store={createMockStore(args.overlay)}
		>
			<MobileGame />
		</Provider>
	);
};

export const No_Overlay = Template.bind({});
No_Overlay.args = {
	overlay: null
};

export const Help_Overlay = Template.bind({});
Help_Overlay.args = {
	overlay: Overlay.HELP
};

export const Players_Overlay = Template.bind({});
Players_Overlay.args = {
	overlay: Overlay.PLAYERS
};

export const Shop_Overlay = Template.bind({});
Shop_Overlay.args = {
	overlay: Overlay.SHOP
};

export const Settings_Overlay = Template.bind({});
Settings_Overlay.args = {
	overlay: Overlay.SETTINGS
};
