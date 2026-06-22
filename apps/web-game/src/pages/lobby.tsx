import * as React from "react";

import { faPlay, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useSelector } from "react-redux";
import {
	AccountPill,
	MenuHeaderBar,
	MenuPlayButton,
} from "@creature-chess/ui";
import { PageBoardBackground } from "~/components/PageBackground";
import { LobbyPlayerBanner } from "~/components/lobby/LobbyPlayerBanner";
import { Countdown } from "~/components/ui/countdown";
import { useLobbyConnection } from "~/networking";
import { Region } from "~/plugins";
import { AppState } from "~/store";
import { createUseThemeStyles } from "~/useStyles";

const padNumberToTwo = (val: number) => (val < 10 ? `0${val}` : val.toString());

const renderTime = (totalSecondsRemaining: number) => {
	const minutesRemaining = Math.floor(totalSecondsRemaining / 60);
	const secondsRemaining = Math.ceil(totalSecondsRemaining % 60);

	return <>{`${minutesRemaining}:${padNumberToTwo(secondsRemaining)}`}</>;
};

const useStyles = createUseThemeStyles((theme) => ({
	root: {
		position: "relative",
		overflow: "hidden",
		width: "100%",
		height: "100%",
		boxSizing: "border-box",
		containerName: "lobby",
		containerType: "inline-size",
	},
	foreground: {
		position: "absolute",
		inset: 0,
		boxSizing: "border-box",
		display: "flex",
		flexDirection: "column",
		gap: "0.5rem",
		padding: "0.5rem",
	},
	scroll: {
		flex: 1,
		minHeight: 0,
		overflowY: "auto",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	card: {
		display: "flex",
		flexDirection: "column",
		gap: "clamp(0.85rem, 4vw, 1.25rem)",
		width: "100%",
		maxWidth: "520px",
		margin: "0 auto",
		padding: "clamp(0.85rem, 4vw, 1.25rem)",
		boxSizing: "border-box",
		background: theme.palette.surface,
		borderRadius: "0.9rem",
	},
	status: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: "0.1rem",
		textAlign: "center",
		fontFamily: theme.typography.primary,
		color: theme.palette.light.neutral,
	},
	statusLabel: {
		color: theme.palette.muted,
		fontSize: "0.9rem",
		textTransform: "uppercase",
		letterSpacing: "0.08em",
	},
	statusValue: {
		fontWeight: 700,
		lineHeight: 1,
		fontSize: "clamp(2.4rem, 13vw, 3.25rem)",
		color: theme.palette.accent.neutral,
	},
	statusValueIdle: {
		color: theme.palette.light.neutral,
		fontSize: "clamp(1.6rem, 8vw, 2.25rem)",
	},
	players: {
		"display": "grid",
		"gridTemplateColumns": "repeat(2, minmax(0, 1fr))",
		"gap": "clamp(0.4rem, 2.5vw, 0.7rem)",

		"@media (orientation: landscape)": {
			gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
		},
	},
	footer: {
		width: "100%",
		maxWidth: "520px",
		margin: "0 auto",
	},
	startButton: {
		width: "100%",
	},
}));

function PlayerCountPill({ filled, total }: { filled: number; total: number }) {
	return (
		<AccountPill
			name={`${filled} / ${total}`}
			icon={<FontAwesomeIcon icon={faUsers} />}
		/>
	);
}

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
				<Region
					key={player ? player.id : i}
					cls="lobby-player-slot"
					id={`lobby.slot.${i}`}
					ctx={{ slotIndex: i, player }}
				>
					<LobbyPlayerBanner player={player} />
				</Region>
			);
		}

		return output;
	}, [lobbyInfo]);

	if (!lobbyInfo) {
		return null;
	}

	const { startTimestamp, maxPlayers } = lobbyInfo;
	const filledCount = lobbyInfo.players.filter(Boolean).length;

	return (
		<div className={styles.root}>
			<PageBoardBackground />

			<div className={styles.foreground}>
				<MenuHeaderBar
					brand={
						<img
							src={`${APP_IMAGE_ROOT}/ui/logo.png`}
							alt="Creature Chess"
						/>
					}
					account={
						<PlayerCountPill filled={filledCount} total={maxPlayers} />
					}
				/>

				<div className={styles.scroll}>
					<div className={styles.card}>
						<div className={styles.status}>
							{startTimestamp ? (
								<>
									<span className={styles.statusLabel}>
										Game starting in
									</span>
									<span className={styles.statusValue}>
										<Countdown
											countdownToSeconds={startTimestamp / 1000}
											render={renderTime}
										/>
									</span>
								</>
							) : (
								<>
									<span className={classNames(styles.statusValue, styles.statusValueIdle)}>
										Waiting for players
									</span>
									<span className={styles.statusLabel}>
										The match begins once the lobby fills
									</span>
								</>
							)}
						</div>

						<div className={styles.players}>{playerItems}</div>
					</div>
				</div>

				<div className={styles.footer}>
					<MenuPlayButton
						className={styles.startButton}
						icon={<FontAwesomeIcon icon={faPlay} />}
						title="Start now"
						subtitle="Skip the countdown and begin"
						onClick={onStartNow}
					/>
				</div>
			</div>
		</div>
	);
}
