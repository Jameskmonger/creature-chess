import React from "react";

import { createUseStyles } from "react-jss";
import { useBoardState } from "../context";
import { useDragPiece } from "../drag/PieceDragContext";
import classNames from "classnames";

type BoardItemProps = {
	children: React.ReactNode;
	id: string;
	x: number;
	y: number;
	draggable?: boolean;
};

const TILE_BASE_Z_INDEX = 50;

/** Prevent the default drag behavior for an element. */
const preventDrag = (e: React.DragEvent) => e.preventDefault();

const useStyles = createUseStyles({
	boardItem: {
		position: "absolute",
		transition: "all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s",
	},
	draggable: {
		touchAction: "none",
		cursor: "grab",
		userSelect: "none",
		WebkitUserDrag: "none",
	},
});

export function BoardItem({ id, x, y, draggable, children }: BoardItemProps) {
	const styles = useStyles();
	const { width, height } = useBoardState();

	const dragHandlers = useDragPiece(id);

	return (
		<div
			className={classNames(
				styles.boardItem,
				{ [styles.draggable]: draggable }
			)}
			style={{
				left: `${(x / width) * 100}%`,
				top: `${(y / height) * 100}%`,

				width: `${(1 / width) * 100}%`,
				height: `${(1 / height) * 100}%`,
				zIndex: TILE_BASE_Z_INDEX + y + 1,
			}}
			draggable={false}
			onDragStart={preventDrag}
			{...(draggable ? dragHandlers : {})}
		>
			{children}
		</div>
	);
}
