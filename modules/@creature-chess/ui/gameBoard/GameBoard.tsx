import * as React from "react";

import { createUseStyles } from "react-jss";

import { HasId } from "@shoki/board";
import {
	BoardGrid,
	ClickBoardTileEvent,
	DropBoardItemEvent,
} from "@shoki/board-react";

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

const useStyles = createUseStyles<
	string,
	{ portrait: boolean; halfHeight: boolean }
>({
	boardContainer: ({ portrait }) => ({
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: portrait ? "column" : "row",
		justifyContent: "center",
	}),
	boardGrid: ({ halfHeight }) => ({
		position: "relative",
		marginBottom: "0.5rem",
		width: "100%",

		// TODO this should be based on GRID_SIZE
		height: halfHeight ? "41.5%" : "83%",

		"& .tile.dark": {
			background: "#38b764",
		},
		"& .tile.light": {
			background: "#a7f070",
		},
	}),
	benchGrid: {
		position: "relative",
		width: "100%",

		// TODO this should be based on GRID_SIZE
		height: "17%",

		"& .tile": {
			background: "#9e9e9e",
			boxShadow: "inset 0 0 2px #404040",
		},
	},
});

const useChessboardStyles = createUseStyles<
	string,
	{ width: string; height: string }
>({
	chessboard: ({ width, height }) => ({
		width,
		height,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	}),
});

const GameBoard: React.FC<GameBoardProps> = ({
	renderBoardPiece,
	renderBenchPiece,
	onClick,
	onDropPiece,
}) => {
	const { board, bench } = useGameBoard();
	const [clientHeight, setClientHeight] = React.useState(0);
	const [clientWidth, setClientWidth] = React.useState(0);
	const isPortrait = clientWidth <= clientHeight;
	const isHalfHeight = board.size.height === 3;
	const styles = useStyles({ portrait: isPortrait, halfHeight: isHalfHeight });
	const chessboardStyles = useChessboardStyles({
		width: isPortrait ? `${clientWidth}px` : `${clientHeight}px`,
		height: isPortrait ? `${clientWidth}px` : "100%",
	});

	const createHandleClick =
		(locationType: "board" | "bench") =>
		({ x, y }: ClickBoardTileEvent) => {
			if (!onClick) {
				return;
			}

			onClick(createClickEvent({ locationType, x, y }));
		};

	const createHandleDrop =
		(locationType: "board" | "bench") =>
		({ id, x, y }: DropBoardItemEvent) => {
			if (!onDropPiece) {
				return;
			}

			onDropPiece(createDropPieceEvent(id, { locationType, x, y }));
		};

	const createRenderer = (locationType: "board" | "bench") => (item: HasId) => {
		const piece = item as PieceModel;

		const isBoard = locationType === "board";

		const state = isBoard ? board : bench;

		const renderer = isBoard ? renderBoardPiece : renderBenchPiece;
		const draggable = !state.locked;

		return {
			item: renderer(piece),
			draggable,
		};
	};

	const chessboardRef = React.useRef<HTMLDivElement>(null);

	React.useLayoutEffect(() => {
		if (!chessboardRef.current?.parentElement) {
			return;
		}

		const { clientWidth, clientHeight } = chessboardRef.current.parentElement;

		setClientHeight(clientHeight);
		setClientWidth(clientWidth);

		// TODO handle resize here
	}, [chessboardRef.current]);

	return (
		<div className={styles.boardContainer}>
			<div className={chessboardStyles.chessboard} ref={chessboardRef}>
				<div className={styles.boardGrid}>
					<BoardGrid
						state={board}
						onDropItem={createHandleDrop("board")}
						onClickTile={createHandleClick("board")}
						renderItem={createRenderer("board")}
					/>
				</div>

				<div className={styles.benchGrid}>
					<BoardGrid
						state={bench}
						onDropItem={createHandleDrop("bench")}
						onClickTile={createHandleClick("bench")}
						renderItem={createRenderer("bench")}
					/>
				</div>
			</div>
		</div>
	);
};

export { GameBoard };
