import * as React from "react";

import { createUseStyles } from "react-jss";

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

const CreatureImage: React.FunctionComponent<Props> = ({
	baseUrl = "",
	facing,
	definitionId,
}) => (
	<img
		className={useStyles().image}
		src={`${baseUrl}/images/${facing || "front"}/${definitionId}.png`}
	/>
);

export { CreatureImage };
