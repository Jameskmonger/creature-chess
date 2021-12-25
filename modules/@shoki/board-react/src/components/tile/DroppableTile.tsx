import * as React from "react";
import { useDrop } from "react-dnd";
import { HasId } from "@shoki/board";
import { useBelowPieceLimit, usePieces } from "../../context";
import { Tile } from "./Tile";

type DroppableTileProps = {
	x: number;
	y: number;
	onDrop?: <TPiece extends HasId>(item: { piece: TPiece }, x: number, y: number) => void;
	onClick?: (x: number, y: number) => void;
};

type PieceDragObject = { piece: HasId };
type DropTargetCollectProps = {
	canDrop: boolean;
	isDragging: boolean;
};

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ x, y, onDrop, onClick }) => {
	const belowPieceLimit = useBelowPieceLimit();
	const pieces = usePieces();

	const [{ }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
		accept: "Piece",
		drop: item => onDrop && onDrop(item, x, y), // todo make a wrapper that doesnt have any dnd on it
		canDrop: ({ piece }) => {
			const pieceIsFromSameBoard = Boolean(pieces[piece.id]);
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
