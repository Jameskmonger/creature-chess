import * as React from "react";

import { useBoardState } from "../../context";
import { BoardItem } from "./BoardItem";
import { DraggableBoardItem } from "./DraggableBoardItem";
import { BoardItemRenderFn } from "./renderItem";

const BoardItems: React.FC<{ render: BoardItemRenderFn }> = ({ render }) => {
	const { pieces, piecePositions } = useBoardState();

	const pieceElements: React.ReactNode[] = [];

	// this weird code is needed so that React keeps the same DOM elements, thus preserving the CSS animations
	const entries = Object.entries(piecePositions);
	entries.sort(([aPosition, aId], [bPosition, bId]) => aId.localeCompare(bId));

	for (const [position, id] of entries) {
		if (!id) {
			continue;
		}

		const [x, y] = position.split(",").map((i) => parseInt(i, 10));

		const { item, draggable = false } = render(pieces[id], x, y);

		if (draggable) {
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
};

export { BoardItems };
