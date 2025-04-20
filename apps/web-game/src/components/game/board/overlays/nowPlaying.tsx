import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { AppState } from "~/store";

import { GamePhase } from "@creature-chess/models";

const useStyles = createUseStyles({
	nowPlaying: {
		position: "absolute",
		top: 0,
		color: "#ffffff",
		width: "100%",
		textAlign: "center",
		padding: "4px",
		boxSizing: "border-box",
		background: "rgba(0, 0, 0, 0.8)",
		zIndex: 400,
	},
});

const getOpponentName = (state: AppState) =>
	state.game.playerList.find((p) => p.id === state.game.playerInfo.opponentId)
		?.name || null;

export function NowPlaying() {
	const styles = useStyles();
	const phase = useSelector<AppState, GamePhase | null>(
		(state) => state.game.roundInfo.phase
	);
	const opponentName = useSelector<AppState, string | null>(getOpponentName);

	if (phase !== GamePhase.READY && phase !== GamePhase.PLAYING) {
		return null;
	}

	if (!opponentName) {
		return null;
	}

	return <div className={styles.nowPlaying}>Now Playing: {opponentName}</div>;
}
