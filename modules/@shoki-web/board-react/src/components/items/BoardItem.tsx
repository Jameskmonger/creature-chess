import React from "react";

import { createUseStyles } from "react-jss";

type BoardItemProps = {
	children: React.ReactNode;
	x: number;
	y: number;
	tileSizePx: number;
};

const TILE_BASE_Z_INDEX = 50;

const useStyles = createUseStyles({
	boardItem: {
		position: "absolute",
		transition: "all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s",
	},
});

export const BoardItem = React.forwardRef<any, BoardItemProps>(
	({ x, y, children, tileSizePx }, ref) => {
		const styles = useStyles();

		return (
			<div
				ref={ref}
				className={styles.boardItem}
				style={{
					width: `${tileSizePx}px`,
					height: `${tileSizePx}px`,

					left: `${(x * tileSizePx)}px`,
					top: `${(y * tileSizePx)}px`,

					zIndex: TILE_BASE_Z_INDEX + y + 1
				}}
			>
				{children}
			</div>
		);
	}
);
