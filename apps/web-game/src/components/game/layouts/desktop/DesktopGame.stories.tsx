import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { GamePhase } from "@creature-chess/models";

import {
	GameLayoutStoryArgs,
	GameLayoutStoryWrapper,
} from "../GameLayoutStory";
import { DesktopGame } from "./DesktopGame";

const meta: Meta<GameLayoutStoryArgs> = {
	title: "@creature-chess / game / DesktopGame",
	component: DesktopGame,
	argTypes: {},
	render: (args) => (
		<GameLayoutStoryWrapper args={args}>
			<DesktopGame />
		</GameLayoutStoryWrapper>
	),
};
export default meta;

type Story = StoryObj<GameLayoutStoryArgs>;

export const Phase_0_Preparing: Story = {
	args: {
		phase: GamePhase.PREPARING,
	},
};

export const Phase_0_Preparing_Selected_Piece: Story = {
	args: {
		overlay: null,
		phase: GamePhase.PREPARING,
		selectedPiece: true,
	},
};

export const Phase_0_Preparing_Selected_Piece_Stage2: Story = {
	args: {
		overlay: null,
		phase: GamePhase.PREPARING,
		selectedPiece: true,
		selectedPieceStage: 2,
	},
};

export const Phase_1_Ready: Story = {
	args: {
		phase: GamePhase.READY,
		opponentId: "5678",
	},
};

export const Phase_1_Ready_vs_Clone: Story = {
	args: {
		phase: GamePhase.READY,
		opponentId: "5678",
		opponentIsClone: true,
	},
};

export const Phase_2_Playing: Story = {
	args: {
		phase: GamePhase.PLAYING,
	},
};

export const Phase_3_MatchRewards_Won: Story = {
	args: {
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
	},
};

export const Phase_3_Victory: Story = {
	args: {
		phase: GamePhase.PLAYING,
		winnerId: "1234",
	},
};
