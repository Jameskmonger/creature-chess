import * as React from "react";

import { createUseStyles } from "react-jss";

import { useBoardState } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { DroppableTile } from "./tile/DroppableTile";
import { Tile } from "./tile/Tile";
import { UndroppableTile } from "./tile/UndroppableTile";

type TileRowProps = {
	y: number;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
	tileSizePx: number;
	dragDrop: boolean;
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
	dragDrop,
	onDropItem,
	onClickTile,
}: TileRowProps) {
	const {
		locked,
		piecePositions,
		size: { width },
	} = useBoardState();

	const styles = useStyles();

	const tiles: React.ReactNode[] = [];

	for (let x = 0; x < width; x++) {
		const piecePositionKey = `${x},${y}`;

		const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);
		const canDropPiece = dragDrop && !tileContainsPiece && !locked;

		tiles.push(
			<Tile key={`tile-${x}`} x={x} y={y} tileSizePx={tileSizePx}>
				{canDropPiece ? (
					<DroppableTile
						x={x}
						y={y}
						onDrop={onDropItem}
						onClick={onClickTile}
					/>
				) : (
					<UndroppableTile />
				)}
			</Tile>
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
