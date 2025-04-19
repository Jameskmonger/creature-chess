import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { IMAGE_BASE_URL } from "@creature-chess-app/web-game/src/constants";

interface Props {
	baseUrl?: string;
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

function getCreatureUrl(facing: "front" | "back", definitionId: number) {
	return `${IMAGE_BASE_URL}/creatures/${facing}/${definitionId}.png`;
}

export function CreatureImage({ facing, definitionId, className }: Props) {
	return (
		<img
			className={classNames(useStyles().image, className)}
			src={getCreatureUrl(facing || "front", definitionId)}
		/>
	);
}
