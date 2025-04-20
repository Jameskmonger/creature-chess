import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useLocalPlayerId } from "~/auth/context";
import { AppState } from "~/store";

import { getPlayerMoney } from "@creature-chess/gamemode";

import { BalanceIcon } from "../ui/icon/BalanceIcon";
import { PlayerHealthbar } from "../ui/player";
import { PositionChip } from "../ui/player/PositionChip";
import { PhaseInfo } from "./phaseInfo";

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
		flex: 1,
		color: "#fff",
		textAlign: "center",
		textTransform: "uppercase",
	},
	left: {
		textAlign: "left",
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
});

export function TopBar() {
	const styles = useStyles();

	const playerId = useLocalPlayerId();

	const round = useSelector<AppState, number | null>(
		(state) => state.game.roundInfo.round
	);
	const money = useSelector<AppState, number>((state) =>
		getPlayerMoney(state.game)
	);

	// todo reselect
	const health = useSelector<AppState, number>((state) => {
		const player = state.game.playerList.find((p) => p.id === playerId);

		return player?.health ?? 0;
	});

	const name = useSelector<AppState, string>(
		(state) => state.game.playerList.find((p) => p.id === playerId)?.name || ""
	);

	const position = useSelector<AppState, number>(
		(state) => state.game.playerList.findIndex((p) => p.id === playerId) + 1
	);

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<div className={classNames(styles.segment, styles.left)}>
					<span>Round {round}</span>
				</div>

				<div className={styles.segment}>
					<PhaseInfo />
				</div>

				<div className={classNames(styles.segment, styles.name)}>
					<PositionChip position={position} />
					<span>{name}</span>
				</div>

				<div className={classNames(styles.segment, styles.right)}>
					<span>{money}</span>
					<BalanceIcon />
				</div>
			</div>
			<PlayerHealthbar health={health} />
		</div>
	);
}
