import * as React from "react";
import { createUseStyles } from "react-jss";
import { useBoard } from "../context";

export type BoardItemRenderFn = (id: string, x: number, y: number) => React.ReactNode | React.ReactNode[];

interface BoardItemProps {
	x: number;
	y: number;
	boardId: string;

	children: ReturnType<BoardItemRenderFn>;
}

type StylesProps = {
	boardWidth: number;
	boardHeight: number;
	x: number;
	y: number;
};

const TILE_BASE_Z_INDEX = 50;

const useStyles = createUseStyles<string, StylesProps>({
	boardItem: props => ({
		position: "absolute",
		transition: "all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s",

		width: `${(100 / props.boardWidth).toFixed(2)}%`,
		height: `${(100 / props.boardHeight).toFixed(2)}%`,

		left: `${((props.x / props.boardWidth) * 100).toFixed(2)}%`,
		top: `${((props.y / props.boardHeight) * 100).toFixed(2)}%`,
		zIndex: TILE_BASE_Z_INDEX + props.y + 1,
	}),
});

const BoardItem: React.FunctionComponent<BoardItemProps> = ({ boardId, x, y, children }) => {
	const { size: { width: boardWidth, height: boardHeight } } = useBoard();
	const styles = useStyles({ boardWidth, boardHeight, x, y });

	return (
		<div className={styles.boardItem}>{children}</div>
	);
};

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

		const item =
			render
				? render(id, x, y)
				: <span>{id} - {x},{y}</span>;

		pieceElements.push(<BoardItem key={id} boardId={boardId} x={x} y={y}>{item}</BoardItem>);
	}

	return <>{pieceElements}</>;
};

export { BoardItems };
