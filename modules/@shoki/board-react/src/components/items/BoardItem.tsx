import React from "react";
import { createUseStyles } from "react-jss";
import { useBoard } from "../../context";

type BoardItemProps = {
	children: React.ReactNode;
	x: number;
	y: number;
};

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

export const BoardItem = React.forwardRef<any, BoardItemProps>(({ x, y, children }, ref) => {
	const { size: { width: boardWidth, height: boardHeight } } = useBoard();
	const styles = useStyles({ boardWidth, boardHeight, x, y });

	return (
		<div ref={ref} className={styles.boardItem}>{children}</div>
	);
});
