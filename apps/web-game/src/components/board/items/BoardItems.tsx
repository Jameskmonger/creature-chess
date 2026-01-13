import * as React from "react";

import { BoardItem } from "./BoardItem";
import { DraggableBoardItem } from "./DraggableBoardItem";
import { BoardItemRenderFn } from "./renderItem";
import { useBoardState } from "../context";

type Props = {
	render: BoardItemRenderFn;
	dragDrop?: boolean;
};

export function BoardItems({ render, dragDrop }: Props) {
	const board = useBoardState();

	const pieceElements: React.ReactNode[] = [];

	for (const { id, x, y } of board.getAllPieces()) {
		if (!id) {
			continue;
		}

		const { item, draggable = false } = render(id, x, y);

		if (dragDrop && draggable) {
			pieceElements.push(
				<DraggableBoardItem key={id} id={id} x={x} y={y}>
					{item}
				</DraggableBoardItem>
			);
		} else {
			pieceElements.push(
				<BoardItem key={id} x={x} y={y}>
					{item}
				</BoardItem>
			);
		}
	}

	return <>{pieceElements}</>;
}
