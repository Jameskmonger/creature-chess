import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector, useDispatch } from "react-redux";

import { PlayerActions } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

import { AppState } from "../../../../store";
import { COLOR_READY_BUTTON_TEXT, COLOR_READY_BUTTON } from "./colors";

const useStyles = createUseStyles({
	readyButton: {
		"box-sizing": "border-box",
		padding: "2rem",
		"font-size": "1.6rem",
		color: COLOR_READY_BUTTON_TEXT,
		cursor: "pointer",
		background: COLOR_READY_BUTTON,
		border: "none",
	},
});

export function ReadyUpButton() {
	const dispatch = useDispatch();
	const styles = useStyles();

	const inPreparingPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);
	const notReady = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.ready === false
	);

	const canReadyUp = inPreparingPhase && notReady;
	const onReadyUp = React.useCallback(() => {
		if (!canReadyUp) {
			return;
		}

		dispatch(PlayerActions.readyUpPlayerAction());
	}, []);

	if (!canReadyUp) {
		// To keep the Sell button in the same place
		return <div></div>;
	}

	return (
		<button className={styles.readyButton} onClick={onReadyUp}>
			Ready
		</button>
	);
}
