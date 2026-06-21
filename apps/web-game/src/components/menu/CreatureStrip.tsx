import * as React from "react";

import classNames from "classnames";

import { createUseThemeStyles } from "~/useStyles";

import { CreatureImage } from "../ui/creatureImage";

const useStyles = createUseThemeStyles(() => ({
	strip: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: "0.5rem",
	},
	creature: {
		width: "48px",
		height: "48px",
	},
}));

/** Decorative row of creature sprites. */
export function CreatureStrip({
	definitionIds,
	className,
}: {
	definitionIds: readonly number[];
	className?: string;
}) {
	const classes = useStyles();

	return (
		<div className={classNames(classes.strip, className)}>
			{definitionIds.map((id) => (
				<div key={id} className={classes.creature}>
					<CreatureImage definitionId={id} facing="front" />
				</div>
			))}
		</div>
	);
}
