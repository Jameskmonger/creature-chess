import * as React from "react";

import { createUseStyles } from "react-jss";

import { BoardState } from "@shoki/board";

import { BoardContextProvider } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { useElementSize } from "../useElementSize";
import { BoardGridRows } from "./BoardGridRows";
import { BoardItems } from "./items/BoardItems";
import { BoardItemRenderFn } from "./items/renderItem";
import classNames from "classnames";

type BoardGridProps = {
	state: BoardState;
	containerClassName?: string;
	boardClassName?: string;
	renderItem: BoardItemRenderFn;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
};

const useStyles = createUseStyles({
	boardContainer: {
		position: "relative",
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
	},
	board: {
		position: "relative",
	}
});

function useTileSize(
	boardContainerSize: { width: number; height: number },
	boardSize: { width: number; height: number }
) {
	const { width, height } = boardContainerSize;
	const { width: columnCount, height: rowCount } = boardSize;

	const tileWidth = width / columnCount;
	const tileHeight = height / rowCount;

	return Math.min(tileWidth, tileHeight);
}

export const BoardGrid = React.forwardRef<HTMLDivElement, BoardGridProps>(
	(props, forwardRef) => {
		const {
			state,
			renderItem,
			onDropItem,
			onClickTile,
		} = props;

		const boardContext = {
			state
		};

		const styles = useStyles();
		const { ref, size } = useElementSize();
		const tileSize = useTileSize(size, state.size);

		const containerClass = classNames(styles.boardContainer, props.containerClassName);
		const boardClass = classNames(styles.board, props.boardClassName);

		return (
			<div className={containerClass} ref={ref}>
				<div
					className={boardClass}
					style={{
						width: `${tileSize * state.size.width}px`,
						height: `${tileSize * state.size.height}px`,
					}}
				>
					<BoardContextProvider value={boardContext}>
						<BoardGridRows onDropItem={onDropItem} onClickTile={onClickTile} tileSizePx={tileSize} />

						<BoardItems render={renderItem} tileSizePx={tileSize} />
					</BoardContextProvider>
				</div>
			</div>
		);
	}
);
