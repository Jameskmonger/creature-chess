import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { getCreatureImageUrl } from "~/networking/creatureDefinitions";

interface Props {
	definitionId: number;
	facing?: "front" | "back";
	className?: string;
}

const useStyles = createUseStyles({
	image: {
		width: "100%",
		height: "100%",
		imageRendering: "pixelated",
		fallbacks: [
			{
				imageRendering: "optimize-contrast",
			},
			{
				imageRendering: "-webkit-optimize-contrast",
			},
			{
				imageRendering: "-o-crisp-edges",
			},
			{
				imageRendering: "-moz-crisp-edges",
			},
			{
				imageRendering: "optimizeSpeed",
			},
		] as any,
		msInterpolationMode: "nearest-neighbor",
	},
});

export function CreatureImage({ facing, definitionId, className }: Props) {
	const classes = useStyles();
	const src = getCreatureImageUrl(definitionId, facing || "front");
	if (!src) {
		return null;
	}
	return <img className={classNames(classes.image, className)} src={src} />;
}
