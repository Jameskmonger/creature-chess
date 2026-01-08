import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";
import { CoinIcon } from "./CoinIcon";

type Props = {
	amount: number;
	className?: string;
};

const useStyles = createUseStyles({
	wrapper: {
		display: "inline-flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "4px",
		letterSpacing: "2px",
		color: "#fff",
	},
});

export function BalanceIcon({ amount, className }: Props) {
	const classes = useStyles();

	return (
		<div className={classNames(classes.wrapper, className)}>
			<span>{amount}</span>
			<CoinIcon />
		</div>
	);
}
