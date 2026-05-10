import React from "react";

import { createUseStyles } from "react-jss";
import { PieceDragContextProvider } from "~/components/board/drag/PieceDragContext";

import { BoardSurface } from "./BoardSurface";
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

	return (
		<PieceDragContextProvider>
			<div className={styles.boardContainer}>
				<BoardSurface>
					<NowPlaying />

					<ReadyOverlay />
					<VictoryOverlay />
					<MatchRewardsOverlay />
					<ReconnectOverlay />
				</BoardSurface>
			</div>
		</PieceDragContextProvider>
	);
}
