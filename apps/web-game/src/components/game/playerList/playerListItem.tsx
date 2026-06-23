import * as React from "react";
import { useState, useRef } from "react";

import { Button } from "@creature-chess/ui";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { PositionChip } from "~/components/ui/player/PositionChip";
import { createUseThemeStyles } from "~/useStyles";

import { PlayerBattleStatus, PlayerListPlayer } from "@creature-chess/models";

import { useOnClickOutside } from "../../../hooks/useOnClickOutside";
import { PlayerAvatar, PlayerHealthbar, Title } from "../../ui/player";
import { StreakIndicator } from "./streakIndicator";

interface Props {
	index: number;
	player: PlayerListPlayer;

	isOpponent: boolean;
	isLocal: boolean;

	onSpectateClick: () => void;

	opponentName?: string;
	currentlySpectating?: boolean;
	showReadyIndicator?: boolean;
}

function getBattleWin(battle: PlayerListPlayer["battle"]) {
	if (!battle) {
		return false;
	}

	if (battle.status !== PlayerBattleStatus.FINISHED) {
		return false;
	}

	const { isHomePlayer, homeScore, awayScore } = battle;
	return isHomePlayer ? homeScore > awayScore : awayScore > homeScore;
}

const useStyles = createUseThemeStyles<string, Props>((theme) => ({
	container: {
		containerName: "player-list-item",
		containerType: "inline-size",
		display: "flex",
		alignItems: "center",
		gap: "6px",
		background: "#343c4e",
		padding: "6px 8px 6px 6px",
		borderStyle: "solid",
		borderRadius: "10px",
		borderColor({ isLocal, isOpponent, currentlySpectating }) {
			return isLocal
				? "#ec5d6e"
				: (
					isOpponent
					? "#f0a23a"
					: (
						currentlySpectating
						? "#4ee1eb"
						: "rgba(255, 255, 255, 0.05)"
					)
				);
		},
		borderWidth({ isLocal, isOpponent, currentlySpectating }) {
			return (isLocal || isOpponent || currentlySpectating) ? "2px" : "1px";
		},
		borderLeftWidth({ isLocal, isOpponent, currentlySpectating }) {
			return (isLocal || isOpponent || currentlySpectating)  ? "4px" : "1px";
		},
		boxShadow({ isOpponent }) {
			return isOpponent ? "0 0 0 1px rgba(240,162,58,.25),0 0 12px rgba(240,162,58,.16)" : "none";
		},
	},
	avatar: {
		"width": "38px",
		"height": "38px",

		"@container player-list-item (min-width: 360px)": {
			width: "48px",
			height: "48px",
		},
	},
	readyIndicator: {
		width: "5px",
		// would be nice to use height: "100%" here, but it doesn't work with flexbox
		height: "38px",
		borderRadius: "3px",
		background ({ player: { ready }, showReadyIndicator = false }) {
			return (ready && showReadyIndicator ? "#46c45a" : "#495267");
		},
		boxShadow ({ player: { ready }, showReadyIndicator = false }) {
			return (ready && showReadyIndicator ? "0 0 6px rgba(70,196,90,.55)" : "none");
		}
	},
	details: {
		"flex": 1,
		"display": "flex",
		"flexDirection": "column",

		// tighten up the gap if the player has a title. also, increase the gap for larger screens
		gap({ player }) {
			if (player.profile?.title) {
				return "2px";
			}

			return "4px";
		},
		"@container player-list-item (min-width: 360px)": {
			gap({ player }) {
				if (player.profile?.title) {
					return "2px";
				}

				return "8px";
			},
		},

		"& > div": {
			display: "flex",
			alignItems: "center",
			gap: "6px",
			height: "1em",
		},
	},
	name: {
		"flex": 3,
		"color": theme.palette.light.neutral,
		"fontSize": "16px",

		"@container player-list-item (min-width: 360px)": {
			fontSize: "18px",
		},
	},
	healthbar: {
		flex: 2,
	},
	titleContainer: {
		marginTop: "-2px",
	},
	stats: {
		"display": "flex",
		"alignItems": "center",
		"flexShrink": 0,
		"gap": "6px",

		"& > div": {
			display: "flex",
		},
	},
	battle: {
		"flex": 1,
		"display": "flex",
		"justifyContent": "flex-end",
		"alignItems": "center",

		"& > span": {
			"fontSize": "12px",
			color ({ player: { battle }}) {
				if (!battle) {
					return "#ccc";
				}

				if (battle.status === PlayerBattleStatus.IN_PROGRESS) {
					return "#ffcd74";
				}

				return getBattleWin(battle) ? "#38b764" : "#b13e53";
			},
			"display": "flex",
			"alignItems": "center",
			"gap": "2px",
			"background": "rgb(51, 51, 51)",
			"padding": "2px 4px",

			"@container player-list-item (min-width: 360px)": {
				fontSize: "16px",
			}
		},
	},
	position: {
		fontSize: "10px",
	},
	levelIcon: {
		"gap": "2px",
		"padding": "2px 4px",
		"fontSize": "12px",

		"@container player-list-item (min-width: 360px)": {
			fontSize: "14px",
		},
	},
	balanceIcon: {
		"gap": "2px",
		"letterSpacing": "1px",
		"fontSize": "12px",

		"@container player-list-item (min-width: 360px)": {
			fontSize: "14px",
		},
	},
	streakIndicator: {
		"width": "16px",

		"@container player-list-item (min-width: 360px)": {
			width: "18px",
		},

		"boxShadow": "none",
	}
}));

function BattleText({ battle, opponentName }: { battle: PlayerListPlayer["battle"]; opponentName?: string }) {
	if (!battle) {
		return null;
	}

	if (battle.status === PlayerBattleStatus.IN_PROGRESS) {
		return (
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11l5 0" />
					<path d="M5 13l6 6" />
					<path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" />
					<path d="M10 5.5l-2 -2.5h-5v5l3 2.5" />
				</svg>
				{opponentName}
			</span>
		);
	}

	if (battle.status === PlayerBattleStatus.FINISHED) {
		const win = getBattleWin(battle);

		return (
			<span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					{
						win
						? (
							<>
								<path d="M17 7l-10 10" />
								<path d="M8 7l9 0l0 9" />
							</>
						) : (
							<>
								<path d="M7 7l10 10" />
								<path d="M17 8l0 9l-9 0" />
							</>
						)
					}
				</svg>
				{opponentName} ({battle.homeScore} - {battle.awayScore})
			</span>
		);
	}

	return null;
}

function PlayerListItem(props: Props) {
	const styles = useStyles(props);

	const {
		index,
		player,
		opponentName,
		isLocal,
		onSpectateClick,
		currentlySpectating = false,
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	useOnClickOutside(ref, () => setIsExpanded(false));

	const toggleExpanded = () => {
		// don't open for local player
		if (isLocal) {
			return;
		}

		setIsExpanded(!isExpanded);
	};

	return (
		<div className={styles.container} onClick={toggleExpanded} ref={ref}>
			<PositionChip position={index + 1} className={styles.position} />
			<PlayerAvatar player={player} className={styles.avatar} />
			<div className={styles.readyIndicator} />
			<div className={styles.details}>
				<div>
					<div className={styles.name}>
						<span>{player.name}</span>
					</div>
					<div className={styles.healthbar}>
						<PlayerHealthbar health={player.health} />
					</div>
				</div>
				{
					player.profile?.title && (
						<div className={styles.titleContainer}>
							<Title title={player.profile?.title || null} />
						</div>
					)
				}
				<div>
					<div className={styles.stats}>
						<div>
							<BalanceIcon amount={player.money} className={styles.balanceIcon} />
						</div>
						<div>
							<LevelIcon amount={player.level} className={styles.levelIcon} label={false} />
						</div>
						{
							player.streakType !== null
							&& player.streakAmount !== null
							&& player.streakAmount > 1
							&& (
								<div>
									<StreakIndicator
										type={player.streakType}
										amount={player.streakAmount}
										className={styles.streakIndicator}
									/>
								</div>
							)
						}
					</div>
					<div className={styles.battle}>
						{
							(currentlySpectating || isExpanded)
							? (
								<Button color="primary" size="xsmall" onClick={onSpectateClick}>
									{currentlySpectating ? "Stop Spectating" : "Spectate"}
								</Button>
							)
							: <BattleText battle={player.battle} opponentName={opponentName} />
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export { PlayerListItem };
