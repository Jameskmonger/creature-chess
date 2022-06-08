import React from "react";
import { Provider } from "react-redux";
import { Meta, Story } from "@storybook/react";
import { useGlobalStyles } from "@creature-chess/ui";
import { GamePhase } from "@creature-chess/models";

import { MobileGame } from "./MobileGame";
import { Overlay } from "../../ui";
import { createMockStore } from "../stories-utils";

export default {
  title: "Game/MobileGame",
  component: MobileGame,
  argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	const store = createMockStore(
		args.halfBoard,
		state => ({
			...state,
			ui: {
				...state.ui,
				winnerId: args.winnerId ? args.winnerId : state.ui.winnerId,
				currentOverlay: args.overlay,
			},
			roundInfo: {
				...state.roundInfo,
				phase: args.phase
			},
			playerInfo: {
				...state.playerInfo,
				matchRewards: args.matchRewards ? args.matchRewards : state.playerInfo.matchRewards,
			},
		})
	)

	return (
		<Provider
			store={store}
		>
			<MobileGame />
		</Provider>
	);
};

export const Phase_0_Preparing = Template.bind({});
Phase_0_Preparing.args = {
	overlay: null,
	phase: GamePhase.PREPARING,
};

export const Phase_1_Ready = Template.bind({});
Phase_1_Ready.args = {
	overlay: null,
	phase: GamePhase.READY,
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
