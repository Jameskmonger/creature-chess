import * as React from "react";

import { useSelector } from "react-redux";
import { Button } from "~/components/ui";
import { AppState } from "~/store";
import { useGamePlayer } from "~/store/game/players";
import { createUseThemeStyles } from "~/useStyles";

import { BoardOverlay } from "./boardOverlay";

const useStyles = createUseThemeStyles((theme) => ({
	root: {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"width": "100%",
		"gap": "16px",

		"@media (orientation: portrait) and (min-width: 431px)": {
			gap: "32px",
		},
	},
	wrapper: {
		textAlign: "center",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		background: "#566c86",
		border: "2px solid #b13e53",

		fontFamily: theme.typography.primary,
	},
	title: {
		"textAlign": "left",
		"padding": "4px 8px",
		"fontFamily": theme.typography.accent,
		"fontSize": "36px",
		"borderBottom": "2px solid #b13e53",

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "24px",
		},
	},

	outcomes: {
		background: "#30364b",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	links: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	winner: {
		"flex": 2,
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"fontSize": "24px",

		"@media (orientation: portrait) and (min-width: 431px)": {
			fontSize: "32px",
		},
	},
	mainMenu: {
		margin: "0 auto",
		flex: 1,
	},
	discordButton: {
		flex: 1,
	},
	discordIcon: {
		height: "32px",
	},
}));

export function VictoryOverlay() {
	const styles = useStyles();

	const winnerId = useSelector<AppState, string | null>(
		(state) => state.game.ui.winnerId
	);
	const winner = useGamePlayer(winnerId);

	const onMenuClick = () => (window.location.href = APP_URL);

	if (!winner) {
		return null;
	}

	const winnerName = winner.name;

	return (
		<BoardOverlay>
			<div className={styles.root}>
				<div className={styles.wrapper}>
					<div className={styles.title}>Game Over!</div>
					<div className={styles.outcomes}>
						<div className={styles.winner}>{winnerName} wins!</div>
						<div className={styles.links}>
							<a
								href="https://discord.gg/FhMm6saehb"
								className={styles.discordButton}
							>
								<img
									src="https://i.imgur.com/OBo2QRd.png"
									className={styles.discordIcon}
								/>
							</a>
							<div className={styles.mainMenu}>
								<Button color="primary" size="medium" onClick={onMenuClick}>
									Main Menu
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</BoardOverlay>
	);
}
