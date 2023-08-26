import * as React from "react";

import { createUseStyles } from "react-jss";

import { useBoardState, useScaleMode } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { useElementSize } from "../useElementSize";
import { DroppableTile } from "./tile/DroppableTile";
import { UndroppableTile } from "./tile/UndroppableTile";

type TileRowProps = {
	y: number;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
};

const useStyles = createUseStyles<string, { height: string; width: string }>({
	tileRow: ({ height, width }) => ({
		width,
		height,
		boxSizing: "border-box",
		lineHeight: "0",
		whiteSpace: "nowrap",
	}),
});

function useResponsiveStyles() {
	const {
		size: { width, height },
	} = useBoardState();
	const scaleMode = useScaleMode();

	const { ref, size } = useElementSize();

	const styleHeight =
		scaleMode === "width"
			? `${size.width / width}px`
			: `${(100 / height).toFixed(2)}%`;

	const styleWidth =
		scaleMode === "width" ? "100%" : `${size.height * width}px`;

	const styles = useStyles({ height: styleHeight, width: styleWidth });

	return {
		styles,
		ref,
	};
}

export function TileRow({ y, onDropItem, onClickTile }: TileRowProps) {
	const {
		locked,
		piecePositions,
		size: { width },
	} = useBoardState();

	const { styles, ref } = useResponsiveStyles();

	const tiles = [];

	for (let x = 0; x < width; x++) {
		const piecePositionKey = `${x},${y}`;

		const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);
		const canDropPiece = !tileContainsPiece && !locked;

		tiles.push(
			canDropPiece ? (
				<DroppableTile
					key={`tile-${x}`}
					x={x}
					y={y}
					onDrop={onDropItem}
					onClick={onClickTile}
				/>
			) : (
				<UndroppableTile key={`tile-${x}`} x={x} y={y} />
			)
		);
	}

	return (
		<div className={styles.tileRow} ref={ref}>
			{tiles}
		</div>
	);
}
