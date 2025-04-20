import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { Page } from "~/components/Page";
import { LobbyPlayerBanner } from "~/components/lobby/LobbyPlayerBanner";
import { SettingsMenu } from "~/components/lobby/SettingsMenu";
import { useOpenSettingsMenu } from "~/components/lobby/hooks/useOpenSettingsMenu";
import { Footer } from "~/components/ui/Footer";
import { Countdown } from "~/components/ui/countdown";
import { AppState } from "~/store";

const padNumberToTwo = (val: number) => (val < 10 ? `0${val}` : val.toString());

const countdownRender =
	(styles: ReturnType<typeof useStyles>) => (totalSecondsRemaining: number) => {
		const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
		const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

		const time = `${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`;

		return (
			<div className={styles.timeRemaining}>
				Game starting in{" "}
				<span className={styles.timeRemainingHighlight}>{time}</span>
			</div>
		);
	};

const useStyles = createUseStyles({
	lobbyInfo: {
		"flex": 1,

		"display": "flex",
		"flexDirection": "column",
		"textAlign": "center",
		"fontFamily": '"Roboto", "sans-serif"',
		"color": "#fff",
		"width": "100%",

		"@media (orientation: portrait) and (max-width: 376px)": {
			gap: "8px",
			marginBottom: "8px",
		},

		"@media (orientation: portrait) and (min-width: 377px)": {
			gap: "16px",
			marginBottom: "16px",
		},

		"@media (orientation: landscape)": {
			gap: "16px",
			marginBottom: "16px",
		},
	},
	timeRemaining: {
		padding: "0.5em 0.6em",
		textTransform: "uppercase",
		background: "#333",
	},
	timeRemainingHighlight: {
		fontWeight: "700",
	},
	players: {
		"flex": 1,

		"display": "grid",
		"gridTemplateColumns": "repeat(2, 1fr)",
		"gridTemplateRows": "repeat(4, auto)",

		"@media (orientation: portrait) and (max-width: 376px)": {
			gap: "8px",
		},

		"@media (orientation: portrait) and (min-width: 377px)": {
			gap: "12px",
		},

		"@media (orientation: landscape)": {
			gap: "12px",
		},
	},
	playerWrapper: {
		display: "flex",
		flexDirection: "column",
	},
});

export function LobbyPage() {
	const styles = useStyles();
	const lobbyInfo = useSelector((state: AppState) => state.lobby);

	const { targetRef: finalPlayerRef, menuOpen } = useOpenSettingsMenu();

	const playerItems = React.useMemo(() => {
		if (!lobbyInfo) {
			return [];
		}

		const output: React.ReactNode[] = [];

		for (let i = 0; i < lobbyInfo.maxPlayers; i++) {
			const player = lobbyInfo.players[i];

			output.push(
				<div
					key={player ? player.id : i}
					className={styles.playerWrapper}
					ref={i === lobbyInfo.maxPlayers - 1 ? finalPlayerRef : undefined}
				>
					<LobbyPlayerBanner player={player ?? null} />
				</div>
			);
		}

		return output;
	}, [lobbyInfo, styles.playerWrapper, finalPlayerRef]);

	if (!lobbyInfo) {
		return null;
	}

	const { startTimestamp, maxPlayers, lobbyWaitTimeSeconds } = lobbyInfo;

	return (
		<Page hasBackground>
			<div className={styles.lobbyInfo}>
				{startTimestamp && (
					<Countdown
						countdownToSeconds={startTimestamp / 1000}
						render={countdownRender(styles)}
					/>
				)}

				<div className={styles.players}>{playerItems}</div>

				<p>
					The game will start immediately when there are {maxPlayers} players
				</p>

				{menuOpen && <SettingsMenu />}
			</div>

			<Footer />
		</Page>
	);
}
