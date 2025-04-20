import * as React from "react";

import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { PlayerAvatar, Title, PlayerHealthbar } from "~/components/ui/player";
import { PositionChip } from "~/components/ui/player/PositionChip";
import { AppState } from "~/store";

import { PlayerMatchRewards } from "@creature-chess/gamemode";

import { MatchIncomeReport } from "../../MatchIncomeReport";
import { StreakIndicator } from "../../playerList";
import { BoardOverlay } from "./boardOverlay";
import { QuickChatBox } from "./quickChat/quickChatBox";

const useStyles = createUseStyles({
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
	wrapper: {
		textAlign: "center",
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		background: "#566c86",
		border: "2px solid #b13e53",

		fontFamily: '"Roboto", sans-serif',
	},
	vsHeader: {
		"borderTop": "2px solid #b13e53",
		"borderBottom": "2px solid #b13e53",
		"padding": "8px 0",

		"@media (orientation: portrait) and (max-width: 430px)": {
			padding: "2px 0",
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
		"fontFamily": '"Caveat Brush", cursive',
		"fontSize": "36px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "24px",
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
		fontFamily: '"Caveat Brush", cursive',
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
});

export function MatchRewardsOverlay() {
	const styles = useStyles();

	const opponent = useSelector((state: AppState) => {
		const id = state.game.playerInfo.opponentId;
		return state.game.playerList.find((p) => p.id === id);
	});

	const matchRewards = useSelector<AppState, PlayerMatchRewards | null>(
		(state) => state.game.playerInfo.matchRewards
	);
	const victoryOverlayShowing = useSelector<AppState, boolean>(
		(state) => state.game.ui.winnerId !== null
	);
	const spectatingPlayer = useSelector<AppState, boolean>(
		(state) => state.game.spectating.id !== null
	);

	const opponentPosition = useSelector((state: AppState) =>
		opponent ? state.game.playerList.indexOf(opponent) + 1 : null
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

	return (
		<BoardOverlay>
			<div className={styles.root}>
				<div className={styles.wrapper}>
					<div className={styles.title}>{title}</div>
					{opponent && opponentPosition && (
						<>
							<div className={styles.vsHeader}>vs.</div>
							<div className={styles.opponent}>
								<div className={styles.playerAvatar}>
									<PlayerAvatar player={opponent} />
									<QuickChatBox sendingPlayerId={opponent.id} />
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
						{!justDied && (
							<>
								{damage > 0 && (
									<div className={styles.damage}>
										<span>{damage} health lost!</span>
									</div>
								)}
								<MatchIncomeReport
									rewards={matchRewards}
									className={styles.income}
								/>
							</>
						)}
						{justDied && (
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
						)}
					</div>
				</div>
			</div>
		</BoardOverlay>
	);
}
