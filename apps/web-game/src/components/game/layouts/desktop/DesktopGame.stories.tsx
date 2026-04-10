import React from "react";

import { Meta, Story } from "@storybook/react";

import { GamePhase } from "@creature-chess/models";

import { GameLayoutStoryArgs, GameLayoutStoryWrapper } from "../GameLayoutStory";
import { DesktopGame } from "./DesktopGame";

export default {
	title: "@creature-chess / game / DesktopGame",
	component: DesktopGame,
	argTypes: {},
} as Meta;

const Template: Story<GameLayoutStoryArgs> = (args) => (
	<GameLayoutStoryWrapper args={args}>
		<DesktopGame />
	</GameLayoutStoryWrapper>
);

export const Phase_0_Preparing = Template.bind({});
Phase_0_Preparing.args = {
	phase: GamePhase.PREPARING,
};

export const Phase_0_Preparing_Selected_Piece = Template.bind({});
Phase_0_Preparing_Selected_Piece.args = {
	overlay: null,
	phase: GamePhase.PREPARING,
	selectedPiece: true,
};

export const Phase_0_Preparing_Selected_Piece_Stage2 = Template.bind({});
Phase_0_Preparing_Selected_Piece_Stage2.args = {
	overlay: null,
	phase: GamePhase.PREPARING,
	selectedPiece: true,
	selectedPieceStage: 2,
};

export const Phase_1_Ready = Template.bind({});
Phase_1_Ready.args = {
	phase: GamePhase.READY,
	opponentId: "5678",
};

export const Phase_1_Ready_vs_Clone = Template.bind({});
Phase_1_Ready_vs_Clone.args = {
	phase: GamePhase.READY,
	opponentId: "5678",
	opponentIsClone: true,
};

export const Phase_2_Playing = Template.bind({});
Phase_2_Playing.args = {
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

export const Phase_3_Victory = Template.bind({});
Phase_3_Victory.args = {
	phase: GamePhase.PLAYING,
	winnerId: "1234",
};
