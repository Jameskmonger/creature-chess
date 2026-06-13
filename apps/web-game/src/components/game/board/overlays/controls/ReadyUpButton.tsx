import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useGameActions } from "~/networking";
import { AppState } from "~/store";
import { useLocalPlayer } from "~/store/game/players";

import { GamePhase } from "@creature-chess/models";

import { COLOR_READY_BUTTON_TEXT, COLOR_READY_BUTTON } from "./colors";
import { Button } from "@creature-chess/ui";

// If the server hasn't confirmed our ready-up within this window, re-show the
// button so the player can try again rather than being stuck staring at empty
// space.
const READY_CONFIRM_TIMEOUT_MS = 3000;

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

	const localPlayer = useLocalPlayer();
	const isDead = localPlayer?.health === 0;
	const notReady = localPlayer?.ready === false;

	const inPreparingPhase = useSelector<AppState, boolean>(
		(state) => state.game.roundInfo.phase === GamePhase.PREPARING
	);

	// Optimistic hide: flips true on click and back to false either when the
	// server confirms (notReady -> false), the phase advances, or the timeout
	// expires without confirmation.
	const [pendingReady, setPendingReady] = React.useState(false);
	const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearPendingTimer = React.useCallback(() => {
		if (timerRef.current !== null) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	// Drop the optimistic flag whenever the underlying conditions for showing
	// the button no longer hold - server confirmed ready, phase moved on, or
	// the player died. Without this the flag could leak across rounds.
	React.useEffect(() => {
		if (!inPreparingPhase || !notReady || isDead) {
			clearPendingTimer();
			setPendingReady(false);
		}
	}, [inPreparingPhase, notReady, isDead, clearPendingTimer]);

	React.useEffect(() => clearPendingTimer, [clearPendingTimer]);

	const canReadyUp = inPreparingPhase && notReady && !isDead && !pendingReady;
	const onReadyUp = React.useCallback(() => {
		if (!canReadyUp) {
			return;
		}

		setPendingReady(true);
		clearPendingTimer();
		timerRef.current = setTimeout(() => {
			timerRef.current = null;
			setPendingReady(false);
		}, READY_CONFIRM_TIMEOUT_MS);

		gameActions.readyUp();
	}, [canReadyUp, clearPendingTimer, gameActions]);

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
