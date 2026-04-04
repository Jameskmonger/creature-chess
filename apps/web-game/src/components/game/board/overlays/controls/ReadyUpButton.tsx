import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useGameActions } from "~/networking";
import { AppState } from "~/store";
import { GamePhase } from "@creature-chess/models";

import { COLOR_READY_BUTTON_TEXT, COLOR_READY_BUTTON } from "./colors";
import { Button } from "~/components/ui";

const useStyles = createUseStyles({
	button: {
		"background": COLOR_READY_BUTTON,
		"color": COLOR_READY_BUTTON_TEXT,
		"box-sizing": "border-box",
		"border": "none",
		"cursor": "pointer",

		"fontSize": "14px",
		"fontWeight": "700",
		"padding": "8px 8px",
		"letterSpacing": "2px",

		"width": "100%",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "12px",
			padding: "4px",
			letterSpacing: "1px",
		},
	},
});

export function ReadyUpButton() {
	const gameActions = useGameActions();
	const styles = useStyles();

	const isDead = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.health === 0
	);

	const inPreparingPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);
	const notReady = useSelector<AppState, boolean>(
		(state) => state.game.playerInfo.ready === false
	);

	const canReadyUp = inPreparingPhase && notReady && !isDead;
	const onReadyUp = React.useCallback(() => {
		if (!canReadyUp) {
			return;
		}

		gameActions.readyUp();
	}, [canReadyUp, gameActions]);

	if (!canReadyUp) {
		// To keep the Sell button in the same place
		return <div />;
	}

	return (
		<Button color="secondary" size="small" onClick={onReadyUp}>
			Ready
		</Button>
	);
}
