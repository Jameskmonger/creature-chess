import classNames from "classnames";
import * as React from "react";
import { createUseThemeStyles } from "~/useStyles";

const useStyles = createUseThemeStyles(theme => ({
	card: {
		background: theme.palette.dark.neutral,
		padding: "0.5rem",
		borderRadius: "0.25rem",
	},
}));

export function MenuCard({ children, className }: React.PropsWithChildren<{ className?: string }>) {
	const classes = useStyles();

	return (
		<div className={classNames(classes.card, className)}>
			{children}
		</div>
	);
}
