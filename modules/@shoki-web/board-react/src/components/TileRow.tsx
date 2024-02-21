import * as React from "react";

import { createUseStyles } from "react-jss";

import { useBoardState } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { DroppableTile } from "./tile/DroppableTile";
import { UndroppableTile } from "./tile/UndroppableTile";

type TileRowProps = {
	y: number;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
	tileSizePx: number;
};

const useStyles = createUseStyles({
	tileRow: {
		boxSizing: "border-box",
		lineHeight: "0",
		whiteSpace: "nowrap",
	},
});

export function TileRow({
	y,
	tileSizePx,
	onDropItem,
	onClickTile,
}: TileRowProps) {
	const {
		locked,
		piecePositions,
		size: { width },
	} = useBoardState();

	const styles = useStyles();

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
					tileSizePx={tileSizePx}
					onDrop={onDropItem}
					onClick={onClickTile}
				/>
			) : (
				<UndroppableTile
					key={`tile-${x}`}
					x={x}
					y={y}
					tileSizePx={tileSizePx}
				/>
			)
		);
	}

	return (
		<div
			className={styles.tileRow}
			style={{
				width: `${width * tileSizePx}px`,
			}}
		>
			{tiles}
		</div>
	);
}
