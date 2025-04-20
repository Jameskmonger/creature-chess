import React from "react";

import { createUseStyles } from "react-jss";

import { BoardState } from "@shoki/board";

import { useBoardState } from "../context";
import { ClickBoardTileEvent, DropBoardItemEvent } from "../events";
import { isBoardTileDark } from "../utils/isBoardTileDark";
import { Tile } from "./tile/Tile";

type Props = {
	lightTileClassName?: string;
	darkTileClassName?: string;
	dragDrop: boolean;
	onClick?: (event: ClickBoardTileEvent) => void;
	onDrop?: (event: DropBoardItemEvent) => void;
};

const useBoardStyles = createUseStyles<string, { size: BoardState["size"] }>({
	board: {
		position: "absolute",
		width: "100%",
		height: "100%",
		display: "grid",
		gridTemplateColumns: (props) => `repeat(${props.size.width}, 1fr)`,
		gridTemplateRows: (props) => `repeat(${props.size.height}, 1fr)`,
		gridColumnGap: 0,
		gridRowGap: 0,
	},
});

export function BoardTiles({
	lightTileClassName,
	darkTileClassName,
	dragDrop,
	onClick,
	onDrop,
}: Props) {
	const { size } = useBoardState();
	const styles = useBoardStyles({ size });

	const tiles = React.useMemo(() => {
		const t = [];
		for (let y = 0; y < size.height; y++) {
			for (let x = 0; x < size.width; x++) {
				t.push(
					<Tile
						key={`tile-${x}-${y}`}
						x={x}
						y={y}
						dragDrop={dragDrop}
						onClick={onClick}
						onDrop={onDrop}
						className={
							isBoardTileDark(x, y) ? darkTileClassName : lightTileClassName
						}
					/>
				);
			}
		}
		return t;
	}, [
		darkTileClassName,
		dragDrop,
		lightTileClassName,
		onClick,
		onDrop,
		size.height,
		size.width,
	]);

	return <div className={styles.board}>{tiles}</div>;
}
