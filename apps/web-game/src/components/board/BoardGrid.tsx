import * as React from "react";

import classNames from "classnames";
import { createUseStyles } from "react-jss";

import { PackedPosition, SubscribableBoard } from "@creature-chess/board";

import { BoardTiles } from "./BoardTiles";
import { BoardItems } from "./items/BoardItems";
import { BoardItemRenderFn } from "./items/renderItem";
import { ClickBoardTileEvent, DropBoardItemEvent } from "./events";
import { BoardContextProvider, BoardContextValue } from "./context";
import { useDropSurface } from "./drag/PieceDragContext";
import { useMemo } from "react";

type BoardGridProps = {
	state: SubscribableBoard;
	renderItem: BoardItemRenderFn;
	renderTileBackground?: (position: PackedPosition) => React.ReactNode;
	onDropItem?: (event: DropBoardItemEvent) => void;
	onClickTile?: (event: ClickBoardTileEvent) => void;
	canDropItem?: (id: string, x: number, y: number) => boolean;
	dragDrop?: boolean;
	children?: React.ReactNode;

	className?: string;
	lightTileClassName?: string;
	darkTileClassName?: string;
};

const useStyles = createUseStyles<string, { width: number; height: number }>({
	root: {
		position: "relative",
		width: "100%",
		height: "100%",

		containerName: "board",
		containerType: "size",
	},

	board: ({ width, height }) => ({
		position: "relative",
		aspectRatio: `${width} / ${height}`,

		// portrait
		[`@container board (max-aspect-ratio: ${width} / ${height})`]: {
			width: "100%",
			height: "auto",
		},

		// landscape
		[`@container board (min-aspect-ratio: ${width} / ${height})`]: {
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
	canDropItem,
	dragDrop = true,
	children,
	renderTileBackground,
	className,
	lightTileClassName,
	darkTileClassName,
}: BoardGridProps) {
	const context = useMemo(
		() => ({
			state,
			tileBackgroundRenderer: renderTileBackground,
		} as BoardContextValue),
		[state, renderTileBackground]
	);

	const styles = useStyles({ width: state.width, height: state.height });

	const surfaceRef = React.useRef<HTMLDivElement>(null);
	const handleDrop = React.useCallback(
		(id: string, x: number, y: number) => {
			onDropItem?.({ id, x, y });
		},
		[onDropItem]
	);
	const handleCanDrop = React.useCallback(
		(id: string, x: number, y: number) => {
			if (!dragDrop) {
				return false;
			}
			return canDropItem ? canDropItem(id, x, y) : true;
		},
		[dragDrop, canDropItem]
	);

	useDropSurface(
		surfaceRef,
		state.width,
		state.height,
		handleDrop,
		handleCanDrop
	);

	return (
		<div className={classNames(styles.root, className)}>
			<BoardContextProvider value={context}>
				<div className={styles.board} ref={surfaceRef}>
					{children}
					<BoardTiles
						lightTileClassName={lightTileClassName}
						darkTileClassName={darkTileClassName}
						onClick={onClickTile}
					/>
					<BoardItems render={renderItem} dragDrop={dragDrop} />
				</div>
			</BoardContextProvider>
		</div>
	);
}
