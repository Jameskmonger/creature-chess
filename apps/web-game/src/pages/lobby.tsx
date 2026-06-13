import * as React from "react";

import { useSelector } from "react-redux";
import { Page } from "~/components/Page";
import { LobbyPlayerBanner } from "~/components/lobby/LobbyPlayerBanner";
import { Button } from "@creature-chess/ui";
import { Countdown } from "~/components/ui/countdown";
import { useLobbyConnection } from "~/networking";
import { Region } from "~/plugins";
import { AppState } from "~/store";
import { createUseThemeStyles } from "~/useStyles";

const padNumberToTwo = (val: number) => (val < 10 ? `0${val}` : val.toString());

const countdownRender = (styles: ReturnType<typeof useStyles>) =>
	function (totalSecondsRemaining: number) {
		const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
		const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

		const time = `${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`;

		return (
			<>
				Starting in{" "}
				<span className={styles.timeRemainingHighlight}>{time}</span>
			</>
		);
	};

const useStyles = createUseThemeStyles((theme) => ({
	lobbyInfo: {
		flex: 1,

		display: "flex",
		flexDirection: "column",
		textAlign: "center",
		fontFamily: theme.typography.primary,
		color: "#fff",
		width: "100%",

		gap: "8px",
		marginBottom: "8px",
	},
	topBar: {
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "center",
		"background": "#333",
		"padding": "8px",

		"& > div": {
			flex: 1,
		},
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
}));

export function LobbyPage() {
	const styles = useStyles();
	const lobbyInfo = useSelector((state: AppState) => state.lobby);

	const lobbyConnection = useLobbyConnection();

	const onStartNow = React.useCallback(() => {
		lobbyConnection?.sendStartNow();
	}, [lobbyConnection]);

	const playerItems = React.useMemo(() => {
		if (!lobbyInfo) {
			return [];
		}

		const output: React.ReactNode[] = [];

		for (let i = 0; i < lobbyInfo.maxPlayers; i++) {
			const player = lobbyInfo.players[i] ?? null;

			output.push(
				<div key={player ? player.id : i} className={styles.playerWrapper}>
					<Region
						cls="lobby-player-slot"
						id={`lobby.slot.${i}`}
						ctx={{ slotIndex: i, player }}
					>
						<LobbyPlayerBanner player={player} />
					</Region>
				</div>
			);
		}

		return output;
	}, [lobbyInfo, styles.playerWrapper]);

	if (!lobbyInfo) {
		return null;
	}

	const { startTimestamp } = lobbyInfo;

	return (
		<Page hasBackground>
			<div className={styles.lobbyInfo}>
				<div className={styles.topBar}>
					<div>
						{startTimestamp && (
							<Countdown
								countdownToSeconds={startTimestamp / 1000}
								render={countdownRender(styles)}
							/>
						)}
					</div>
					<div>
						<Button color="primary" size="medium" onClick={onStartNow}>
							Start Now
						</Button>
					</div>
				</div>

				<div className={styles.players}>{playerItems}</div>
			</div>
		</Page>
	);
}
