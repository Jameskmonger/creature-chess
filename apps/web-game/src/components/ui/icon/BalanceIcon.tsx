import React from "react";

import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	className?: string;
};

const useStyles = createUseStyles({
	icon: {
		color: "#ddc160",
	},
});

export function BalanceIcon({ className }: Props) {
	const classes = useStyles();

	return (
		<FontAwesomeIcon
			icon={faCoins}
			className={classNames(classes.icon, className)}
		/>
	);
}
