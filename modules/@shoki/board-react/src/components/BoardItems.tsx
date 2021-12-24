import * as React from "react";
import { useBoard } from "../context";

export type BoardItemRenderFn = (id: string, x: number, y: number) => React.ReactNode | React.ReactNode[];

interface BoardItemProps {
	x: number;
	y: number;
	boardId: string;

	children: ReturnType<BoardItemRenderFn>;
}

const BoardItem: React.FunctionComponent<BoardItemProps> = ({ boardId, x, y, children }) => (
	<div className={`positionable-piece positionable-piece-${boardId} x-${x} y-${y}`}>{children}</div>
);

const BoardItems: React.FunctionComponent<{ render: BoardItemRenderFn }> = ({ render }) => {
	const { id: boardId, piecePositions } = useBoard();

	const pieceElements: React.ReactNode[] = [];

	// this weird code is needed so that React keeps the same DOM elements, thus preserving the CSS animations
	const entries = Object.entries(piecePositions);
	entries.sort(([aPosition, aId], [bPosition, bId]) => aId.localeCompare(bId));

	for (const [position, id] of entries) {
		if (!id) {
			continue;
		}

		const [x, y] = position.split(",").map(i => parseInt(i, 10));

		pieceElements.push(<BoardItem key={id} boardId={boardId} x={x} y={y}>{render(id, x, y)}</BoardItem>);
	}

	return <>{pieceElements}</>;
};

export { BoardItems };
