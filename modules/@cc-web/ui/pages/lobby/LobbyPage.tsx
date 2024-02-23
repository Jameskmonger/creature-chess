import * as React from "react";

import { Footer } from "../../src/Footer";
import { Countdown } from "../../src/countdown";
import { useStyles } from "./LobbyPage.styles";
import { useLobbyPage } from "./LobbyPageContext";
import { LobbyPlayerBanner } from "./LobbyPlayerBanner/LobbyPlayerBanner";
import { SettingsMenu } from "./settings/SettingsMenu";
import { useOpenSettingsMenu } from "./settings/useOpenSettingsMenu";

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

	const { targetRef: finalPlayerRef, menuOpen } = useOpenSettingsMenu();

	const playerItems = React.useMemo(() => {
		const output: React.ReactNode[] = [];

		for (let i = 0; i < maxPlayers; i++) {
			const player = players[i];

			output.push(
				<div
					key={player ? player.id : i}
					className={styles.playerWrapper}
					ref={i === maxPlayers - 1 ? finalPlayerRef : undefined}
				>
					<LobbyPlayerBanner player={player ?? null} />
				</div>
			);
		}

		return output;
	}, [maxPlayers, players, styles.playerWrapper, finalPlayerRef]);

	return (
		<div className={styles.lobbyPage}>
			<div className={styles.lobbyInfo}>
				{startingAtMs && (
					<Countdown
						countdownToSeconds={startingAtMs / 1000}
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
