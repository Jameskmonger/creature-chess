import * as React from "react";
import { createUseStyles } from "react-jss";
import { HasId } from "@shoki/board";
import { BoardGrid } from "@shoki/board-react";
import { PieceModel } from "@creature-chess/models";
import { useGameBoard } from "./GameBoardContext";

type GameBoardLocation = {
	locationType: "board";
	x: number;
	y: number;
} | {
	locationType: "bench";
	x: number;
};

type GameBoardClickEvent = { location: GameBoardLocation };
type GameBoardDropPieceEvent = {
	location: GameBoardLocation;
	piece: PieceModel;
};

const createClickEvent = (location: GameBoardLocation): GameBoardClickEvent => ({ location });
const createDropPieceEvent = (piece: PieceModel, location: GameBoardLocation): GameBoardDropPieceEvent => ({ piece, location });

type GameBoardProps = {
	renderBoardPiece?: (piece: PieceModel) => React.ReactNode | React.ReactNode[];
	renderBenchPiece?: (piece: PieceModel) => React.ReactNode | React.ReactNode[];
	onClick?: (event: GameBoardClickEvent) => void;
	onDropPiece?: (event: GameBoardDropPieceEvent) => void;
};

const useStyles = createUseStyles({
	gameBoard: {
		width: "100%",
		height: "100%",
	},
	chessboard: {
		width: "100%",
		height: "100%",
	},
	boardGrid: {
		"position": "relative",
		"marginBottom": "0.5rem",

		"& .tile.dark": {
			background: "#38b764"
		},
		"& .tile.light": {
			background: "#a7f070"
		}
	},
	benchGrid: {
		"position": "relative",
		"& .tile": {
			background: "#9e9e9e",
			boxShadow: "inset 0 0 2px darken($bench-tile, 50)"
		}
	}
});

const GameBoard: React.FC<GameBoardProps> = ({
	renderBoardPiece, renderBenchPiece,
	onClick, onDropPiece
}) => {
	const styles = useStyles();
	const { board, bench } = useGameBoard();

	const createHandleClick = (locationType: "board" | "bench") =>
		(x: number, yPosition?: number) => {
			if (!onClick) {
				return;
			}

			const y = locationType === "board"
				? yPosition
				: undefined;

			onClick(
				createClickEvent({ locationType, x, y })
			);
		};

	const createHandleDrop = (locationType: "board" | "bench") =>
		({ piece }: { piece: HasId }, x: number, yPosition: number) => {
			if (!onDropPiece) {
				return;
			}

			const y = locationType === "board"
				? yPosition
				: undefined;

			onDropPiece(
				createDropPieceEvent(piece as PieceModel, { locationType, x, y })
			);
		};

	return (
		<div className={styles.gameBoard}>
			<div className={styles.chessboard}>
				<div className={styles.boardGrid}>
					<BoardGrid
						state={board}
						onDrop={createHandleDrop("board")}
						onClick={createHandleClick("board")}
						renderItem={renderBoardPiece}
					/>
				</div>

				<div className={styles.benchGrid}>
					<BoardGrid
						state={bench}
						onDrop={createHandleDrop("bench")}
						onClick={createHandleClick("board")}
						renderItem={renderBenchPiece}
					/>
				</div>
			</div>
		</div>
	);
};

export { GameBoard };
