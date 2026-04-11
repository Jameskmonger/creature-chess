import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { ConnectionStatus } from "~/networking";
import { Overlay } from "~/store/game/ui/overlay";

import { GamePhase } from "@creature-chess/models";

import {
	GameLayoutStoryArgs,
	GameLayoutStoryWrapper,
} from "../GameLayoutStory";
import { MobileGame } from "./MobileGame";

const meta: Meta<GameLayoutStoryArgs> = {
	title: "@creature-chess / game / MobileGame",
	component: MobileGame,
	argTypes: {},
	render: (args) => (
		<GameLayoutStoryWrapper args={args}>
			<MobileGame />
		</GameLayoutStoryWrapper>
	),
};
export default meta;

type Story = StoryObj<GameLayoutStoryArgs>;

export const Phase_0_Preparing: Story = {
	args: {
		overlay: null,
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
		overlay: null,
		phase: GamePhase.READY,
		opponentId: "5678",
	},
};

export const Phase_1_Ready_vs_Clone: Story = {
	args: {
		overlay: null,
		phase: GamePhase.READY,
		opponentId: "5678",
		opponentIsClone: true,
	},
};

export const Phase_2_Playing: Story = {
	args: {
		overlay: null,
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

export const Phase_3_MatchRewards_Lost: Story = {
	args: {
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
	},
};

export const Phase_3_MatchRewards_Died: Story = {
	args: {
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
	},
};

export const Phase_4_Victory: Story = {
	args: {
		overlay: null,
		phase: GamePhase.PLAYING,
		winnerId: "1234",
	},
};

export const Phase_4_Disconnected: Story = {
	args: {
		overlay: null,
		phase: GamePhase.PLAYING,
		connectionStatus: ConnectionStatus.DISCONNECTED,
	},
};

export const Tab_1_Players_Overlay: Story = {
	args: {
		phase: GamePhase.PREPARING,
		overlay: Overlay.PLAYERS,
	},
};

export const Tab_2_Shop_Overlay: Story = {
	args: {
		phase: GamePhase.PREPARING,
		overlay: Overlay.SHOP,
		cardShop: {
			locked: false,
		},
	},
};
export const Tab_2_Shop_Overlay_Locked: Story = {
	args: {
		phase: GamePhase.PREPARING,
		overlay: Overlay.SHOP,
		cardShop: {
			locked: true,
		},
	},
};

export const Tab_3_Stats_Overlay: Story = {
	args: {
		phase: GamePhase.PREPARING,
		overlay: Overlay.STATS,
	},
};

export const Tab_3_Stats_Overlay_Piece_Selected: Story = {
	args: {
		phase: GamePhase.PREPARING,
		overlay: Overlay.STATS,
		selectedPiece: true,
	},
};

export const Tab_4_Options_Overlay: Story = {
	args: {
		phase: GamePhase.PREPARING,
		overlay: Overlay.SETTINGS,
	},
};
