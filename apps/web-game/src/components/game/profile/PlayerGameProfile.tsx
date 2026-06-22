import * as React from "react";

import { getXpToNextLevel, MAX_LEVEL } from "@creature-chess/models";
import { Button } from "@creature-chess/ui";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";
import { CoinIcon } from "~/components/ui/icon/CoinIcon";
import { LevelIcon } from "~/components/ui/icon/LevelIcon";
import { useGamemodeSettings } from "~/game/sessionContext";
import { useGameActions } from "~/networking";
import { Region } from "~/plugins";
import { useLocalPlayer } from "~/store/game/players";
import { createUseThemeStyles } from "~/useStyles";

import { ProgressBar } from "../../ui/progressBar";

const useStyles = createUseThemeStyles(() => ({
	profile: {
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "center",
		"color": "#fff",
		"background": "#566c86",
		"margin": "8px",
		"padding": "8px 12px",
		"gap": "12px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			margin: "6px",
			padding: "6px 10px",
			gap: "10px",
		},
	},
	xpColumn: {
		display: "flex",
		flexDirection: "column",
		flex: "1",
		minWidth: 0,
		gap: "4px",
	},
	xpHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		fontSize: "0.8rem",
	},
	xpCount: {
		color: "#cdd7e3",
	},
	xpProgress: {
		height: "10px",
		background: "#38465e",
		borderRadius: "3px",
		overflow: "hidden",
	},
	xpProgressFill: {
		background: "#ddc160",
	},
	maxLevel: {
		flex: "1",
		textAlign: "center",
		fontWeight: 700,
	},
}));

export function PlayerGameProfile() {
	const styles = useStyles();
	const { buyXpAmount, buyXpCost } = useGamemodeSettings();

	const gameActions = useGameActions();

	const localPlayer = useLocalPlayer();

	if (!localPlayer) {
		return null;
	}

	const { level, xp, money } = localPlayer;
	const isMaxLevel = level === MAX_LEVEL;
	const canAfford = money >= buyXpCost;

	return (
		<Region cls="player-profile-bar" ctx={{ level, xp, money }}>
			<div className={styles.profile}>
				<BalanceIcon amount={money} />

				{isMaxLevel ? (
					<div className={styles.maxLevel}>
						<LevelIcon amount={level} /> Max level!
					</div>
				) : (
					<>
						<div className={styles.xpColumn}>
							<div className={styles.xpHeader}>
								<LevelIcon amount={level} />
								<span className={styles.xpCount}>
									{xp}/{getXpToNextLevel(level)} XP
								</span>
							</div>

							<ProgressBar
								className={styles.xpProgress}
								fillClassName={styles.xpProgressFill}
								current={xp}
								max={getXpToNextLevel(level)}
							/>
						</div>

						<Button
							onClick={gameActions.buyXp}
							disabled={!canAfford}
							color="secondary"
							size="small"
						>
							Buy {buyXpAmount} XP ({buyXpCost} <CoinIcon />)
						</Button>
					</>
				)}
			</div>
		</Region>
	);
}
