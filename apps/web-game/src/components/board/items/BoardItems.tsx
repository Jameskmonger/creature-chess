import * as React from "react";

import { useBoardState } from "../context";
import { BoardItem } from "./BoardItem";
import { BoardItemRenderFn } from "./renderItem";

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

		pieceElements.push(
			<BoardItem
				key={id}
				id={id}
				x={x}
				y={y}
				draggable={Boolean(dragDrop && draggable)}
			>
				{item}
			</BoardItem>
		);
	}

	return <>{pieceElements}</>;
}
