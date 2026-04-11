import React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { PieceDragContextProvider } from "~/components/board/drag/PieceDragContext";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";

import { LocalBoard } from "./LocalBoard";
import { MatchBoard } from "./MatchBoard";
import { useGameMatchBoard } from "./hooks";
import {
	ReadyOverlay,
	VictoryOverlay,
	MatchRewardsOverlay,
	ReconnectOverlay,
	NowPlaying,
} from "./overlays";

const useStyles = createUseStyles({
	boardContainer: {
		flex: 1,
		position: "relative",
	},
});

export function BoardContainer() {
	const styles = useStyles();
	const matchBoard = useGameMatchBoard();
	const phase = useSelector<AppState, GamePhase | null>(
		(state) => state.game.roundInfo.phase
	);

	const children = (
		<>
			<NowPlaying />

			<ReadyOverlay />
			<VictoryOverlay />
			<MatchRewardsOverlay />
			<ReconnectOverlay />
		</>
	);

	return (
		<PieceDragContextProvider>
			<div className={styles.boardContainer}>
				{phase !== GamePhase.PREPARING ? (
					<MatchBoard>{children}</MatchBoard>
				) : (
					<LocalBoard>{children}</LocalBoard>
				)}
			</div>
		</PieceDragContextProvider>
	);
}
