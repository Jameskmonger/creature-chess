import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { DndProvider } from "@shoki/board-react";

import { Group } from "@creature-chess/ui";

import { NowPlaying } from "../module/nowPlaying";
import { LocalBoard } from "./LocalBoard";
import { MatchBoard } from "./MatchBoard";
import { useGameMatchBoard } from "./hooks";
import {
	ReadyOverlay,
	VictoryOverlay,
	MatchRewardsOverlay,
	ReconnectOverlay,
	Controls,
} from "./overlays";

const useStyles = createUseStyles({
	boardContainer: {
		flex: 2,
	},
});

export function BoardContainer() {
	const styles = useStyles();
	const matchBoard = useGameMatchBoard();

	return (
		<DndProvider>
			<Group className={classNames(styles.boardContainer, "board-container")}>
				<NowPlaying />

				<Controls />

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
