import { SubscribableBoard } from "@creature-chess/board";
import * as React from "react";
import { useBoardSubscription } from "./useBoard";
import { createUseThemeStyles } from "~/useStyles";
import { PieceModel } from "@creature-chess/models";
import { getDefinitionById } from "@creature-chess/gamemode";
import classNames from "classnames";

type StylesProps = {
	width: number;
	height: number;
};

const useStyles = createUseThemeStyles<string, StylesProps>(theme => ({
	grid: {
		display: "grid",
		gridTemplateColumns: (props) => `repeat(${props.width}, 1fr)`,
		gridTemplateRows: (props) => `repeat(${props.height}, 1fr)`,
		aspectRatio: (props) => `${props.width} / ${props.height}`,
		position: "relative",
	},
	tile: {
		background: "grey",
	},
	pieces: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
	}
}));

function usePieceRegistry() {
	return {
		getPiece(id: string): PieceModel | null {
			switch (id) {
				case "piece-1":
					return {
						id: "piece-1",
						definitionId: 1,
						definition: getDefinitionById(1)!,
						ownerId: "player-1",
						stage: 1,
						traits: [],
						maxHealth: 10,
						currentHealth: 10,
						facingAway: false,
						lastBattleStats: {} as any,
					};
				case "piece-2":
					return {
						id: "piece-2",
						definitionId: 2,
						definition: getDefinitionById(2)!,
						ownerId: "player-2",
						stage: 1,
						traits: [],
						maxHealth: 10,
						currentHealth: 10,
						facingAway: false,
						lastBattleStats: {} as any,
					};
				default:
					return null;
			}
		}
	}
}

function BoardPiece({ board, piece, renderPiece }: { board: SubscribableBoard; piece: PieceModel; renderPiece: (piece: PieceModel) => React.ReactNode }) {
	const position = board.getPiecePosition(piece.id);

	if (!position) {
		return null;
	}

	const [x, y] = position;

	return (<div
		style={{
			position: "absolute",
			width: `${100 / board.width}%`,
			height: `${100 / board.height}%`,
			left: `${(x / board.width) * 100}%`,
			top: `${(y / board.height) * 100}%`,
			transition: "left 100ms linear, top 100ms linear",
			willChange: "left, top",
		}}
	>
		{renderPiece(piece)}
	</div>
	);
}

type GameBoardProps = {
	board: SubscribableBoard;
	renderPiece: (piece: PieceModel) => React.ReactNode;
	boardClassName?: string;
	getTileClassName?: (x: number, y: number) => string;
};

export function GameBoard({
	board,
	renderPiece,
	boardClassName,
	getTileClassName,
}: GameBoardProps) {
	const b = useBoardSubscription(board);

	const pieceRegistry = usePieceRegistry();
	const styles = useStyles({ width: b.width, height: b.height });

	const tiles = React.useMemo(() => {
		const t = [];

		for (let y = 0; y < b.height; y++) {
			for (let x = 0; x < b.width; x++) {
				t.push(
					<div
						key={`tile-${x}-${y}`}
						className={getTileClassName ? getTileClassName(x, y) : styles.tile}
					/>
				);
			}
		}

		return t;
	}, [b]);

	const pieces = React.useMemo(() => {
		return b.getAllPieces()
			.map(({ id }) => {
				const piece = pieceRegistry.getPiece(id);

				if (!piece) {
					return null;
				}

				return <BoardPiece key={id} board={b} piece={piece} renderPiece={renderPiece} />;
			})
			.filter((p) => p !== null);
	}, [b, pieceRegistry, renderPiece]);

	return <div className={classNames(styles.grid, boardClassName)}>
		{tiles}
		<div className={styles.pieces}>
			{pieces}
		</div>
	</div>;
}
