import * as React from "react";

import classNames from "classnames";

import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";

import { ProgressBar } from "../src/display/progressBar";
import { PlayerHealthbar } from "../src/player/healthbar";
import { useStyles } from "./PlayerGameProfile.styles";

type PlayerGameProfileProps = {
	level: number;
	xp: number;
	money: number;
	health: number | null;
	pieceCount: number;

	onBuyXpClick?: () => void;
};

const renderProgressBar = (current: number, max: number) =>
	`${current} / ${max} xp`;

const PieceCount: React.FC<
	Pick<PlayerGameProfileProps, "level" | "pieceCount">
> = ({ level, pieceCount }) => {
	const styles = useStyles();

	if (pieceCount < level) {
		return (
			<p
				className={classNames(
					styles.item,
					styles.pieceCount,
					styles.pieceCountWarning
				)}
			>
				{pieceCount} / {level} pieces (board not full!)
			</p>
		);
	}

	return (
		<p className={classNames(styles.item, styles.pieceCount)}>
			{pieceCount} / {level} pieces
		</p>
	);
};

export const PlayerGameProfile: React.FC<PlayerGameProfileProps> = ({
	health,
	level,
	xp,
	money,
	pieceCount,
	onBuyXpClick,
}) => {
	const styles = useStyles();

	if (health === null) {
		return null;
	}

	return (
		<div className={styles.profile}>
			<div className={styles.row}>
				<p className={classNames(styles.item, styles.level)}>
					Level {level} <span>${money}</span>
				</p>
				{level !== DEFAULT_GAME_OPTIONS.game.maxLevel && (
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
				<PieceCount level={level} pieceCount={pieceCount} />

				{level !== DEFAULT_GAME_OPTIONS.game.maxLevel && (
					<button className={styles.buyXpButton} onClick={onBuyXpClick}>
						Buy {DEFAULT_GAME_OPTIONS.game.buyXpAmount} xp ($
						{DEFAULT_GAME_OPTIONS.game.buyXpCost})
					</button>
				)}
			</div>

			<PlayerHealthbar health={health} />
		</div>
	);
};
