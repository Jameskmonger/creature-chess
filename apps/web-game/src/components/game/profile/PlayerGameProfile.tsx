import * as React from "react";

import { getXpToNextLevel } from "@creature-chess/models";
import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { Button } from "~/components/ui";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { CoinIcon } from "~/components/ui/icon/CoinIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { useGamemodeSettings } from "~/game/sessionContext";
import { useGameActions } from "~/networking";
import { Region } from "~/plugins";
import { useLocalPlayer } from "~/store/game/players";

import { MAX_LEVEL } from "@creature-chess/models";

import { ProgressBar } from "../../ui/progressBar";

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
	coinIcon: {
		color: "#ddc160",
	},
});

const renderProgressBar = (current: number, max: number) =>
	`${current} / ${max} xp`;

export function PlayerGameProfile() {
	const styles = useStyles();
	const { buyXpAmount, buyXpCost } = useGamemodeSettings();

	const gameActions = useGameActions();

	const localPlayer = useLocalPlayer();

	if (!localPlayer) {
		return null;
	}

	const { level, xp, money } = localPlayer;

	return (
		<Region cls="player-profile-bar" ctx={{ level, xp, money }}>
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
						<Button
							onClick={gameActions.buyXp}
							disabled={money < buyXpCost}
							color="secondary"
							size="small"
						>
							+{buyXpAmount} xp ({buyXpCost} <CoinIcon />)
						</Button>
					)}
				</div>

				<div className={classNames(styles.column, styles.right)}>
					<div className={classNames(styles.item, styles.level)}>
						<LevelIcon amount={level} />
						<BalanceIcon amount={money} />
					</div>
				</div>
			</div>
		</Region>
	);
}
