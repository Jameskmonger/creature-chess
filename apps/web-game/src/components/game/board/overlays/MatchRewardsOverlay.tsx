import * as React from "react";

import { PlayerMatchRewards } from "@creature-chess/models";
import { useSelector } from "react-redux";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { PlayerAvatar, Title, PlayerHealthbar } from "~/components/ui/player";
import { PositionChip } from "~/components/ui/player/PositionChip";
import { Region } from "~/plugins";
import { AppState } from "~/store";
import {
	useLocalPlayer,
	useOpponentPlayer,
	usePlayerRank,
} from "~/store/game/players";
import { createUseThemeStyles } from "~/useStyles";

import { MatchIncomeReport } from "../../MatchIncomeReport";
import { StreakIndicator } from "../../playerList";
import { BoardOverlay } from "./boardOverlay";
import { QuickChatBox, QuickChatButtonArray } from "./quickChat";

const useStyles = createUseThemeStyles((theme) => ({
	root: {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"width": "100%",
		"gap": "16px",
		"@media (orientation: portrait) and (min-width: 431px)": {
			gap: "32px",
		},
	},
	desktopOnly: {
		"display": "none",
		"padding": "0px 20px",
		"@media (orientation: portrait) and (max-width: 431px)": {
			display: "inline",
		},
	},
	wrapper: {
		textAlign: "center",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		background: "#566c86",
		border: "2px solid #b13e53",

		fontFamily: theme.typography.primary,
	},
	vsHeader: {
		"borderTop": "2px solid #b13e53",
		"borderBottom": "2px solid #b13e53",
		"padding": "8px 0",

		"@media (orientation: portrait) and (max-width: 430px)": {
			padding: "2px 0",
			display: "none",
		},

		"& > h2": {
			margin: 0,
		},
	},
	badges: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		boxSizing: "border-box",
		alignItems: "center",
	},
	cloneTag: {
		background: "#333333",
		marginLeft: "0.5em",
		padding: "0 0.5em",
		fontStyle: "italic",
	},
	healthbar: {
		margin: 0,
	},
	playerDetails: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		flex: 2,
		gap: "4px",
	},
	playerAvatar: {
		flex: 1,
	},
	opponent: {
		"display": "flex",
		"flexDirection": "row",
		"padding": "8px",
		"borderBottom": "2px solid #b13e53",

		"@media (orientation: portrait) and (max-width: 430px)": {
			padding: "4px",
		},
	},
	nameWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flexWrap: "wrap",
		gap: "8px",
	},
	playerName: {
		fontSize: "12px",
	},
	tags: {
		display: "flex",
		flexDirection: "row",
		gap: "4px",
	},
	title: {
		"textAlign": "left",
		"padding": "4px 8px",
		"fontFamily": theme.typography.accent,
		"fontSize": "36px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "16px",
		},
	},
	income: {
		flex: 3,
	},
	damage: {
		"flex": 1,
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "center",
		"alignItems": "center",

		"& > span": {
			"padding": "8px 16px",
			"fontSize": "36px",
			"fontWeight": 700,

			// todo same colours and border as the piece count warning
			"color": "#ff6464",
			"background": "#ffd2d2",
			"border": "2px solid #ff6464",

			"@media (orientation: portrait) and (max-width: 430px)": {
				padding: "2px 4px",
				fontSize: "16px",
			},
		},
	},

	outcomes: {
		background: "#30364b",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},

	deathMessage: {
		"flex": 1,
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"gap": "24px",
		"padding": "0 8px",
		"fontSize": "18px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			gap: "12px",
			fontSize: "14px",
		},
	},
	thankYou: {
		flex: 2,
	},
	jkm: {
		background: "#1d1d1d",
		fontFamily: theme.typography.accent,
		padding: "4px 8px",
		fontStyle: "italic",
	},
	spectateReminder: {
		"fontSize": "14px",
		"fontStyle": "italic",

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "10px",
		},
	},
}));

export function MatchRewardsOverlay() {
	const styles = useStyles();

	const opponent = useOpponentPlayer();
	const localPlayer = useLocalPlayer();
	const opponentPosition = usePlayerRank(opponent?.id ?? "") || null;

	const matchRewards = useSelector<AppState, PlayerMatchRewards | null>(
		(state) => state.game.localPlayer.matchRewards
	);
	const victoryOverlayShowing = useSelector<AppState, boolean>(
		(state) => state.game.ui.winnerId !== null
	);
	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	if (!matchRewards || victoryOverlayShowing || spectatingPlayer) {
		return null;
	}

	const { damage, justDied } = matchRewards;

	const title = justDied
		? "Game Over!"
		: damage > 0
			? "Match Lost!"
			: "Match Won!";

	if (justDied) {
		return (
			<BoardOverlay>
				<div className={styles.root}>
					<div className={styles.wrapper}>
						<div className={styles.title}>{title}</div>
						<div className={styles.outcomes}>
							<div className={styles.deathMessage}>
								<p>You have been knocked out of this game.</p>
								<p>
									I hope you enjoyed yourself! -{" "}
									<span className={styles.jkm}>JKM</span>
								</p>
								<p className={styles.spectateReminder}>
									Open the Player List and click a name to continue spectating.
								</p>
							</div>
						</div>
					</div>
				</div>
			</BoardOverlay>
		);
	}

	return (
		<BoardOverlay>
			<div className={styles.root}>
				<Region
					cls="overlay-content"
					id="overlay.content"
					ctx={{ localPlayerId: localPlayer?.id }}
				>
					<div className={styles.wrapper}>
						<div className={styles.title}>
							{title} <div className={styles.desktopOnly}>vs</div>
						</div>
						{opponent && opponentPosition && (
							<>
								<div className={styles.vsHeader}>vs.</div>
								<div className={styles.opponent}>
									<div className={styles.playerAvatar}>
										<Region
											cls="player-avatar"
											id="player.avatar.opponent"
											ctx={{ playerId: opponent.id }}
										>
											<PlayerAvatar player={opponent} />
										</Region>
										<QuickChatBox playerId={opponent.id} />
									</div>
									<div className={styles.playerDetails}>
										<div className={styles.nameWrapper}>
											<span className={styles.playerName}>{opponent.name}</span>
											<div className={styles.tags}>
												<PositionChip position={opponentPosition} />
											</div>
										</div>
										<Title title={opponent.profile?.title || null} />
										<PlayerHealthbar health={opponent.health} />
										<div className={styles.badges}>
											<StreakIndicator
												type={opponent.streakType}
												amount={opponent.streakAmount}
											/>
											<BalanceIcon amount={opponent.money} />
											<LevelIcon amount={opponent.level} />
										</div>
									</div>
								</div>
							</>
						)}
						<div className={styles.outcomes}>
							{damage > 0 && (
								<div className={styles.damage}>
									<span>{damage} health lost!</span>
								</div>
							)}
							<Region
								cls="match-rewards-summary"
								id="match-rewards.summary"
								ctx={{ rewards: matchRewards }}
							>
								<MatchIncomeReport
									rewards={matchRewards}
									className={styles.income}
								/>
							</Region>
						</div>
					</div>
				</Region>
				{localPlayer && (
					<QuickChatButtonArray playerId={localPlayer.id} />
				)}
			</div>
		</BoardOverlay>
	);
}
