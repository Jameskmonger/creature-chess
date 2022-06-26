import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { GamePhase } from "@creature-chess/models";

import { AppState } from "../../store";

const useStyles = createUseStyles({
	nowPlaying: {
		color: "#ffffff",
		width: "100%",
		textAlign: "center",
		fontFamily: "Arial, sans-serif",
		marginTop: "0.5em",
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

	return <span className={styles.nowPlaying}>Now Playing: {opponentName}</span>;
}
