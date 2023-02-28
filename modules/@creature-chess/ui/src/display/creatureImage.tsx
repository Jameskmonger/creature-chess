import * as React from "react";

import { createUseStyles } from "react-jss";

import { APP_BASE_URL } from "@creature-chess/models";

interface Props {
	baseUrl?: string;
	definitionId: number;
	facing?: "front" | "back";
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

export function CreatureImage({ facing, definitionId }: Props) {
	// TODO these shouldn't come from /game/ server
	return (
		<img
			className={useStyles().image}
			src={`${APP_BASE_URL}game/images/${
				facing || "front"
			}/${definitionId}.png`}
		/>
	);
}
