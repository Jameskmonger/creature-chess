import React, { useCallback } from "react";

import { createUseStyles } from "react-jss";

import { Button } from "@cc-web/ui/components/Button";

import { useLobbyPage } from "../LobbyPageContext";

const useStyles = createUseStyles({
	settingsMenu: {
		padding: "1em",
		border: "1px solid #b13e53",
		fontFamily: "Arial, sans-serif",
		textAlign: "left",
	},
	header: {
		textTransform: "uppercase",
		fontSize: "1rem",
	},
});

export function SettingsMenu() {
	const styles = useStyles();
	const { onStartNow } = useLobbyPage();

	return (
		<div className={styles.settingsMenu}>
			<h2 className={styles.header}>Super Secret Settings</h2>
			<div>
				<Button onClick={onStartNow}>Start Now</Button>
			</div>
		</div>
	);
}
