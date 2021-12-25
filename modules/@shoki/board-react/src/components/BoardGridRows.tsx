import React from "react";
import { HasId } from "@shoki/board";
import { useBoard } from "../context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";
import { createUseStyles } from "react-jss";

type BoardGridRowsProps = {
	onDrop?: <TPiece extends HasId>(item: { piece: TPiece }, x: number, y: number) => void;
	onClick?: (x: number, y: number) => void;
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

export const BoardGridRows: React.FunctionComponent<BoardGridRowsProps> = ({ onDrop, onClick }) => {
	const { locked, piecePositions, size: { width, height } } = useBoard();
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
					? <DroppableTile key={`tile-${x}`} x={x} y={y} onDrop={onDrop} onClick={onClick} />
					: <UndroppableTile key={`tile-${x}`} x={x} y={y} />
			);
		}

		rows.push(<div key={`row-${y}`} className={styles.tileRow}>{tiles}</div>);
	}

	return <>{rows}</>;
};
