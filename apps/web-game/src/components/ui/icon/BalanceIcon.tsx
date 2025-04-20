import React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	amount: number;
	className?: string;
	iconClassName?: string;
};

const useStyles = createUseStyles({
	wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "4px",
		letterSpacing: "2px",
		color: "#fff",
	},
	icon: {
		color: "#ddc160",
	},
});

export function BalanceIcon({ amount, className, iconClassName }: Props) {
	const classes = useStyles();

	return (
		<div className={classNames(classes.wrapper, className)}>
			<span>{amount}</span>
			<FontAwesomeIcon
				icon={faCoins}
				className={classNames(classes.icon, iconClassName)}
			/>
		</div>
	);
}
