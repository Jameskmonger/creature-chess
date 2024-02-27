import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

type Props = {
	children: React.ReactNode | React.ReactNode[];
	spacer?: boolean;
	className?: string;
};

const SPACER = "1em";

const useStyles = createUseStyles<string, { spacer: boolean }>({
	"group": {
		display: "flex",
		flex: "1",
		boxSizing: "border-box",
		justifyContent: "center",
		flexDirection: "column",
	},
	"@media (orientation: portrait)": {
		group: ({ spacer }) =>
			spacer
				? {
						"&:not(:first-child)": {
							"margin-top": SPACER,
						},
					}
				: undefined,
	},
	"@media (orientation: landscape)": {
		group: ({ spacer }) =>
			spacer
				? {
						"&:not(:first-child)": {
							"margin-left": SPACER,
						},
					}
				: undefined,
	},
});

export function Group({ children, className, spacer = true }: Props) {
	const styles = useStyles({ spacer });

	return <div className={classNames(styles.group, className)}>{children}</div>;
}
