import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { HasId } from "@shoki/board";
import { useBelowPieceLimit, usePieces } from "../../context";
import { getOverlayClassName } from "./getOverlayClassName";

type DroppableTileProps = {
	isDark: boolean;
	x: number;
	y: number;
	onDrop?: <TPiece extends HasId>(item: DragObjectWithType & { piece: TPiece }, x: number, y: number) => void;
	onClick?: (x: number, y: number) => void;
};

type PieceDragObject = DragObjectWithType & { piece: HasId };
type DropTargetCollectProps = {
	canDrop: boolean;
	isDragging: boolean;
};

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ isDark, x, y, onDrop, onClick }) => {
	const belowPieceLimit = useBelowPieceLimit();
	const pieces = usePieces();

	const [{ canDrop, isDragging }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
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

	const onClickFn = onClick ? () => onClick(x, y) : undefined;

	return (
		<div
			ref={drop}
			className={`tile ${isDark ? "dark" : "light"}`}
			touch-action="none"
			onPointerUp={onClickFn}
		>
			<div className={`${getOverlayClassName(isDragging, canDrop)}`} />
		</div>
	);
};

export { DroppableTile };
