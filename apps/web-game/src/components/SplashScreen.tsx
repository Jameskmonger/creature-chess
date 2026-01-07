import React from "react";
import { createUseStyles } from "react-jss";
import { PageBoardBackground } from "./PageBackground";
import { CreatureImage } from "./ui/creatureImage";
import { createUseThemeStyles } from "~/useStyles";

type Props = {
	onPlay: () => void;
};

const useStyles = createUseThemeStyles(theme => ({
	root: {
		position: "relative",
		overflow: "hidden",
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		boxSizing: "border-box",
	},
	top: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "end",
		flex: "0 0 auto",
		height: "40%",
	},
	logoWrapper: {
		"width": "70%",
		"maxWidth": "440px",
		"& img": {
			width: "100%",
			height: "auto",
			display: "block",
			filter: "drop-shadow(0px 6px 4px #222)"
		},
	},
	tagline: {
		fontSize: 18,
		color: "#fff",
		padding: "0.25em 2em",
		marginTop: "-0.25em",
		zIndex: 1,
		background: "rgba(85, 85, 85, 1.0)",
	},
	highlight: {
		color: "#f5d742",
		fontFamily: theme.typography.accent,
	},
	bottom: {
		flex: "1 1 auto",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		boxSizing: "border-box",
		width: "100%",
		padding: "16px",
	},
	playButton: {
		"padding": "14px 36px",
		"fontSize": 20,
		"fontWeight": "bold",
		"background": "#b13e53",
		"border": "none",
		"borderRadius": 14,
		"color": "#fff",
		"cursor": "pointer",
		"width": "100%",
		"transition": "background 0.2s ease-in-out",
		"&:hover": {
			background: "#d84a62",
		},
	},
	pane: {
		height: "100%",
		width: "calc(100% - 32px)",
		background: "#333c57",
		boxSizing: "border-box",
		padding: "4px",
	},
	paneInner: {
		height: "100%",
		width: "100%",
		border: "2px solid #424e70",
		boxSizing: "border-box",
		padding: "8px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "16px",
		color: "#fff",
		fontSize: "16px",
	},
	creatures: {
		"display": "flex",
		"justifyContent": "center",
		"gap": "8px",
		"& img": {
			"height": "48px",
			"width": "48px",

			"@media (max-width: 360px)": {
				height: "32px",
				width: "32px",
			}
		},
	},
	largeOnly: {
		"@media (max-width: 360px)": {
			display: "none",
		},
	},
	welcome: {
		fontSize: "24px",
		textAlign: "center",
	},
	description: {
		flex: "1 1 auto",
		display: "flex",
		flexDirection: "column",
		gap: "16px",
	},
	withFriends: {
		fontSize: "14px",
		fontStyle: "italic",
		textAlign: "center",
		color: "#bbb",
	},
	footer: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: "8px",
	},
}));

export function SplashScreen({ onPlay }: Props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<PageBoardBackground />
			<div className={classes.top}>
				<div className={classes.logoWrapper}>
					<img src={`${APP_IMAGE_ROOT}/ui/logo.png`} alt="Creature Chess Logo" />
				</div>
				<div className={classes.tagline}>A <span className={classes.highlight}>'Tiberisoft'</span> Game</div>
			</div>
			<div className={classes.bottom}>
				<div className={classes.pane}>
					<div className={classes.paneInner}>
						<div className={classes.creatures}>
							<CreatureImage definitionId={33} facing="front" />
							<CreatureImage definitionId={47} facing="front" />
							<CreatureImage definitionId={39} facing="front" />
							<CreatureImage definitionId={44} className={classes.largeOnly} facing="front" />
							<CreatureImage definitionId={27} className={classes.largeOnly} facing="front" />
						</div>

						<div className={classes.description}>
							<p className={classes.welcome}>Welcome to <span className={classes.highlight}>Creature Chess</span>!</p>
							<p>This is a multiplayer strategy game where you configure creatures on a board.</p>
							<p>Each round, your board is matched against an opponent's board. Defeat all their pieces to win the round.</p>
							<p>Every loss decreases your health bar. When your health reaches zero, you're out!</p>
							<p>Players will battle against each other until only one player remains.</p>
						</div>

						<div className={classes.footer}>
							<button className={classes.playButton} onClick={onPlay}>
								Play Now
							</button>
							<p className={classes.withFriends}>More fun with friends! Press 'Play Now' at the same time to play together.</p>
							<a href="https://discord.gg/acRdGQceWJ" className={classes.withFriends}>Join us on Discord</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
