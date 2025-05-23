import React from "react";

import { Meta, Story } from "@storybook/react";
import { LocalPlayerContextProvider } from "~/auth/context";
import { GamemodeSettingsContextProvider } from "~/contexts/GamemodeSettingsContext";
import { GameState } from "~/store/game/state";

import { GamePhase } from "@creature-chess/models";
import { GamemodeSettingsPresets } from "@creature-chess/models/settings";

import { GameStateProvider } from "../../../../../.storybook/GameStateProvider";
import { useGlobalStyles } from "../../../../styles";
import { DesktopGame } from "./DesktopGame";

export default {
	title: "@creature-chess / game / DesktopGame",
	component: DesktopGame,
	argTypes: {},
} as Meta;

const Template: Story<any> = (args) => {
	useGlobalStyles();

	const decorateState = (state: GameState) => {
		const newState = {
			...state,
			ui: {
				...state.ui,
				winnerId: args.winnerId ? args.winnerId : state.ui.winnerId,
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
		};

		if (args.selectedPieceStage && newState.ui.selectedPieceId) {
			const piece =
				newState.board.pieces[newState.ui.selectedPieceId as string];

			piece.stage = args.selectedPieceStage;
		}

		return newState;
	};

	return (
		<GameStateProvider
			halfBoard={args.phase === GamePhase.PREPARING}
			decorateState={decorateState}
		>
			<div style={{ width: "90%", height: "90%", border: "2px solid red" }}>
				<GamemodeSettingsContextProvider
					value={GamemodeSettingsPresets["default"]}
				>
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
						<DesktopGame />
					</LocalPlayerContextProvider>
				</GamemodeSettingsContextProvider>
			</div>
		</GameStateProvider>
	);
};

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
