import React from "react";

import { createUseStyles } from "react-jss";

import { BoardSize } from "@creature-chess/board";

import { useBoardState } from "./context";
import { ClickBoardTileEvent } from "./events";
import { Tile } from "./tile/Tile";

type Props = {
	lightTileClassName?: string;
	darkTileClassName?: string;
	onClick?: (event: ClickBoardTileEvent) => void;
};

const useBoardStyles = createUseStyles<string, { size: BoardSize }>({
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

// eslint-disable-next-line no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

export function BoardTiles({
	lightTileClassName,
	darkTileClassName,
	onClick,
}: Props) {
	const board = useBoardState();
	const styles = useBoardStyles({
		size: { width: board.width, height: board.height },
	});

	const tiles = React.useMemo(() => {
		const t = [];
		for (let y = 0; y < board.height; y++) {
			for (let x = 0; x < board.width; x++) {
				t.push(
					<Tile
						key={`tile-${x}-${y}`}
						x={x}
						y={y}
						onClick={onClick}
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
		lightTileClassName,
		onClick,
		board.height,
		board.width,
	]);

	return <div className={styles.board}>{tiles}</div>;
}
