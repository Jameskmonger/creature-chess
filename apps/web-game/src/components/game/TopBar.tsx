import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useSetting } from "~/settings";
import { AppState } from "~/store";
import { useLocalPlayer, usePlayerRank } from "~/store/game/players";

import { BalanceIcon } from "../ui/icon/BalanceIcon";
import { LevelIcon } from "../ui/icon/LevelIcon";
import { PlayerHealthbar } from "../ui/player";
import { PositionChip } from "../ui/player/PositionChip";
import { DebugBar } from "./DebugBar";
import { PhaseTimer } from "./PhaseTimer";

const useStyles = createUseStyles({
	topBar: {
		"background": "#1d1d1d",
		"padding": "8px 12px",
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "space-between",
		"alignItems": "center",
		"fontSize": "12px",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "10px",
		},
	},
	segment: {
		color: "#fff",
		textAlign: "center",
		textTransform: "uppercase",
	},
	left: {
		"textAlign": "left",

		// dirty
		"& > span:not(:last-child)": {
			"marginRight": "8px",

			"@media (orientation: portrait) and (max-width: 400px)": {
				marginRight: "4px",
			},
		},
	},
	right: {
		display: "flex",
		gap: "8px",
		flexDirection: "row",
		justifyContent: "end",
		fontSize: "16px",
	},
	container: {
		display: "flex",
		flexDirection: "column",
	},
	name: {
		"display": "flex",
		"flexDirection": "row",
		"gap": "8px",
		"alignItems": "center",
		"justifyContent": "center",

		"@media (orientation: portrait) and (max-width: 400px)": {
			gap: "4px",
		},
	},
	levelIcon: {
		"letterSpacing": 0,
		"background": "#333",

		"@media (orientation: portrait) and (max-width: 400px)": {
			fontSize: "10px",
		},
	},
});

export function TopBar() {
	const styles = useStyles();
	const showPing = useSetting("showPing");

	const localPlayer = useLocalPlayer();
	const position = usePlayerRank(localPlayer?.id ?? "");

	const round = useSelector<AppState, number | null>(
		(state) => state.game.roundInfo.round
	);

	const health = localPlayer?.health ?? 0;
	const money = localPlayer?.money ?? 0;
	const level = localPlayer?.level ?? 0;
	const name = localPlayer?.name ?? "";

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<div className={classNames(styles.segment, styles.left)}>
					<span>Rnd {round}</span>
					<PhaseTimer />
				</div>

				<PositionChip position={position} />

				<div className={classNames(styles.segment, styles.name)}>
					<span>{name}</span>
				</div>

				<LevelIcon amount={level} className={styles.levelIcon} />

				<div className={classNames(styles.segment, styles.right)}>
					<BalanceIcon amount={money} />
				</div>
			</div>
			<PlayerHealthbar health={health} />
			{showPing && <DebugBar />}
		</div>
	);
}
