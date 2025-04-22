import * as React from "react";

import { AppState } from "@auth0/auth0-react";
import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { Overlay } from "~/store/game/ui";

const useStyles = createUseStyles({
	contentPane: {
		flex: "1",
		display: "flex",
		flexDirection: "column",
		overflowY: "hidden",
		justifyContent: "space-between",
	},

	padOuter: {
		"gap": "8px",
		"padding": "8px 0",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "4px",
			padding: "4px 0",
		},
	},
});

export function MobileContentPane({ children }: { children: React.ReactNode }) {
	const styles = useStyles();
	const currentOverlay = useSelector<AppState, Overlay | null>(
		(state) => state.game.ui.currentOverlay
	);

	return (
		<div
			className={classNames({
				[styles.contentPane]: true,
				[styles.padOuter]: currentOverlay === null,
			})}
		>
			{children}
		</div>
	);
}
