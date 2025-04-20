import React from "react";

import { faSquareCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	amount: number;
	className?: string;
	iconClassName?: string;
};

const LEVEL_COLOURS = ["#696969", "#2e762e", "#2e89ff", "#931093", "#e09429"];

const useStyles = createUseStyles<string, Props>({
	wrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: "4px",
		letterSpacing: "2px",
		fontSize: "12px",
		padding: "4px 6px",
		background: "#1d1d1d",
	},
	icon: {
		// 2 levels per colour
		color: ({ amount }) => LEVEL_COLOURS[Math.floor((amount - 1) / 2)],
	},
});

export function LevelIcon(props: Props) {
	const classes = useStyles(props);
	const { amount, className, iconClassName } = props;

	return (
		<div className={classNames(classes.wrapper, className)}>
			<span>lvl {amount}</span>
			<FontAwesomeIcon
				icon={faSquareCaretUp}
				className={classNames(classes.icon, iconClassName)}
			/>
		</div>
	);
}
