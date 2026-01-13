import React from "react";

import { createUseStyles } from "react-jss";

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
import { useSelector } from "react-redux";
import { GamePhase } from "@creature-chess/models";
import { AppState } from "~/store";
import { DndProvider } from "~/components/board/DndProvider";

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
		<DndProvider>
			<div className={styles.boardContainer}>
				{phase !== GamePhase.PREPARING ? (
					<MatchBoard>{children}</MatchBoard>
				) : (
					<LocalBoard>{children}</LocalBoard>
				)}
			</div>
		</DndProvider>
	);
}
