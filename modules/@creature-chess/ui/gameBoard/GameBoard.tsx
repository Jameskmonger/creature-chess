import * as React from "react";

import { createUseStyles } from "react-jss";

import { HasId } from "@shoki/board";
import {
	BoardGrid,
	ClickBoardTileEvent,
	DropBoardItemEvent,
} from "@shoki/board-react";
import { useElementSize } from "@shoki/board-react/src/useElementSize";

import { PieceModel } from "@creature-chess/models";

import { useGameBoard } from "./GameBoardContext";

export type GameBoardLocation =
	| {
			locationType: "board";
			x: number;
			y: number;
	  }
	| {
			locationType: "bench";
			x: number;
	  };

type GameBoardClickEvent = { location: GameBoardLocation };
type GameBoardDropPieceEvent = {
	id: string;
	location: GameBoardLocation;
};

const createClickEvent = (
	location: GameBoardLocation
): GameBoardClickEvent => ({ location });
const createDropPieceEvent = (
	id: string,
	location: GameBoardLocation
): GameBoardDropPieceEvent => ({ id, location });

type GameBoardProps = {
	renderBoardPiece: (piece: PieceModel) => React.ReactNode | React.ReactNode[];
	renderBenchPiece: (piece: PieceModel) => React.ReactNode | React.ReactNode[];
	onClick?: (event: GameBoardClickEvent) => void;
	onDropPiece?: (event: GameBoardDropPieceEvent) => void;
};

function useEvents({
	onClick,
	onDropPiece,
}: Pick<GameBoardProps, "onClick" | "onDropPiece">) {
	const onClickBoard = React.useCallback(
		({ x, y }: ClickBoardTileEvent) => {
			if (!onClick) {
				return;
			}

			onClick(createClickEvent({ locationType: "board", x, y }));
		},
		[onClick]
	);

	const onClickBench = React.useCallback(
		({ x }: ClickBoardTileEvent) => {
			if (!onClick) {
				return;
			}

			onClick(createClickEvent({ locationType: "bench", x }));
		},
		[onClick]
	);

	const onDropBoard = React.useCallback(
		({ id, x, y }: DropBoardItemEvent) => {
			if (!onDropPiece) {
				return;
			}

			onDropPiece(createDropPieceEvent(id, { locationType: "board", x, y }));
		},
		[onDropPiece]
	);

	const onDropBench = React.useCallback(
		({ id, x }: DropBoardItemEvent) => {
			if (!onDropPiece) {
				return;
			}

			onDropPiece(createDropPieceEvent(id, { locationType: "bench", x }));
		},
		[onDropPiece]
	);

	return {
		onClickBoard,
		onClickBench,
		onDropBoard,
		onDropBench,
	};
}

function useRenderers({
	renderBoardPiece,
	renderBenchPiece,
}: Pick<GameBoardProps, "renderBoardPiece" | "renderBenchPiece">) {
	const { board, bench } = useGameBoard();

	const boardPieceRenderer = React.useMemo(
		() => (item: HasId) => {
			const piece = item as PieceModel;
			const draggable = !board.locked;

			return {
				item: renderBoardPiece(piece),
				draggable,
			};
		},
		[renderBoardPiece]
	);

	const benchPieceRenderer = React.useMemo(
		() => (item: HasId) => {
			const piece = item as PieceModel;
			const draggable = !bench.locked;

			return {
				item: renderBenchPiece(piece),
				draggable,
			};
		},
		[renderBoardPiece]
	);

	return { boardPieceRenderer, benchPieceRenderer };
}

const useStyles = createUseStyles<
	string,
	{ isPortrait: boolean; boardWidth: number }
>({
	gameBoard: {
		"height": "100%",
		"width": "100%",

		"display": "flex",
		"flexDirection": "column",
		"justifyContent": "center",

		"& .tile.dark": {
			background: "#38b764",
		},
		"& .tile.light": {
			background: "#a7f070",
		},
	},
	board: ({ isPortrait }) => ({
		...(isPortrait ? {} : { height: "78%" }),

		display: "flex",
		justifyContent: "center",

		marginBottom: "1em",
	}),
	bench: ({ isPortrait, boardWidth }) => ({
		...(isPortrait ? {} : { height: "14%" }),
		"width": `${boardWidth}px`,
		"margin": "0 auto",

		"& .tile": {
			background: "#9e9e9e !important",
			boxShadow: "inset 0 0 2px #404040",
		},
	}),
});

export function GameBoard({
	renderBoardPiece,
	renderBenchPiece,
	onClick,
	onDropPiece,
}: GameBoardProps) {
	const { board, bench } = useGameBoard();

	const { boardPieceRenderer, benchPieceRenderer } = useRenderers({
		renderBoardPiece,
		renderBenchPiece,
	});
	const { onClickBoard, onClickBench, onDropBoard, onDropBench } = useEvents({
		onClick,
		onDropPiece,
	});

	const { ref, isPortrait, size } = useElementSize();

	// listen to the board width and set the bench to be the same width
	const { ref: boardRef, size: boardSize } = useElementSize();

	const styles = useStyles({ isPortrait, boardWidth: boardSize.width });

	return (
		<div className={styles.gameBoard} ref={ref}>
			<div className={styles.board}>
				<BoardGrid
					state={board}
					onDropItem={onDropBoard}
					onClickTile={onClickBoard}
					renderItem={boardPieceRenderer}
					scaleMode={isPortrait ? "width" : "height"}
					ref={boardRef}
				/>
			</div>

			<div className={styles.bench}>
				<BoardGrid
					state={bench}
					onDropItem={onDropBench}
					onClickTile={onClickBench}
					renderItem={benchPieceRenderer}
				/>
			</div>
		</div>
	);
}
