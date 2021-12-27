import * as React from "react";
import { LOBBY_WAIT_TIME, MAX_PLAYERS_IN_GAME } from "@creature-chess/models";
import { Countdown } from "../../src/countdown";
import { useStyles } from "./LobbyPage.styles";

import { LobbyPlayerBanner } from "./LobbyPlayerBanner/LobbyPlayerBanner";
import { Footer } from "../../src/Footer";
import { useLobbyPage } from "./LobbyPageContext";

const padNumberToTwo = (val: number) => val < 10 ? `0${val}` : val.toString();

const countdownRender = (styles: ReturnType<typeof useStyles>) => (totalSecondsRemaining: number) => {
	const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
	const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

	const time = `${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`;

	return (
		<div className={styles.timeRemaining}>
			Game starting in <span className={styles.timeRemainingHighlight}>{time}</span>
		</div>
	);
};

const LobbyPage: React.FunctionComponent = () => {
	const styles = useStyles();

	const { players, startingAtMs } = useLobbyPage();

	const botElements: React.ReactNode[] = [];

	for (let i = players.length; i < MAX_PLAYERS_IN_GAME; i++) {
		botElements.push(
			<div key={i} className={styles.playerWrapper}>
				<LobbyPlayerBanner player={null} />
			</div>
		);
	}

	return (
		<div className={styles.lobbyPage}>
			<div className={styles.lobbyInfo}>
				{
					startingAtMs
					&& (
						<Countdown
							countdownToSeconds={startingAtMs / 1000}
							render={countdownRender(styles)}
						/>
					)
				}

				<div className={styles.players}>
					{
						players.map(p => (
							<div key={p.id} className={styles.playerWrapper}>
								<LobbyPlayerBanner player={p} />
							</div>
						))
					}

					{botElements}
				</div>

				<p>
					The game will start {LOBBY_WAIT_TIME} seconds after the lobby is created,
					or immediately when there are {MAX_PLAYERS_IN_GAME} players
				</p>
			</div>

			<Footer />
		</div>
	);
};

export { LobbyPage };
