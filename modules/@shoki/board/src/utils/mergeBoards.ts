import { BoardState, HasId } from "../types";
import { rotatePiecesAboutCenter } from "./rotateGridPosition";

const expandBoard = <TState extends BoardState>(
	board: TState,
	{ width, height }: { width: number; height: number }
): TState => {
	const differenceWidth = width - board.size.width;
	const differenceHeight = height - board.size.height;

	return {
		...board,
		size: { width, height },
		piecePositions: Object.entries(board.piecePositions).reduce<{
			[position: string]: string;
		}>((newPiecePositions, [position, pieceId]) => {
			const [x, y] = position.split(",").map((val) => parseInt(val, 10));

			const newX = x + differenceWidth;
			const newY = y + differenceHeight;

			return {
				...newPiecePositions,
				[`${newX},${newY}`]: pieceId,
			};
		}, {}),
	};
};

export const mergeBoards = <
	TPiece extends HasId,
	TState extends BoardState<TPiece>,
>(
	id: string,
	home: TState,
	away: TState
): TState => {
	if (
		home.size.width !== away.size.width ||
		home.size.height !== away.size.height
	) {
		throw Error("Trying to merge odd-sized boards");
	}

	const newSize = {
		width: home.size.width,
		height: home.size.height * 2,
	};
	const expandedHome = expandBoard(home, newSize);
	const expandedAway = expandBoard(away, newSize);

	return {
		id,
		pieces: {
			...expandedHome.pieces,
			...expandedAway.pieces,
		},
		piecePositions: {
			...expandedHome.piecePositions,
			...rotatePiecesAboutCenter(
				expandedAway.piecePositions,
				expandedAway.size
			),
		},
		locked: true,
		pieceLimit: null,
		size: newSize,
	} as TState;
};
