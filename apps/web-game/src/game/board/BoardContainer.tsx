import React from "react";
import { DndProvider } from "@shoki/board-react";
import { useGameMatchBoard } from "./hooks";
import { MatchBoard } from "./MatchBoard";
import { LocalBoard } from "./LocalBoard";
import { ReadyUpButton, ReadyOverlay, VictoryOverlay, MatchRewardsOverlay, ReconnectOverlay } from "./overlays";
import { NowPlaying } from "../module/nowPlaying";
import { Group } from "@creature-chess/ui";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
	boardContainer: {
		flex: 2
	}
})

export const BoardContainer: React.FC = () => {
	const styles = useStyles();
	const matchBoard = useGameMatchBoard();

	return (
		<DndProvider>
			<Group className={styles.boardContainer}>
				<NowPlaying />

				<ReadyUpButton />

				{
					matchBoard
						? <MatchBoard />
						: <LocalBoard />
				}

				<>
					<ReadyOverlay />
					<VictoryOverlay />
					<MatchRewardsOverlay />
					<ReconnectOverlay />
				</>
			</Group>
		</DndProvider>
	);
}
