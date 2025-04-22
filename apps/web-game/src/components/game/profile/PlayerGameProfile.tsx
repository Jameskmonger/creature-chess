import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useDispatch, useSelector } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
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

import { ProgressBar } from "../../ui/progressBar";
import {
	COLOR_READY_BUTTON,
	COLOR_READY_BUTTON_TEXT,
} from "../board/overlays/controls/colors";

const useStyles = createUseStyles({
	profile: {
		"display": "flex",
		"flexDirection": "row",
		"color": "#fff",
		"background": "#566c86",
		"padding": "8px",
		"gap": "16px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "8px",
		},
	},
	column: {
		"display": "flex",
		"flexDirection": "column",
		"alignItems": "center",
		"flex": "1",
		"gap": "16px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "8px",
		},
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
		"width": "100%",
		"height": "32px",
		"boxSizing": "border-box",
		"lineHeight": "1em",
		"cursor": "pointer",
		"border": "none",

		"&:disabled": {
			background: "#636363",
			cursor: "not-allowed",
		},

		"background": COLOR_READY_BUTTON,
		"color": COLOR_READY_BUTTON_TEXT,
		"box-sizing": "border-box",

		"fontSize": "16px",
		"fontWeight": "700",
		"padding": "8px 8px",
		"letterSpacing": "2px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "12px",
			padding: "4px",
			letterSpacing: "1px",
		},
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
	xpProgress: {
		"height": "32px",
		"background": "#636363",

		"@media (orientation: portrait) and (max-width: 400px)": {
			height: "28px",
		},
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
				{level === MAX_LEVEL && <div>You are max level!</div>}

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
					<button
						className={styles.buyXpButton}
						onClick={onBuyXp}
						disabled={money < buyXpCost}
					>
						Buy {buyXpAmount} xp ($
						{buyXpCost})
					</button>
				)}
			</div>

			<div className={classNames(styles.column, styles.right)}>
				<div className={classNames(styles.item, styles.level)}>
					<LevelIcon amount={level} />
					<BalanceIcon amount={money} />
				</div>
			</div>
		</div>
	);
}
