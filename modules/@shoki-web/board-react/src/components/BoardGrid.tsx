import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { BoardState, PiecePosition } from "@shoki/board";

import { BoardContextProvider, BoardContextValue } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { BoardTiles } from "./BoardTiles";
import { BoardItems } from "./items/BoardItems";
import { BoardItemRenderFn } from "./items/renderItem";

type BoardGridProps = {
	state: BoardState;
	renderItem: BoardItemRenderFn;
	renderTileBackground?: (position: PiecePosition) => React.ReactNode;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
	dragDrop?: boolean;
	children?: React.ReactNode;

	className?: string;
	lightTileClassName?: string;
	darkTileClassName?: string;
};

const useStyles = createUseStyles<string, { size: BoardState["size"] }>({
	root: {
		position: "relative",
		width: "100%",
		height: "100%",

		containerName: "board",
		containerType: "size",
	},

	board: ({ size }) => ({
		position: "relative",
		aspectRatio: `${size.width} / ${size.height}`,

		// portrait
		[`@container board (max-aspect-ratio: ${size.width} / ${size.height})`]: {
			width: "100%",
			height: "auto",
		},

		// landscape
		[`@container board (min-aspect-ratio: ${size.width} / ${size.height})`]: {
			width: "auto",
			height: "100%",
		},
	}),
});

export function BoardGrid({
	state,
	renderItem,
	onDropItem,
	onClickTile,
	dragDrop = true,
	children,
	renderTileBackground,
	className,
	lightTileClassName,
	darkTileClassName,
}: BoardGridProps) {
	const boardContext: BoardContextValue = {
		state,
		tileBackgroundRenderer: renderTileBackground,
	};

	const styles = useStyles({ size: state.size });

	return (
		<div className={classNames(styles.root, className)}>
			<BoardContextProvider value={boardContext}>
				<div className={styles.board}>
					{children}
					<BoardTiles
						lightTileClassName={lightTileClassName}
						darkTileClassName={darkTileClassName}
						dragDrop={dragDrop}
						onClick={onClickTile}
						onDrop={onDropItem}
					/>
					<BoardItems render={renderItem} dragDrop={dragDrop} />
				</div>
			</BoardContextProvider>
		</div>
	);
}
