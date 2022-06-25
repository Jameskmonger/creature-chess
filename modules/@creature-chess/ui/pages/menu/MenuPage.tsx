import * as React from "react";

import { createUseStyles } from "react-jss";

import { Footer } from "../../src/Footer";
import { useStyles } from "./MenuPage.styles";
import { useMenuPage } from "./MenuPageContext";

const useNavbarStyles = createUseStyles({
	navbar: {
		position: "fixed",
		top: "0",
		display: "flex",
		flexDirection: "row",
		width: "100%",
		height: "2em",
		background: "#985763",
		justifyContent: "flex-end",

		"& button": {
			fontWeight: "700",
			color: "#fff",
			cursor: "pointer",
			background: "#b13e53",
			border: "none",
			borderLeft: "1px solid #fff",
		},
	},
});

const Navbar: React.FunctionComponent = () => {
	const styles = useNavbarStyles();
	const {
		auth: { logout },
	} = useMenuPage();

	return (
		<nav className={styles.navbar}>
			<button onClick={logout}>Log Out</button>
		</nav>
	);
};

export const MenuPage: React.FC<{ error?: string }> = ({ error }) => {
	const styles = useStyles();
	const { findGame } = useMenuPage();

	return (
		<div className={styles.menu}>
			<Navbar />

			<div className={styles.joinGame}>
				<h2>Creature Chess</h2>

				<div className={styles.blurb}>
					<p>
						More fun with friends! Press "Find Game" at the same time to play
						together
					</p>
					<p>Up to 8 players!</p>
				</div>

				<button onClick={findGame} className={styles.findGameButton}>
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
};
