import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "../styles";

const useStyles = createUseThemeStyles((theme) => ({
	panel: {
		background: theme.palette.dark.neutral,
		padding: "0.5rem",
		borderRadius: "0.25rem",
	},
}));

export function Panel({
	children,
	className,
}: React.PropsWithChildren<{ className?: string }>) {
	const classes = useStyles();

	return <div className={classNames(classes.panel, className)}>{children}</div>;
}
