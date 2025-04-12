import React, { useRef } from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { useTileBackgroundRenderer } from "../../context";
import { ClickBoardTileEvent } from "../../events";

type TileProps = {
	x: number;
	y: number;
	tileSizePx: number;
	onClick?: (event: ClickBoardTileEvent) => void;
	children?: React.ReactNode;
};

const useStyles = createUseStyles({
	tile: {
		position: "relative",
		display: "inline-block",
		boxSizing: "border-box",
		userSelect: "none",
	},
});

export const Tile = React.forwardRef<any, TileProps>(
	({ x, y, tileSizePx, children, onClick }, ref) => {
		const styles = useStyles();
		const tileBackgroundRenderer = useTileBackgroundRenderer();

		const handleClick = onClick ? () => onClick({ x, y }) : undefined;

		const className = classNames(styles.tile, "tile");

		return (
			<div
				ref={ref}
				className={className}
				touch-action="none"
				onPointerUp={handleClick}
				style={{
					width: `${tileSizePx}px`,
					height: `${tileSizePx}px`,
				}}
			>
				{tileBackgroundRenderer && tileBackgroundRenderer({ x, y })}
				{children}
			</div>
		);
	}
);
