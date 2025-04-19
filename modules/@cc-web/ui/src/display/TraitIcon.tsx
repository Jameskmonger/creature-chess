import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { TraitId } from "@creature-chess/models/gamemode/traits";

import { IMAGE_BASE_URL } from "@cc-web/shared/constants";

interface Props {
	trait: TraitId;
	className?: string;
	label?: boolean;
}

function getIconUrl(iconName: string) {
	return `${IMAGE_BASE_URL}/ui/${iconName}`;
}

const ICON_FOR_TRAIT: Record<TraitId, string> = {
	["fire"]: getIconUrl("traits/trait-fire.svg"),
	["earth"]: getIconUrl("traits/trait-earth.svg"),
	["metal"]: getIconUrl("traits/trait-metal.svg"),
	["water"]: getIconUrl("traits/trait-water.svg"),
	["wood"]: getIconUrl("traits/trait-wood.svg"),
	["arcane"]: getIconUrl("traits/trait-arcane.svg"),
	["valiant"]: getIconUrl("traits/trait-valiant.svg"),
	["cunning"]: getIconUrl("traits/trait-cunning.svg"),
};

const useStyle = createUseStyles({
	traitIcon: {
		position: "relative",
		margin: 0,
		aspectRatio: "1/1",
		containerName: "icon",
		containerType: "size",
	},
	labelContainer: {
		"position": "absolute",

		"width": "100%",
		"display": "flex",
		"flexDirection": "row",
		"justifyContent": "center",

		"fontSize": "14px",
		"bottom": "-10px",

		"@container (max-width: 31px)": {
			display: "none",
		},

		"@container (max-width: 42px)": {
			bottom: "-8px",
			fontSize: "10px",
		},
	},
	label: {
		color: "#fff",
		background: "#1d1d1d",
		padding: "2px 8px",
	},
});

export function TraitIcon({ trait, className, label = false }: Props) {
	const classes = useStyle();

	return (
		<div className={classNames(classes.traitIcon, className)}>
			<img src={ICON_FOR_TRAIT[trait]} alt={`${trait} trait`} />
			{label && (
				<div className={classes.labelContainer}>
					<span className={classes.label}>{trait}</span>
				</div>
			)}
		</div>
	);
}
