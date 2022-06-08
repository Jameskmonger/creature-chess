import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../../store";
import { GamePhase } from "@creature-chess/models";
import { PlayerActions } from "@creature-chess/gamemode";
import { createUseStyles } from "react-jss";

const COLOR_READY_BUTTON = "#38b764";
const COLOR_READY_BUTTON_TEXT = "#000000";

const useStyles = createUseStyles({
	readyButton: {
		"box-sizing": "border-box",
		"padding": "2rem",
		"font-size": "1.6rem",
		"color": COLOR_READY_BUTTON_TEXT,
		"cursor": "pointer",
		"background": COLOR_READY_BUTTON,
		"border": "none",
	}
})

const ReadyUpButton: React.FC = () => {
	const dispatch = useDispatch();
	const styles = useStyles();

	const inPreparingPhase = useSelector<AppState, boolean>(state => state.game.roundInfo.phase === GamePhase.PREPARING);
	const notReady = useSelector<AppState, boolean>(state => state.game.playerInfo.ready === false);

	const canReadyUp = inPreparingPhase && notReady;

	if (!canReadyUp) {
		return null;
	}

	const onReadyUp = () => dispatch(PlayerActions.readyUpPlayerAction());

	return <button className={styles.readyButton} onClick={onReadyUp}>Ready</button>;
};

export { ReadyUpButton };
