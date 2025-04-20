import * as React from "react";

import { useDrag } from "react-dnd";

import { BoardItem } from "./BoardItem";

type DraggableBoardItemProps = {
	children: React.ReactNode;
	id: string;
	x: number;
	y: number;
};

export const DraggableBoardItem: React.FC<DraggableBoardItemProps> = ({
	children,
	id,
	x,
	y,
}) => {
	const [{}, drag] = useDrag<{ id: string }, void, {}>({
		type: "BoardItem",
		item: { id },
	});

	return (
		<BoardItem ref={drag} x={x} y={y}>
			{children}
		</BoardItem>
	);
};
