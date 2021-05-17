import * as React from "react";
import { DragObjectWithType } from "react-dnd";
import { BoardState, HasId } from "@shoki/board";
import { BoardContextProvider, useBoard } from "../context";
import { UndroppableTile } from "./tile/UndroppableTile";
import { DroppableTile } from "./tile/DroppableTile";
import { BoardItems, BoardItemRenderFn } from "./BoardItems";

type BoardGridProps = {
	state: BoardState;
	renderItem: BoardItemRenderFn;
	onDrop?: <TPiece extends HasId>(item: DragObjectWithType & { piece: TPiece }, x: number, y: number) => void;
	onClick?: (x: number, y: number) => void;
};

// tslint:disable-next-line no-bitwise
const isBoardTileDark = (x: number, y: number) => ((y ^ x) & 1) !== 0;

const getTileColourClassName = (x: number, y: number) => isBoardTileDark(x, y) ? "dark" : "light";

const BoardRows: React.FunctionComponent<Pick<BoardGridProps, "onDrop" | "onClick">> = ({ onDrop, onClick }) => {
	const { locked, piecePositions, size: { width, height } } = useBoard();

	const rows = [];

	for (let y = 0; y < height; y++) {
		const tiles = [];

		for (let x = 0; x < width; x++) {
			const className = getTileColourClassName(x, y);
			const piecePositionKey = `${x},${y}`;

			const tileContainsPiece = Boolean(piecePositions[piecePositionKey]);

			tiles.push(
				(!tileContainsPiece && !locked)
					? <DroppableTile key={`tile-${x}`} className={className} x={x} y={y} onDrop={onDrop} onClick={onClick} />
					: <UndroppableTile key={`tile-${x}`} className={className} />
			);
		}

		rows.push(<div key={`row-${y}`} className="tile-row">{tiles}</div>);
	}

	return <div>{rows}</div>;
};

const getTilePosition = (width: number, height: number, x: number, y: number) => {
	return {
		left: x / width,
		top: y / height
	};
};

const PositionablePieceStyle: React.FunctionComponent = () => {
	const { size: { height, width } } = useBoard();
	const styles = [];
	const TILE_BASE_Z_INDEX = 10;

	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			const { left, top } = getTilePosition(width, height, x, y);

			styles.push(`.positionable-piece.x-${x} { left: ${(left * 100).toFixed(2)}%; }`);
			styles.push(`.positionable-piece.y-${y} { top: ${(top * 100).toFixed(2)}%; z-index: ${TILE_BASE_Z_INDEX + y + 1}; }`);
		}
	}

	return <style>{styles.join("\n")}</style>;
};

const BoardGrid: React.FunctionComponent<BoardGridProps> = ({ state, renderItem, onDrop, onClick }) => (
	<BoardContextProvider value={state}>
		<PositionablePieceStyle />

		<BoardRows onDrop={onDrop} onClick={onClick} />

		<BoardItems render={renderItem} />
	</BoardContextProvider>
);

export { BoardGrid };
