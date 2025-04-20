import React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { useBoardState, useTileBackgroundRenderer } from "../../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../../events";
import { DroppableTile } from "./DroppableTile";

type TileProps = {
	x: number;
	y: number;
	dragDrop: boolean;
	onClick?: (event: ClickBoardTileEvent) => void;
	onDrop?: (event: DropBoardItemEvent) => void;
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

export const Tile = React.forwardRef<any, TileProps>(
	({ x, y, dragDrop, onClick, onDrop, className }, ref) => {
		const { locked, piecePositions } = useBoardState();

		const styles = useStyles();
		const tileBackgroundRenderer = useTileBackgroundRenderer();

		const handleClick = React.useCallback(() => {
			if (onClick) {
				onClick({ x, y });
			}
		}, [onClick, x, y]);

		const canDropPiece = React.useMemo(
			() =>
				dragDrop &&
				Boolean(piecePositions[`${x},${y}`]) === false &&
				locked === false,
			[dragDrop, piecePositions, x, y, locked]
		);

		return (
			<div
				ref={ref}
				className={classNames(styles.tile, className)}
				touch-action="none"
				onPointerUp={handleClick}
			>
				{tileBackgroundRenderer && tileBackgroundRenderer({ x, y })}
				{canDropPiece && <DroppableTile x={x} y={y} onDrop={onDrop} />}
			</div>
		);
	}
);
