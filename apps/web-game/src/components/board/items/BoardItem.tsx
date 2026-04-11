import React from "react";

import classNames from "classnames";
import { createPortal } from "react-dom";
import { createUseStyles } from "react-jss";

import { useBoardState } from "../context";
import { useActiveDrag, useDragPiece } from "../drag/PieceDragContext";

type BoardItemProps = {
	children: React.ReactNode;
	id: string;
	x: number;
	y: number;
	draggable?: boolean;
};

const TILE_BASE_Z_INDEX = 50;
const PREVIEW_SCALE = 1;

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
	hidden: {
		opacity: 0,
		transition: "none",
	},
	preview: {
		position: "fixed",
		pointerEvents: "none",
		zIndex: 9999,
		opacity: 0.85,
	},
});

export function BoardItem({ id, x, y, draggable, children }: BoardItemProps) {
	const styles = useStyles();
	const { width, height } = useBoardState();

	const dragHandlers = useDragPiece(id);
	const activeDrag = useActiveDrag();
	const isDragging = activeDrag?.id === id;

	return (
		<>
			<div
				className={classNames(styles.boardItem, {
					[styles.draggable]: draggable,
					[styles.hidden]: isDragging,
				})}
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

			{isDragging &&
				createPortal(
					<div
						className={styles.preview}
						style={{
							left: activeDrag.clientX - activeDrag.offsetX * PREVIEW_SCALE,
							top: activeDrag.clientY - activeDrag.offsetY * PREVIEW_SCALE,
							width: activeDrag.width * PREVIEW_SCALE,
							height: activeDrag.height * PREVIEW_SCALE,
						}}
					>
						{children}
					</div>,
					document.body
				)}
		</>
	);
}
