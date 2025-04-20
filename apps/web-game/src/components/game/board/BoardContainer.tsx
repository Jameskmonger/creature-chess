import React from "react";

import { createUseStyles } from "react-jss";

import { DndProvider } from "@shoki-web/board-react";

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
import { PieceCount } from "./overlays/PieceCount";

const useStyles = createUseStyles({
	boardContainer: {
		flex: 1,
		position: "relative",
	},
});

export function BoardContainer() {
	const styles = useStyles();
	const matchBoard = useGameMatchBoard();

	const children = (
		<>
			<NowPlaying />

			<PieceCount />
			<ReadyOverlay />
			<VictoryOverlay />
			<MatchRewardsOverlay />
			<ReconnectOverlay />
		</>
	);

	return (
		<DndProvider>
			<div className={styles.boardContainer}>
				{matchBoard ? (
					<MatchBoard>{children}</MatchBoard>
				) : (
					<LocalBoard>{children}</LocalBoard>
				)}
			</div>
		</DndProvider>
	);
}
