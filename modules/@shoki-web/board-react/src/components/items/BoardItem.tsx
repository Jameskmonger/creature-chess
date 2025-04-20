import React from "react";

import { createUseStyles } from "react-jss";

import { useBoardState } from "../../context";

type BoardItemProps = {
	children: React.ReactNode;
	x: number;
	y: number;
};

const TILE_BASE_Z_INDEX = 50;

const useStyles = createUseStyles({
	boardItem: {
		position: "absolute",
		transition: "all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1) 0s",
	},
});

export const BoardItem = React.forwardRef<any, BoardItemProps>(
	({ x, y, children }, ref) => {
		const styles = useStyles();
		const { size } = useBoardState();

		return (
			<div
				ref={ref}
				className={styles.boardItem}
				style={{
					left: `${(x / size.width) * 100}%`,
					top: `${(y / size.height) * 100}%`,

					width: `${(1 / size.width) * 100}%`,
					height: `${(1 / size.height) * 100}%`,

					zIndex: TILE_BASE_Z_INDEX + y + 1,
				}}
			>
				{children}
			</div>
		);
	}
);
