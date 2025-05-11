import * as React from "react";

import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { Page } from "~/components/Page";
import { Help } from "~/components/game/help";
import { Footer } from "~/components/ui/Footer";
import { LoadingScreen } from "~/components/ui/LoadingScreen";
import { TabMenu } from "~/components/ui/TabMenu";
import { Text } from "~/components/ui/text";
import { openConnection } from "~/networking";
import { AppState } from "~/store";

const useStyles = createUseStyles({
	findGameButton: {
		"padding": "12px 16px",
		"marginBottom": "8px",
		"fontSize": "16px",
		"fontWeight": "700",
		"color": "#fff",
		"cursor": "pointer",
		"background": "#b13e53",
		"border": "none",

		"@media (min-width: 400px)": {
			fontSize: "24px",
		},
	},
	findGameButtonContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	discordButton: {
		"maxWidth": "12em",
		"cursor": "pointer",

		"& img": {
			width: "100%",
			height: "auto",
		},
	},
	blurb: {
		"marginBottom": "0.5rem",
		"& p:not(:last-child)": {
			marginBottom: "0.5rem",
		},
		"& span": {
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
	footer: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
	},
	half: {
		width: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
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
		return <LoadingScreen message={loadingMessage} />;
	}

	return (
		<Page hasBackground>
			<TabMenu
				tabs={[
					{
						label: "Menu",
						content: (
							<>
								<Text tag="p" light center>
									Welcome to&nbsp;&nbsp;
									<Text size="lg" font="cursive" light>
										Creature Chess
									</Text>
									&nbsp;!
								</Text>

								<div className={styles.blurb}>
									<Text tag="p" size="sm" light>
										This is a <span>multiplayer strategy game</span> in which
										you configure creatures on a board.
									</Text>
									<Text tag="p" size="sm" light>
										Each round, your board is matched against an opponent's
										board. Defeat all their pieces to win the round.
									</Text>
									<Text tag="p" size="sm" light>
										Every loss decreases your health bar. When your health
										reaches zero, you're out!
									</Text>
									<Text tag="p" size="sm" light>
										Players will battle against eachother until only one player
										remains.
									</Text>
									<Text tag="p" size="md" light center>
										Good luck! <span>~ jkm</span>
									</Text>
								</div>

								<div className={styles.findGameButtonContainer}>
									<button
										onClick={onFindGameClick}
										className={styles.findGameButton}
									>
										Find Game
									</button>
								</div>

								<Text tag="p" light font="cursive" center>
									More fun with friends!
								</Text>

								<Text tag="p" light center>
									Press "Find Game" at the same time to play together
								</Text>

								{error && (
									<div className={styles.error}>
										<p>{error}</p>
									</div>
								)}

								<div className={styles.footer}>
									<div className={styles.half}>
										<Footer />
									</div>

									<div className={styles.half}>
										<a
											href="https://discord.gg/FhMm6saehb"
											className={styles.discordButton}
										>
											<img src="https://i.imgur.com/OBo2QRd.png" />
										</a>
									</div>
								</div>
							</>
						),
					},
					{
						label: "Help",
						content: <Help />,
					},
				]}
			/>
		</Page>
	);
}
