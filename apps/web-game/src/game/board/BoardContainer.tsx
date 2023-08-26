import React from "react";

import { Group } from "@cc-web/ui";
import { DndProvider } from "@shoki-web/board-react";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { NowPlaying } from "../module/nowPlaying";
import { LocalBoard } from "./LocalBoard";
import { MatchBoard } from "./MatchBoard";
import { useGameMatchBoard } from "./hooks";
import {
	ReadyOverlay,
	VictoryOverlay,
	MatchRewardsOverlay,
	ReconnectOverlay,
} from "./overlays";

const useStyles = createUseStyles({
	boardContainer: {
		flex: 2,
		position: "relative",
	},
});

export function BoardContainer() {
	const styles = useStyles();
	const matchBoard = useGameMatchBoard();

	return (
		<DndProvider>
			<Group className={classNames(styles.boardContainer, "board-container")}>
				<NowPlaying />

				{matchBoard ? <MatchBoard /> : <LocalBoard />}

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
