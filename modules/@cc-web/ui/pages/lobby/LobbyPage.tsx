import * as React from "react";

import { Footer } from "../../src/Footer";
import { Countdown } from "../../src/countdown";
import { useStyles } from "./LobbyPage.styles";
import { useLobbyPage } from "./LobbyPageContext";
import { LobbyPlayerBanner } from "./LobbyPlayerBanner/LobbyPlayerBanner";

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

export function LobbyPage() {
	const styles = useStyles();

	const { players, startingAtMs, maxPlayers, lobbyWaitTimeSeconds } =
		useLobbyPage();

	const botElements = React.useMemo(() => {
		const output: React.ReactNode[] = [];

		for (let i = players.length; i < maxPlayers; i++) {
			output.push(
				<div key={i} className={styles.playerWrapper}>
					<LobbyPlayerBanner player={null} />
				</div>
			);
		}

		return output;
	}, [maxPlayers, players.length, styles.playerWrapper]);

	return (
		<div className={styles.lobbyPage}>
			<div className={styles.lobbyInfo}>
				{startingAtMs && (
					<Countdown
						countdownToSeconds={startingAtMs / 1000}
						render={countdownRender(styles)}
					/>
				)}

				<div className={styles.players}>
					{players.map((p) => (
						<div key={p.id} className={styles.playerWrapper}>
							<LobbyPlayerBanner player={p} />
						</div>
					))}

					{botElements}
				</div>

				<p>
					The game will start {lobbyWaitTimeSeconds} seconds after the lobby is
					created, or immediately when there are {maxPlayers} players
				</p>
			</div>

			<Footer />
		</div>
	);
}
