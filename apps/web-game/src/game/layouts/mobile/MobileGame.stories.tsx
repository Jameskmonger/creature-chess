import React from "react";

import { Meta, Story } from "@storybook/react";
import { Provider } from "react-redux";

import { GamePhase } from "@creature-chess/models";

import { LocalPlayerContextProvider } from "@cc-web/auth/context";
import { useGlobalStyles } from "@cc-web/ui";

import { ConnectionStatus } from "../../connection-status";
import { Overlay } from "../../ui";
import { createMockStore } from "../stories-utils";
import { MobileGame } from "./MobileGame";

export default {
	title: "@game / MobileGame",
	component: MobileGame,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	const store = createMockStore(
		args.phase === GamePhase.PREPARING,
		(state) => ({
			...state,
			ui: {
				...state.ui,
				winnerId: args.winnerId ? args.winnerId : state.ui.winnerId,
				currentOverlay: args.overlay,
				connectionStatus: args.connectionStatus
					? args.connectionStatus
					: state.ui.connectionStatus,
				selectedPieceId: args.selectedPiece
					? Object.values(state.board.pieces)[0].id
					: state.ui.selectedPieceId,
			},
			roundInfo: {
				...state.roundInfo,
				phase: args.phase,
			},
			playerInfo: {
				...state.playerInfo,
				matchRewards: args.matchRewards
					? args.matchRewards
					: state.playerInfo.matchRewards,
				opponentId: args.opponentId
					? args.opponentId
					: state.playerInfo.opponentId,
			},
		})
	);

	return (
		<LocalPlayerContextProvider
			value={{
				type: "user" as const,
				id: "1234",
				nickname: "jkm",
				stats: {
					wins: 0,
					gamesPlayed: 0,
				},
				registered: true,
			}}
		>
			<Provider store={store}>
				<MobileGame />
			</Provider>
		</LocalPlayerContextProvider>
	);
};

export const Phase_0_Preparing = Template.bind({});
Phase_0_Preparing.args = {
	overlay: null,
	phase: GamePhase.PREPARING,
};

export const Phase_0_Preparing_Selected_Piece = Template.bind({});
Phase_0_Preparing_Selected_Piece.args = {
	overlay: null,
	phase: GamePhase.PREPARING,
	selectedPiece: true,
};

export const Phase_1_Ready = Template.bind({});
Phase_1_Ready.args = {
	overlay: null,
	phase: GamePhase.READY,
	opponentId: "5678",
};

export const Phase_2_Playing = Template.bind({});
Phase_2_Playing.args = {
	overlay: null,
	phase: GamePhase.PLAYING,
};

export const Phase_3_MatchRewards_Won = Template.bind({});
Phase_3_MatchRewards_Won.args = {
	overlay: null,
	phase: GamePhase.PLAYING,
	matchRewards: {
		damage: 0,
		justDied: false,
		rewardMoney: {
			total: 6,
			base: 3,
			winBonus: 1,
			streakBonus: 1,
			interest: 1,
		},
	},
};

export const Phase_3_MatchRewards_Lost = Template.bind({});
Phase_3_MatchRewards_Lost.args = {
	overlay: null,
	phase: GamePhase.PLAYING,
	matchRewards: {
		damage: 5,
		justDied: false,
		rewardMoney: {
			total: 5,
			base: 3,
			winBonus: 1,
			streakBonus: 1,
			interest: 0,
		},
	},
};

export const Phase_3_MatchRewards_Died = Template.bind({});
Phase_3_MatchRewards_Died.args = {
	overlay: null,
	phase: GamePhase.PLAYING,
	matchRewards: {
		damage: 5,
		justDied: true,
		rewardMoney: {
			total: 5,
			base: 3,
			winBonus: 1,
			streakBonus: 1,
			interest: 0,
		},
	},
};

export const Phase_4_Victory = Template.bind({});
Phase_4_Victory.args = {
	overlay: null,
	phase: GamePhase.PLAYING,
	winnerId: "1234",
};

export const Phase_4_Disconnected = Template.bind({});
Phase_4_Disconnected.args = {
	overlay: null,
	phase: GamePhase.PLAYING,
	connectionStatus: ConnectionStatus.DISCONNECTED,
};

export const Tab_1_Players_Overlay = Template.bind({});
Tab_1_Players_Overlay.args = {
	phase: GamePhase.PREPARING,
	overlay: Overlay.PLAYERS,
};

export const Tab_2_Shop_Overlay = Template.bind({});
Tab_2_Shop_Overlay.args = {
	phase: GamePhase.PREPARING,
	overlay: Overlay.SHOP,
};

export const Tab_3_Help_Overlay = Template.bind({});
Tab_3_Help_Overlay.args = {
	phase: GamePhase.PREPARING,
	overlay: Overlay.HELP,
};

export const Tab_4_Settings_Overlay = Template.bind({});
Tab_4_Settings_Overlay.args = {
	phase: GamePhase.PREPARING,
	overlay: Overlay.SETTINGS,
};
