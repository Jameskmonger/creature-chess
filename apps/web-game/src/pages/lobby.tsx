import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { LobbyPlayerBanner } from "../components/lobby/LobbyPlayerBanner";
import { SettingsMenu } from "../components/lobby/SettingsMenu";
import { useOpenSettingsMenu } from "../components/lobby/hooks/useOpenSettingsMenu";
import { Footer } from "../components/ui/Footer";
import { Countdown } from "../components/ui/countdown";
import { AppState } from "../store";

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
	"lobbyPage": {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		width: "100%",
		overflow: "scroll",
		paddingTop: "2em",
		fontFamily: "Arial, Helvetica, sans-serif",
		color: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	"lobbyInfo": {
		display: "flex",
		flexDirection: "column",
		padding: "1rem",
		marginTop: "1rem",
		textAlign: "center",
		background: "#566c86",
	},
	"timeRemaining": {
		padding: "0.5em 0.6em",
		marginBottom: "1em",
		textTransform: "uppercase",
		background: "#333",
	},
	"timeRemainingHighlight": {
		fontWeight: "700",
	},
	"players": {
		flex: "1 0 0",
		display: "flex",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	"playerWrapper": {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	"@media (min-width: 1024px)": {
		playerWrapper: {
			width: "40%",
		},
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
		<div className={styles.lobbyPage}>
			<div className={styles.lobbyInfo}>
				{startTimestamp && (
					<Countdown
						countdownToSeconds={startTimestamp / 1000}
						render={countdownRender(styles)}
					/>
				)}

				<div className={styles.players}>{playerItems}</div>

				<p>
					The game will start {lobbyWaitTimeSeconds} seconds after the lobby is
					created, or immediately when there are {maxPlayers} players
				</p>

				{menuOpen && <SettingsMenu />}
			</div>

			<Footer />
		</div>
	);
}
