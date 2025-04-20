import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { DndProvider } from "@shoki-web/board-react";

import { GamePhase } from "@creature-chess/models";

import { Group } from "../../ui/layout";
import { SelectedPieceInfo } from "../SelectedPieceInfo";
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
		flex: 2,
		position: "relative",
		width: "100%",
		height: "100%",
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
