import * as React from "react";

import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";

import { Footer } from "../components/ui/Footer";
import { LoadingScreen } from "../components/ui/LoadingScreen";
import { openConnection } from "../networking";
import { AppState } from "../store";

const useStyles = createUseStyles({
	menu: {
		"display": "flex",
		"flexDirection": "column",
		"height": "100%",
		"width": "100%",
		"overflow": "scroll",
		"paddingTop": "2em",
		"fontFamily": "Arial, Helvetica, sans-serif",
		"color": "#fff",
		"alignItems": "center",
		"justifyContent": "center",

		"& h2": {
			marginBottom: "1rem",
			fontSize: "2em",
			textAlign: "center",
			userSelect: "none",
		},
	},
	findGameButton: {
		padding: "0.8em 2em",
		marginBottom: "1rem",
		fontSize: "1.4rem",
		fontWeight: "700",
		color: "#fff",
		cursor: "pointer",
		background: "#b13e53",
		border: "none",
	},
	joinGame: {
		padding: "1rem",
		marginTop: "3em",
		textAlign: "center",
		background: "#566c86",
	},
	discordButton: {
		maxWidth: "12em",
		marginBottom: "1rem",
		cursor: "pointer",
	},
	blurb: {
		"marginBottom": "0.5rem",
		"& p": {
			marginTop: "0",
			marginBottom: "0.25rem",
		},
		"& span": {
			fontSize: "1.2em",
			fontStyle: "italic",
			fontWeight: "700",
			color: "#bfbfbf",
		},
	},
	error: {
		padding: "1em 0.5em",
		marginBottom: "1em",
		color: "#db2828",
		background: "#ffe8e6",
		boxShadow: "0 0 0 1px #db2828 inset, 0 0 0 0 transparent",
	},
	loadingWrapper: {
		height: "100%",
		width: "100%",
	},
});

export function MenuPage({ error }: { error?: string }) {
	const styles = useStyles();
	const dispatch = useDispatch();

	const loadingMessage = useSelector(
		(state: AppState) => state.menu.loadingMessage
	);

	const onFindGameClick = React.useCallback(
		() => dispatch(openConnection()),
		[dispatch]
	);

	if (loadingMessage) {
		return (
			<LoadingScreen
				message={loadingMessage}
				logoSrc="https://i.imgur.com/7FAcFwZ.png"
			/>
		);
	}

	return (
		<div className={styles.menu}>
			<div className={styles.joinGame}>
				<h2>Creature Chess</h2>

				<div className={styles.blurb}>
					<p>
						More fun with friends! Press "Find Game" at the same time to play
						together
					</p>
					<p>Up to 8 players!</p>
				</div>

				<button onClick={onFindGameClick} className={styles.findGameButton}>
					Find Game
				</button>

				<div className={styles.blurb}>
					<p>
						Join us on Discord to receive notifications when someone starts a
						lobby, and more!
					</p>
				</div>

				<a href="https://discord.gg/FhMm6saehb">
					<img
						src="https://i.imgur.com/OBo2QRd.png"
						className={styles.discordButton}
					/>
				</a>

				<div className={styles.blurb}>
					<p>
						This is a <span>multiplayer strategy game</span> in which you
						configure creatures on a board.
					</p>
					<p>
						Each round, your board is matched against an opponent's board.
						Defeat all their pieces to win the round.
					</p>
					<p>
						Every loss decreases your health bar. When your health reaches zero,
						you're out!
					</p>
					<p>
						Players will battle against eachother until only one player remains.
					</p>
					<p>
						Good luck! <span>~ jkm</span>
					</p>
				</div>

				{error && (
					<div className={styles.error}>
						<p>{error}</p>
					</div>
				)}
			</div>

			<Footer />
		</div>
	);
}
