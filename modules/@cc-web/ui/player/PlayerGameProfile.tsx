import * as React from "react";

import classNames from "classnames";

import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { MAX_LEVEL } from "@creature-chess/models/config";

import { useGamemodeSettings } from "../GamemodeSettingsContext";
import { Layout } from "../layout";
import { ProgressBar } from "../src/display/progressBar";
import { PlayerName } from "../src/player";
import { PlayerHealthbar } from "../src/player/healthbar";
import { useStyles } from "./PlayerGameProfile.styles";

type PlayerGameProfileProps = {
	name: string;
	position: number;
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
	name,
	position,
	health,
	level,
	xp,
	money,
	pieceCount,
	onBuyXpClick,
}) => {
	const styles = useStyles();
	const { buyXpAmount, buyXpCost } = useGamemodeSettings();

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
				<PieceCount level={level} pieceCount={pieceCount} />

				{level !== MAX_LEVEL && (
					<button className={styles.buyXpButton} onClick={onBuyXpClick}>
						Buy {buyXpAmount} xp ($
						{buyXpCost})
					</button>
				)}
			</div>

			<PlayerHealthbar health={health} />
		</div>
	);
};
