import * as React from "react";

import { useDrop } from "react-dnd";

import { useBelowPieceLimit, usePieces } from "../../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../../events";

type DroppableTileProps = {
	x: number;
	y: number;
	onDrop?: (event: DropBoardItemEvent) => void;
	onClick?: (event: ClickBoardTileEvent) => void;
};

type DropTargetCollectProps = {
	canDrop: boolean;
	isDragging: boolean;
};

export function DroppableTile({ x, y, onDrop, onClick }: DroppableTileProps) {
	const belowPieceLimit = useBelowPieceLimit();
	const pieces = usePieces();

	const [{}, drop] = useDrop<{ id: string }, void, DropTargetCollectProps>({
		accept: "BoardItem",
		drop: ({ id }, monitor: any) => {
			if (!onDrop) {
				return;
			}

			onDrop({ id, x, y });
		},
		canDrop: ({ id }) => {
			const pieceIsFromSameBoard = Boolean(pieces[id]);
			return belowPieceLimit || pieceIsFromSameBoard;
		},
		collect: (monitor) => ({
			canDrop: !!monitor.canDrop(),
			isDragging: !!monitor.getItem(),
		}),
	});

	const onTileClick = React.useCallback(() => {
		if (!onClick) {
			return;
		}

		onClick({ x, y });
	}, [onClick, x, y]);

	return (
		<div
			ref={drop}
			style={{
				width: "100%",
				height: "100%",
				position: "absolute",
				top: 0,
				left: 0,
			}}
			onClick={onTileClick}
		/>
	);
}
