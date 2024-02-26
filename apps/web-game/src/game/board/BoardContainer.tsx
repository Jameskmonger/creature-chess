import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { DndProvider } from "@shoki-web/board-react";

import { GamePhase } from "@creature-chess/models";

import { Group } from "@cc-web/ui";

import { AppState } from "../../store";
import { NowPlaying } from "../module/nowPlaying";
import { SelectedPieceInfo } from "../module/selectedPieceInfo/SelectedPieceInfo";
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
		width: "100%",
		height: "100%",
	},
});

export function BoardContainer() {
	const styles = useStyles();
	const matchBoard = useGameMatchBoard();

	const inPlayingOrReadyPhase = useSelector<AppState, boolean>(
		(state) =>
			state.game.roundInfo.phase === GamePhase.PLAYING ||
			state.game.roundInfo.phase === GamePhase.READY
	);

	return (
		<DndProvider>
			<Group className={classNames(styles.boardContainer, "board-container")}>
				<NowPlaying />
				{!inPlayingOrReadyPhase && <SelectedPieceInfo />}

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
