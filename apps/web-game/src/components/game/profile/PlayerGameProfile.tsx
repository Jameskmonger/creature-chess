import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";
import { useGamemodeSettings } from "~/contexts/GamemodeSettingsContext";
import { AppState } from "~/store";

import {
	PlayerActions,
	getPlayerLevel,
	getPlayerMoney,
	getPlayerXp,
} from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { MAX_LEVEL } from "@creature-chess/models/config";

import { Layout } from "../../ui/layout";
import { PlayerName } from "../../ui/player";
import { ProgressBar } from "../../ui/progressBar";
import { ReadyUpButton } from "../board/overlays/controls/ReadyUpButton";

const useStyles = createUseStyles({
	profile: {
		display: "flex",
		flexDirection: "row",
		color: "#fff",
		background: "#566c86",
		fontFamily: '"Roboto", sans-serif',
		padding: "8px",
		gap: "16px",
	},
	column: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		flex: "1",
		gap: "16px",
	},
	item: {
		flex: "1",
	},
	name: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
	},
	buyXpButton: {
		width: "100%",
		height: "32px",
		boxSizing: "border-box",
		padding: "0.5em 1em",
		fontSize: "1em",
		lineHeight: "1em",
		color: "#000000",
		cursor: "pointer",
		background: "#38b764",
		border: "none",
	},
	level: {
		"flex": "1",
		"width": "100%",
		"display": "flex",
		"justifyContent": "space-evenly",
		"alignItems": "center",
		"flexDirection": "row",
		"fontWeight": "700",

		"& > span": {
			color: "#ffcd75",
		},
	},
	ready: {
		width: "100%",
		height: "32px",
	},
	xpProgress: {
		height: "32px",
		background: "#636363",
	},
	xpProgressFill: {
		background: "#ffcd75",
	},
	xpProgressContent: {
		color: "#1a1c2c",
	},
	right: {
		justifyContent: "flex-end",
	},
});

const renderProgressBar = (current: number, max: number) =>
	`${current} / ${max} xp`;

export function PlayerGameProfile() {
	const styles = useStyles();
	const { buyXpAmount, buyXpCost } = useGamemodeSettings();

	const dispatch = useDispatch();

	const playerId = useLocalPlayerId();

	const name = useSelector<AppState, string>(
		(state) => state.game.playerList.find((p) => p.id === playerId)?.name || ""
	);

	const position = useSelector<AppState, number>(
		(state) => state.game.playerList.findIndex((p) => p.id === playerId) + 1
	);

	const level = useSelector<AppState, number>((state) =>
		getPlayerLevel(state.game)
	);
	const xp = useSelector<AppState, number>((state) => getPlayerXp(state.game));
	const money = useSelector<AppState, number>((state) =>
		getPlayerMoney(state.game)
	);
	// todo reselect
	const health = useSelector<AppState, number | null>((state) => {
		const player = state.game.playerList.find((p) => p.id === playerId);

		return player?.health || null;
	});

	const onBuyXp = () => dispatch(PlayerActions.buyXpPlayerAction());

	if (health === null) {
		return null;
	}

	return (
		<div className={styles.profile}>
			<div className={styles.column}>
				<div className={styles.name}>
					<PlayerName name={name} position={position} isLocal />
				</div>
				<p className={classNames(styles.item, styles.level)}>
					Level {level} <span>${money}</span>
				</p>
				<div className={styles.ready}>
					<ReadyUpButton />
				</div>
			</div>

			<div className={classNames(styles.column, styles.right)}>
				{level !== MAX_LEVEL && (
					<ProgressBar
						className={styles.xpProgress}
						fillClassName={styles.xpProgressFill}
						contentClassName={styles.xpProgressContent}
						current={xp}
						max={getXpToNextLevel(level)}
						renderContents={renderProgressBar}
					/>
				)}

				{level !== MAX_LEVEL && (
					<button className={styles.buyXpButton} onClick={onBuyXp}>
						Buy {buyXpAmount} xp ($
						{buyXpCost})
					</button>
				)}
			</div>
		</div>
	);
}
