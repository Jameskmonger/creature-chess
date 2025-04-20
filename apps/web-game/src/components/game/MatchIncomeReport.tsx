import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { BalanceIcon } from "~/components/ui/icon/BalanceIcon";

import { PlayerMatchRewards } from "@creature-chess/gamemode";

type Props = {
	rewards: PlayerMatchRewards;
	className?: string;
};

const useStyles = createUseStyles({
	root: {
		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",
		"gap": "8px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			gap: "4px",
		},
	},
	total: {
		"display": "flex",
		"flexDirection": "row",
		"alignItems": "center",
		"justifyContent": "center",
		"gap": "24px",
		"fontSize": "24px",

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "16px",
			gap: "16px",
		},
	},
	incomeTable: {
		"display": "grid",
		"gridTemplateColumns": "repeat(2, 1fr)",
		"gridRowGap": "4px",
		"gridColumnGap": "16px",
		"fontSize": "16px",

		"& > *:nth-child(odd)": {
			textAlign: "right",
			color: "#d4d4d4",
		},

		"@media (orientation: portrait) and (max-width: 430px)": {
			fontSize: "12px",
		},
	},
});

export function MatchIncomeReport({ rewards, className }: Props) {
	const styles = useStyles();

	const {
		rewardMoney: { total, base, winBonus, streakBonus, interest },
	} = rewards;

	return (
		<div className={classNames(styles.root, className)}>
			<div className={styles.total}>
				<BalanceIcon amount={total} />
				<span>earned</span>
			</div>
			<div className={styles.incomeTable}>
				<div>base</div>
				<div>
					<BalanceIcon amount={base} />
				</div>
				<div>win bonus</div>
				<div>
					<BalanceIcon amount={winBonus} />
				</div>
				<div>streak bonus</div>
				<div>
					<BalanceIcon amount={streakBonus} />
				</div>
				<div>interest (10%)</div>
				<div>
					<BalanceIcon amount={interest} />
				</div>
			</div>
		</div>
	);
}
