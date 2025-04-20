import * as React from "react";

import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import {
	PlayerActions,
	getPlayerLevel,
	getPlayerMoney,
	getPlayerXp,
} from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { MAX_LEVEL } from "@creature-chess/models/config";

import { useLocalPlayerId } from "../../../auth/context";
import { useGamemodeSettings } from "../../../contexts/GamemodeSettingsContext";
import { AppState } from "../../../store";
import { Layout } from "../../ui/layout";
import { PlayerName } from "../../ui/player";
import { ProgressBar } from "../../ui/progressBar";
import { useStyles } from "./PlayerGameProfile.styles";

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
			<div className={styles.row}>
				<Layout direction="column" className={styles.personal}>
					<p className={classNames(styles.item, styles.level)}>
						Level {level} <span>${money}</span>
					</p>

					<div className={styles.name}>
						<PlayerName name={name} position={position} isLocal />
					</div>
				</Layout>

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
			</div>

			<div className={styles.row}>
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
