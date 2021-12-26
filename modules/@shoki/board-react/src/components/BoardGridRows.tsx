import React from "react";
import { createUseStyles } from "react-jss";
import { useBoardState } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";

type BoardGridRowsProps = {
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
};

const useStyles = createUseStyles<string, { width: number; height: number }>({
	tileRow: props => ({
		width: "100%",
		height: `${(100 / props.height).toFixed(2)}%`,
		boxSizing: "border-box",
		lineHeight: "0",
		whiteSpace: "nowrap",
	}),
});

export const BoardGridRows: React.FunctionComponent<BoardGridRowsProps> = ({ onDropItem, onClickTile }) => {
	const { locked, piecePositions, size: { width, height } } = useBoardState();
	const styles = useStyles({ width, height });

	const rows = [];

	for (let y = 0; y < height; y++) {
		const tiles = [];

		for (let x = 0; x < width; x++) {
			const piecePositionKey = `${x},${y}`;

			const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);
			const canDropPiece = (!tileContainsPiece && !locked);

			tiles.push(
				canDropPiece
					? <DroppableTile key={`tile-${x}`} x={x} y={y} onDrop={onDropItem} onClick={onClickTile} />
					: <UndroppableTile key={`tile-${x}`} x={x} y={y} />
			);
		}

		rows.push(<div key={`row-${y}`} className={styles.tileRow}>{tiles}</div>);
	}

	return <>{rows}</>;
};
