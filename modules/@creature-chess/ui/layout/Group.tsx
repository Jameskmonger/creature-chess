import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
};

const SPACER = "1em";

const useStyles = createUseStyles({
	group: {
		display: "flex",
		flex: "1",
		boxSizing: "border-box",
		justifyContent: "center",
		flexDirection: "column",
	},
	"@media (orientation: portrait)": {
		group: {
			"&:not(:first-child)": {
				"margin-top": SPACER,
			},
		},
	},
	"@media (orientation: landscape)": {
		group: {
			"&:not(:first-child)": {
				"margin-left": SPACER,
			},
		},
	},
});

export function Group({ children, className }: Props) {
	const styles = useStyles();

	return <div className={classNames(styles.group, className)}>{children}</div>;
}
