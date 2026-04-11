import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { packPosition } from "@creature-chess/board";

import { useTileBackgroundRenderer } from "../context";
import { ClickBoardTileEvent } from "../events";

type TileProps = {
	x: number;
	y: number;
	onClick?: (event: ClickBoardTileEvent) => void;
	className?: string;
};

const useStyles = createUseStyles({
	tile: {
		position: "relative",
		display: "inline-block",
		boxSizing: "border-box",
		userSelect: "none",
	},
});

export function Tile({ x, y, onClick, className }: TileProps) {
	const styles = useStyles();
	const tileBackgroundRenderer = useTileBackgroundRenderer();

	const handleClick = React.useCallback(() => {
		if (onClick) {
			onClick({ x, y });
		}
	}, [onClick, x, y]);

	return (
		<div
			className={classNames(styles.tile, className)}
			onPointerUp={handleClick}
		>
			{tileBackgroundRenderer && tileBackgroundRenderer(packPosition(x, y))}
		</div>
	);
}
