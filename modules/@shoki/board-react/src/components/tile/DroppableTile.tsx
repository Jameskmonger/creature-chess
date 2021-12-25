import * as React from "react";
import { useDrop } from "react-dnd";
import { useBelowPieceLimit, usePieces } from "../../context";
import { Tile } from "./Tile";

type DroppableTileProps = {
	x: number;
	y: number;
	onDrop?: (id: string, x: number, y: number) => void;
	onClick?: (x: number, y: number) => void;
};

type DropTargetCollectProps = {
	canDrop: boolean;
	isDragging: boolean;
};

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ x, y, onDrop, onClick }) => {
	const belowPieceLimit = useBelowPieceLimit();
	const pieces = usePieces();

	const [{ }, drop] = useDrop<{ id: string }, void, DropTargetCollectProps>({
		accept: "BoardItem",
		drop: ({ id }) => {
			if (!onDrop) {
				return;
			}

			onDrop(id, x, y);
		},
		canDrop: ({ id }) => {
			const pieceIsFromSameBoard = Boolean(pieces[id]);
			return belowPieceLimit || pieceIsFromSameBoard;
		},
		collect: monitor => ({
			canDrop: !!monitor.canDrop(),
			isDragging: !!monitor.getItem(),
		}),
	});

	return <Tile ref={drop} x={x} y={y} onClick={onClick} />;
};

export { DroppableTile };
