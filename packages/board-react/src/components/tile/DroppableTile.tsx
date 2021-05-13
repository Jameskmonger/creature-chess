import * as React from "react";
import { DragObjectWithType, useDrop } from "react-dnd";
import { HasId } from "@creature-chess/board";
import { useBelowPieceLimit, usePieces } from "../../context";
import { getOverlayClassName } from "./getOverlayClassName";

type DroppableTileProps = {
	className: string;
	x: number;
	y: number;
	onDrop: <TPiece extends HasId>(item: DragObjectWithType & { piece: TPiece }, x: number, y: number) => void;
	onClick: (x: number, y: number) => void;
};

type PieceDragObject = DragObjectWithType & { piece: HasId };
type DropTargetCollectProps = { canDrop: boolean, isDragging: boolean };

const DroppableTile: React.FunctionComponent<DroppableTileProps> = ({ className, x, y, onDrop, onClick }) => {
	const belowPieceLimit = useBelowPieceLimit();
	const pieces = usePieces();

	const [{ canDrop, isDragging }, drop] = useDrop<PieceDragObject, void, DropTargetCollectProps>({
		accept: "Piece",
		drop: item => onDrop(item, x, y),
		canDrop: ({ piece }) => {
			const pieceIsFromSameBoard = Boolean(pieces[piece.id]);
			return belowPieceLimit || pieceIsFromSameBoard;
		},
		collect: monitor => ({
			canDrop: !!monitor.canDrop(),
			isDragging: !!monitor.getItem(),
		}),
	});

	const onClickFn = () => onClick(x, y);

	return (
		<div
			ref={drop}
			className={`tile ${className}`}
			touch-action="none"
			onPointerUp={onClickFn}
		>
			<div className={`${getOverlayClassName(isDragging, canDrop)}`} />
		</div>
	);
};

export { DroppableTile };
