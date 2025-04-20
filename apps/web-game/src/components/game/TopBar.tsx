import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";

import { getPlayerMoney } from "@creature-chess/gamemode";

import { useLocalPlayerId } from "../../auth/context";
import { AppState } from "../../store";
import { BalanceIcon } from "../ui/icon/BalanceIcon";
import { PlayerHealthbar } from "../ui/player";
import { PhaseInfo } from "./phaseInfo";

const useStyles = createUseStyles({
	topBar: {
		background: "#1d1d1d",
		padding: "8px 12px",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		fontSize: "12px",
	},
	segment: {
		flex: 1,
		fontFamily: '"Roboto", sans-serif',
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

	return (
		<div className={styles.container}>
			<div className={styles.topBar}>
				<div className={classNames(styles.segment, styles.left)}>
					<span>Round {round}</span>
				</div>

				<div className={styles.segment}>
					<PhaseInfo />
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
