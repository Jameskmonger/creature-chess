import * as React from "react";

import { createUseStyles } from "react-jss";

import { HasId, PiecePosition } from "@shoki/board";

import {
	BoardGrid,
	ClickBoardTileEvent,
	DropBoardItemEvent,
} from "@shoki-web/board-react";

import { PieceModel } from "@creature-chess/models";

import { BoardSpaceFiller } from "./BoardSpaceFiller";
import { useGameBoard } from "./GameBoardContext";
import { ThemedBoard } from "./ThemedBoard";

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
	renderTileBackground?: (position: PiecePosition) => React.ReactNode;
	onClick?: (event: GameBoardClickEvent) => void;
	onDropPiece?: (event: GameBoardDropPieceEvent) => void;
	children?: React.ReactNode;

	showFiller?: boolean;
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
		[board.locked, renderBoardPiece]
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
		[bench.locked, renderBenchPiece]
	);

	return { boardPieceRenderer, benchPieceRenderer };
}

type UseStylesProps = {
	width: number;
	totalHeight: number;
	boardHalfHeight: number;
};

const useStyles = createUseStyles<string, UseStylesProps>({
	root: {
		height: "100%",
		width: "auto",

		containerName: "game-board",
		containerType: "size",

		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},

	gameBoard: ({ width, totalHeight }) => ({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		overflow: "hidden",
		boxSizing: "border-box",

		// portrait
		[`@container game-board (max-aspect-ratio: ${width} / ${totalHeight})`]: {
			width: "calc(100% - 16px)",
			height: "auto",
		},

		// landscape
		[`@container game-board (min-aspect-ratio: ${width} / ${totalHeight})`]: {
			width: "auto",
			height: "calc(100% - 16px)",
		},

		aspectRatio: `${width} / ${totalHeight}`,
	}),

	board: {
		position: "relative",
		aspectRatio: ({ width, boardHalfHeight }) =>
			`${width} / ${boardHalfHeight}`,
	},
	bench: {
		aspectRatio: ({ width }) => `${width} / 1`,
	},
	benchBoard: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "end",
	},

	benchTile: {
		background: "#9e9e9e !important",
		boxShadow: "inset 0 0 2px #404040",
	},
});

export function GameBoard({
	renderBoardPiece,
	renderBenchPiece,
	renderTileBackground,
	onClick,
	onDropPiece,
	children,
	showFiller = false,
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

	const totalHeight =
		bench.size.height +
		(showFiller ? board.size.height * 2 : board.size.height);

	const styles = useStyles({
		boardHalfHeight: board.size.height,
		width: board.size.width,
		totalHeight,
	});

	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<div className={styles.root} ref={ref}>
			<div className={styles.gameBoard}>
				{showFiller && <BoardSpaceFiller />}

				<div className={styles.board}>
					<ThemedBoard
						state={board}
						onDropItem={onDropBoard}
						onClickTile={onClickBoard}
						renderItem={boardPieceRenderer}
						renderTileBackground={renderTileBackground}
						flipDarkLight={showFiller}
					/>
					{children}
				</div>

				<div className={styles.bench}>
					<BoardGrid
						state={bench}
						onDropItem={onDropBench}
						onClickTile={onClickBench}
						renderItem={benchPieceRenderer}
						className={styles.benchBoard}
						lightTileClassName={styles.benchTile}
						darkTileClassName={styles.benchTile}
					/>
				</div>
			</div>
		</div>
	);
}
